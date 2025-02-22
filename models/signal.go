package models

import (
	"errors"

	"gorm.io/gorm"
)

type SignalType string

const (
	SignalBiological SignalType = "Biological"
	SignalGeological SignalType = "Geological"
	SignalHuman      SignalType = "Human"
	SignalThargoid   SignalType = "Thargoid"
	SignalGuardian   SignalType = "Guardian"
	SignalOther      SignalType = "Other"
)

type BodySignal struct {
	ID       uint       `gorm:"primaryKey"`
	SystemID uint       `gorm:"not null"`
	System   System     `gorm:"foreignKey:SystemID"`
	BodyID   uint       `gorm:"not null"`
	Body     Body       `gorm:"foreignKey:BodyID"`
	Type     SignalType `gorm:"not null"`
	SubType  string
	Count    int64
}

func SaveBodySignal(signal *BodySignal) error {
	var existingSignal BodySignal

	err := db.Where("system_id = ? AND body_id = ? AND type = ?", signal.SystemID, signal.BodyID, signal.Type).First(&existingSignal).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	if existingSignal.ID != 0 {
		signal.ID = existingSignal.ID
	}

	return db.Save(&signal).Error
}

func GetBodySignals(body *Body) ([]*BodySignal, error) {
	var signals []*BodySignal
	err := db.Where("system_id = ? AND body_id = ?", body.SystemID, body.ID).Find(&signals).Error
	if err != nil {
		return nil, err
	}

	return signals, nil
}
