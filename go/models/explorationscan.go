package models

import (
	"errors"
	"fmt"
	"math"
	"time"

	"gorm.io/gorm"
)

type ExplorationScan struct {
	ID                  uint      `gorm:"primaryKey"`
	SystemID            uint      `gorm:"not null"`
	System              System    `gorm:"foreignKey:SystemID"`
	BodyID              uint      `gorm:"not null"`
	Body                Body      `gorm:"foreignKey:BodyID"`
	Timestamp           time.Time `gorm:"not null"`
	EfficiencyTargetMet bool
	DataSold            bool
	DataLost            bool
	EstimatedEarnings   int64
}

func SaveExplorationScan(scan *ExplorationScan) error {
	var existingScan ExplorationScan

	err := db.Where("system_id = ? AND body_id = ?", scan.SystemID, scan.BodyID).First(&existingScan).Error
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}

		return db.Save(&scan).Error
	}

	if existingScan.Timestamp != scan.Timestamp {
		if scan.EfficiencyTargetMet && !existingScan.EfficiencyTargetMet {
			existingScan.EfficiencyTargetMet = true
		}

		existingScan.EstimatedEarnings = GetExplorationScanValue(scan)

		return db.Save(&existingScan).Error
	}

	return nil
}

func GetExplorationScan(systemAddress int64, bodySystemID int64) (*ExplorationScan, error) {
	system, err := GetSystemByAddress(systemAddress)
	if err != nil {
		return nil, fmt.Errorf("error getting system: %v", err)
	}

	body, err := GetBody(systemAddress, bodySystemID)
	if err != nil {
		return nil, fmt.Errorf("error getting body: %v", err)
	}

	var scan ExplorationScan
	err = db.Where("system_id = ? AND body_id = ?", system.ID, body.ID).First(&scan).Error
	if err != nil {
		return nil, fmt.Errorf("error getting scan: %v", err)
	}

	return &scan, nil
}

func SetExplorationScanSold(scan *ExplorationScan) error {
	var existingScan ExplorationScan

	err := db.Where("system_id = ? AND body_id = ? AND data_sold = ? AND data_lost = ?", scan.SystemID, scan.BodyID, false, false).First(&existingScan).Error
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}

		return fmt.Errorf("no scan found: %v", err)
	}

	existingScan.DataSold = true

	return db.Save(existingScan).Error
}

func SetExplorationScansDataLost() error {
	err := db.Model(&ExplorationScan{}).
		Where("data_sold = ? AND data_lost = ?", false, false).
		Update("data_lost", true).Error

	return err
}

func GetTotalEstimatedExplorationScanValue() (int64, error) {
	var total int64

	err := db.Model(&ExplorationScan{}).
		Select("COALESCE(SUM(estimated_earnings), 0)").
		Where("data_sold = ? AND data_lost = ?", false, false).
		Scan(&total).
		Error

	if err != nil {
		return 0, fmt.Errorf("error getting total estimated earnings: %v", err)
	}

	return total, nil
}

func GetExplorationScanValue(scan *ExplorationScan) int64 {
	isFirstDiscoverer := !scan.Body.WasDiscovered
	isFirstMapper := !scan.Body.WasMapped
	hasMapped := scan.Body.Mapped
	isOdyssey := true

	q := 0.56591828

	efficiencyBonus := 1.0
	if scan.EfficiencyTargetMet {
		efficiencyBonus = 1.25
	}

	firstDiscoveryBonus := 1.0
	if isFirstDiscoverer {
		firstDiscoveryBonus = 2.6
	}

	mappingMultiplier := 1.0
	if hasMapped {
		if isFirstDiscoverer && isFirstMapper {
			mappingMultiplier = 3.699622554
		} else if isFirstMapper {
			mappingMultiplier = 8.0956
		} else {
			mappingMultiplier = 3.333333333
		}
	}

	var kValue float64
	var bonus float64

	if scan.Body.BodyType == "Star" {
		kValue = 1200

		switch scan.Body.StarType {
		case ClassD,
			ClassDA,
			ClassDAB,
			ClassDAO,
			ClassDAZ,
			ClassDAV,
			ClassDB,
			ClassDBZ,
			ClassDBV,
			ClassDO,
			ClassDOV,
			ClassDQ,
			ClassDC,
			ClassDCV,
			ClassDX:
			kValue = 14057
		case ClassN,
			ClassH:
			kValue = 22628
		case ClassSMBH:
			kValue = 33.5678
		}

		return int64(math.Round(kValue + (scan.Body.StellarMass * kValue / 66.25)))
	} else {
		kValue = 300

		isTerraformable := scan.Body.TerraformState != NotTerraformable

		if isTerraformable {
			bonus = 93328
		}

		switch scan.Body.PlanetClass {
		case MetalRichBody:
			kValue = 21790
			bonus = 0

			if isTerraformable {
				bonus = 65631
			}
		case AmmoniaWorld:
			kValue = 96932
			bonus = 0
		case ClassIGasGiant:
			kValue = 1656
			bonus = 0
		case HighMetalContentBody,
			ClassIIGasGiant:
			kValue = 9654
			bonus = 0

			if isTerraformable {
				bonus = 100677
			}
		case EarthLikeWorld,
			WaterWorld:
			kValue = 64831
			bonus = 0

			if isTerraformable || scan.Body.PlanetClass == EarthLikeWorld {
				bonus = 116295
			}
		}

		value := kValue + bonus
		value = (value + (value * q * math.Pow(scan.Body.MassEM, 0.2))) * mappingMultiplier

		if hasMapped && isOdyssey {
			value += math.Max(value*0.3, 555)
		}

		value *= efficiencyBonus

		value = math.Max(value, 500)

		value *= firstDiscoveryBonus

		return int64(math.Round(value))
	}
}
