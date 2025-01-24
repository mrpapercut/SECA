package models

import (
	"errors"
	"fmt"
	"log/slog"
	"time"

	"gorm.io/gorm"
)

type BiologicalScan struct {
	ID                uint      `gorm:"primaryKey"`
	SystemID          uint      `gorm:"not null"`
	System            System    `gorm:"foreignKey:SystemID"`
	BodyID            uint      `gorm:"not null"`
	Body              Body      `gorm:"foreignKey:BodyID"`
	Timestamp         time.Time `gorm:"not null"`
	Genus             string    `gorm:"not null"`
	Species           string    `gorm:"not null"`
	Variant           string    `gorm:"not null"`
	DataSold          bool
	DataLost          bool
	EstimatedEarnings int64
}

func SaveBiologicalScan(scan *BiologicalScan) error {
	var existingScan BiologicalScan

	err := db.Where("system_id = ? AND body_id = ? AND variant = ?", scan.SystemID, scan.BodyID, scan.Variant).First(&existingScan).Error
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}

		return db.Save(&scan).Error
	}

	return nil
}

func GetBiologicalScans(systemAddress int64, bodySystemID int64) ([]*BiologicalScan, error) {
	system, err := GetSystemByAddress(systemAddress)
	if err != nil {
		return nil, fmt.Errorf("error getting system: %v", err)
	}

	body, err := GetBody(systemAddress, bodySystemID)
	if err != nil {
		return nil, fmt.Errorf("error getting body for systemAddress %d and bodySystemID %d: %v", systemAddress, bodySystemID, err)
	}

	var scans []*BiologicalScan
	err = db.Where("system_id = ? AND body_id = ?", system.ID, body.ID).Find(&scans).Error
	if err != nil {
		return nil, fmt.Errorf("error getting biological scans: %v", err)
	}

	return scans, nil
}

func GetBiologicalScansByVariant(variant string) ([]*BiologicalScan, error) {
	var scans []*BiologicalScan

	err := db.Where("variant = ? AND data_sold = 0 AND data_lost = 0", variant).Find(&scans).Error
	if err != nil {
		return nil, fmt.Errorf("error getting scans by variant: %v", err)
	}

	return scans, nil
}

func SetBiologicalScanSold(scan *BiologicalScan) error {
	var existingScan BiologicalScan

	err := db.Where("system_id = ? AND body_id = ? AND variant = ?", scan.SystemID, scan.BodyID, scan.Variant).First(&existingScan).Error
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}

		return fmt.Errorf("no scan found: %v", err)
	}

	existingScan.DataSold = true

	return db.Save(&existingScan).Error
}

func SetBiologicalScansDataLost() error {
	err := db.Model(&BiologicalScan{}).
		Where("data_sold = ? AND data_lost = ?", false, false).
		Update("data_lost", true).Error

	return err
}

func GetTotalEstimatedBiologicalScanValue() (int64, error) {
	var total int64

	err := db.Model(&BiologicalScan{}).
		Select("COALESCE(SUM(estimated_earnings), 0)").
		Where("data_sold = ? AND data_lost = ?", false, false).
		Scan(&total).
		Error

	if err != nil {
		return 0, fmt.Errorf("error getting total estimated earnings: %v", err)
	}

	return total, nil
}

func GetBiologicalScanValue(species BiologicalSpecies, firstMapped bool) int64 {
	value, exists := BiologicalScanValues[species]
	if !exists {
		slog.Warn(fmt.Sprintf("error getting biological scan value: unknown species: %s", species))
		return 0
	}

	if firstMapped {
		return value * 5
	}

	return value
}

func GetBiologicalScanCCR(genus BiologicalGenus) int64 {
	value, exists := BiologicalScanCCR[genus]
	if !exists {
		slog.Warn(fmt.Sprintf("error getting biological scan ccr: unknown genus: %s", genus))
		return 0
	}

	return value
}
