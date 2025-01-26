package models

import (
	"errors"
	"fmt"
	"reflect"

	"gorm.io/gorm"
)

type Body struct {
	ID                    uint   `gorm:"primaryKey"`
	Name                  string `gorm:"uniqueIndex;not null" json:"BodyName"`
	BodySystemID          int64  `gorm:"not null" json:"BodyID"`
	SystemID              uint   `gorm:"not null"`
	System                System `gorm:"foreignKey:SystemID"`
	DistanceFromArrivalLS float64
	WasDiscovered         bool
	WasMapped             bool
	Discovered            bool
	Mapped                bool
	Footfall              bool

	Signals          []Signal          `gorm:"foreignKey:ID" json:"signals"`
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

func SaveBody(body *Body) error {
	existingBody, err := GetBodyByName(body.Name)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	if existingBody != nil && existingBody.ID != 0 {
		updatedBody := UpdateBodyStruct(*existingBody, *body)
		body = &updatedBody
	}

	return db.Save(&body).Error
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
	retrievedBody, err := GetBodyByName(body.Name)
	if err != nil {
		return fmt.Errorf("error getting body: %v", err)
	}

	retrievedBody.Discovered = true

	err = db.Save(retrievedBody).Error
	if err != nil {
		return fmt.Errorf("error saving body updated with Discovered: %v", err)
	}

	return nil
}

func SetBodyMapped(body *Body) error {
	retrievedBody, err := GetBodyByName(body.Name)
	if err != nil {
		return fmt.Errorf("error getting body: %v", err)
	}

	retrievedBody.Mapped = true

	err = db.Save(retrievedBody).Error
	if err != nil {
		return fmt.Errorf("error saving body updated with Mapped: %v", err)
	}

	return nil
}

func SetBodyFootfall(body *Body) error {
	retrievedBody, err := GetBodyByName(body.Name)
	if err != nil {
		return fmt.Errorf("error getting body: %v", err)
	}

	retrievedBody.Footfall = true

	err = db.Save(retrievedBody).Error
	if err != nil {
		return fmt.Errorf("error saving body updated with Footfall: %v", err)
	}

	return nil
}
