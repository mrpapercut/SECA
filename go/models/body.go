package models

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Body struct {
	ID                    uint   `gorm:"primaryKey"`
	Name                  string `gorm:"uniqueIndex;not null" json:"Name"`
	BodySystemID          int64  `gorm:"not null" json:"BodyID"`
	SystemID              uint   `gorm:"not null"`
	System                System `gorm:"foreignKey:SystemID"`
	DistanceFromArrivalLS float64
	WasDiscovered         bool
	WasMapped             bool
	Discovered            bool
	Mapped                bool
	Footfall              bool

	Signals          []BodySignal      `gorm:"foreignKey:BodyID" json:"signals"`
	ExplorationScans []ExplorationScan `gorm:"foreignKey:BodyID" json:"exploration_scans"`
	BiologicalScans  []BiologicalScan  `gorm:"foreignKey:BodyID" json:"biological_scans"`

	BodyType string `gorm:"not null"`

	SurfaceTemperature float64
	Radius             float64
	SemiMajorAxis      float64
	Eccentricity       float64
	OrbitalInclination float64
	Periapsis          float64
	OrbitalPeriod      float64
	AscendingNode      float64
	MeanAnomaly        float64
	RotationPeriod     float64
	AxialTilt          float64

	// Star-specific
	StarType          StarType
	Subclass          int
	StellarMass       float64
	AbsoluteMagnitude float64
	Age_MY            float64
	Luminosity        string

	// Planet-specific
	TidalLock      bool
	TerraformState TerraformState
	PlanetClass    PlanetClass
	Atmosphere     Atmosphere
	AtmosphereType AtmosphereType
	// AtmosphereComposition AtmosphereComposition
	Volcanism       Volcanism
	MassEM          float64
	SurfaceGravity  float64
	SurfacePressure float64
	Landable        bool
	// Materials             []NamePercentMap
	// Composition           Composition
}

/*
func UpdateBodyStruct(existing, incoming Body) Body {
	existingValue := reflect.ValueOf(existing)
	incomingValue := reflect.ValueOf(incoming)
	existingType := reflect.TypeOf(existing)

	updated := reflect.New(existingType).Elem()
	updated.Set(existingValue)

	for i := 0; i < existingType.NumField(); i++ {
		field := existingType.Field(i)
		incomingFieldValue := incomingValue.Field(i)
		existingFieldValue := existingValue.Field(i)

		if !incomingFieldValue.CanInterface() ||
			field.Name == "ID" ||
			field.Name == "Name" ||
			field.Name == "BodySystemID" ||
			field.Name == "System" ||
			field.Name == "SystemID" {
			continue
		}

		if !reflect.DeepEqual(incomingFieldValue.Interface(), reflect.Zero(incomingFieldValue.Type()).Interface()) {
			if !reflect.DeepEqual(incomingFieldValue.Interface(), existingFieldValue.Interface()) {
				updated.Field(i).Set(incomingFieldValue)
			}
		}
	}

	returnBody := updated.Interface().(Body)

	return returnBody
}
*/

func SaveBody(body *Body) error {
	existingBody, err := GetBodyByName(body.Name)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	if existingBody == nil {
		return db.Save(&body).Error
	}

	// Because bodies contain either very little or all the information,
	// it should be sufficient to only check a few properties. If any of these
	// have different info from the original, update the whole thing
	changed := false
	if existingBody.DistanceFromArrivalLS == float64(0) && existingBody.DistanceFromArrivalLS != body.DistanceFromArrivalLS {
		changed = true
	}

	if existingBody.SurfaceTemperature == float64(0) && existingBody.SurfaceTemperature != body.SurfaceTemperature {
		changed = true
	}

	if existingBody.StellarMass == float64(0) && existingBody.StellarMass != body.StellarMass {
		changed = true
	}

	if existingBody.MassEM == float64(0) && existingBody.MassEM != body.MassEM {
		changed = true
	}

	if changed {
		body.ID = existingBody.ID
		return db.Save(&body).Error
	}

	return nil
}

func GetBodies(systemAddress int64) ([]*Body, error) {
	system, err := GetSystemByAddress(systemAddress)
	if err != nil {
		return nil, fmt.Errorf("error getting system: %v", err)
	}

	var bodies []*Body
	err = db.Where("system_id = ?", system.ID).Find(&bodies).Error
	if err != nil {
		return nil, fmt.Errorf("error getting bodies: %v", err)
	}

	return bodies, nil
}

func GetBody(systemAddress int64, bodySystemID int64) (*Body, error) {
	var err error
	var system *System
	var body Body

	system, err = GetSystemByAddress(systemAddress)
	if err != nil {
		return nil, fmt.Errorf("error getting system")
	}

	err = db.Where("system_id = ? AND body_system_id = ?", system.ID, bodySystemID).First(&body).Error
	if err != nil {
		return nil, err
	}

	return &body, nil
}

func GetBodyByName(name string) (*Body, error) {
	var body Body
	err := db.Where("name = ?", name).First(&body).Error
	if err != nil {
		return nil, err
	}

	return &body, nil
}

func SetBodyDiscovered(body *Body) error {
	err := db.Model(&Body{}).Where("name = ?", body.Name).Update("discovered", true).Error
	if err != nil {
		return fmt.Errorf("error updating 'discovered' for body: %v", err)
	}

	return nil
}

func SetBodyMapped(body *Body) error {
	err := db.Model(&Body{}).Where("name = ?", body.Name).Update("mapped", true).Error
	if err != nil {
		return fmt.Errorf("error updating 'mapped' for body: %v", err)
	}

	return nil
}

func SetBodyFootfall(body *Body) error {
	err := db.Model(&Body{}).Where("name = ?", body.Name).Update("footfall", true).Error
	if err != nil {
		return fmt.Errorf("error updating 'footfall' for body: %v", err)
	}

	return nil
}
