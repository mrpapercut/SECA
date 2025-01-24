package models

import (
	"errors"
	"fmt"
	"reflect"

	"gorm.io/gorm"
)

type Body struct {
	ID                    uint    `gorm:"primaryKey" json:"-"`
	Name                  string  `gorm:"not null" json:"name"`
	BodySystemID          int64   `gorm:"not null" json:"body_system_id"`
	SystemID              uint    `gorm:"not null" json:"system_id"`
	System                System  `gorm:"foreignKey:SystemID" json:"-"`
	DistanceFromArrivalLS float64 `json:"distance_from_arrival"`
	WasDiscovered         bool    `json:"was_discovered"`
	WasMapped             bool    `json:"was_mapped"`
	Discovered            bool    `json:"discovered"`
	Mapped                bool    `json:"mapped"`
	Footfall              bool    `json:"footfall"`

	Signals          []Signal          `gorm:"foreignKey:ID" json:"signals"`
	ExplorationScans []ExplorationScan `gorm:"foreignKey:BodyID" json:"exploration_scans"`
	BiologicalScans  []BiologicalScan  `gorm:"foreignKey:BodyID" json:"biological_scans"`

	BodyType string `gorm:"not null" json:"body_type"`

	SurfaceTemperature float64 `json:"surface_temperature"`
	Radius             float64 `json:"radius"`
	SemiMajorAxis      float64 `json:"semi_major_axis"`
	Eccentricity       float64 `json:"eccentricity"`
	OrbitalInclination float64 `json:"orbital_inclination"`
	Periapsis          float64 `json:"periapsis"`
	OrbitalPeriod      float64 `json:"orbital_period"`
	AscendingNode      float64 `json:"ascending_node"`
	MeanAnomaly        float64 `json:"mean_anomaly"`
	RotationPeriod     float64 `json:"rotation_period"`
	AxialTilt          float64 `json:"axial_tilt"`

	// Star-specific
	StarType          StarType `json:"star_type"`
	Subclass          int      `json:"subclass"`
	StellarMass       float64  `json:"stellar_mass"`
	AbsoluteMagnitude float64  `json:"absolute_magnitude"`
	Age_MY            float64  `json:"age"`
	Luminosity        string   `json:"luminosity"`

	// Planet-specific
	TidalLock      bool           `json:"tidal_lock"`
	TerraformState TerraformState `json:"terraform_state"`
	PlanetClass    PlanetClass    `json:"planet_class"`
	Atmosphere     Atmosphere     `json:"atmosphere"`
	AtmosphereType AtmosphereType `json:"atmosphere_type"`
	// AtmosphereComposition AtmosphereComposition
	Volcanism       Volcanism `json:"volcanism"`
	MassEM          float64   `json:"mass"`
	SurfaceGravity  float64   `json:"surface_gravity"`
	SurfacePressure float64   `json:"surface_pressure"`
	Landable        bool      `json:"landable"`
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
