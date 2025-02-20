package models

import (
	"errors"

	"gorm.io/gorm"
)

type FSSSignal struct {
	ID         uint   `gorm:"primaryKey"`
	SystemID   uint   `gorm:"not null"`
	System     System `gorm:"foreignKey:SystemID"`
	SignalName string
	SignalType string
	IsStation  bool
}

func SaveFSSSignal(signal *FSSSignal) error {
	var existingSignal FSSSignal

	err := db.Where("system_id = ? AND signal_name = ?", signal.SystemID, signal.SignalName).First(&existingSignal).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	if existingSignal.ID != 0 {
		return nil
	}

	return db.Save(&signal).Error
}

func GetFSSSignalsBySystem(system *System) ([]*FSSSignal, error) {
	var signals []*FSSSignal

	err := db.Where("system_id = ?", system.ID).Find(&signals).Error
	if err != nil {
		return nil, err
	}

	return signals, nil
}
