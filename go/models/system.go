package models

import (
	"errors"

	"gorm.io/gorm"
)

type System struct {
	ID            uint   `gorm:"primaryKey"`
	Name          string `gorm:"not null"`
	SystemAddress int64  `gorm:"uniqueIndex;not null"`
	StarPosX      float64
	StarPosY      float64
	StarPosZ      float64
	Bodies        []*Body `gorm:"foreignKey:SystemID"`
}

func SaveSystem(system *System) error {
	var existingSystem System
	err := db.Where("system_address = ?", system.SystemAddress).First(&existingSystem).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	if existingSystem.ID != 0 {
		if ((existingSystem.StarPosX == 0 && system.StarPosX != 0) ||
			(existingSystem.StarPosY == 0 && system.StarPosY != 0) ||
			(existingSystem.StarPosZ == 0 && system.StarPosZ != 0)) &&
			existingSystem.Name != "Sol" {
			system.ID = existingSystem.ID
			return db.Save(&system).Error
		}

		return nil
	}

	return db.Save(&system).Error
}

func GetSystemByAddress(systemAddress int64) (*System, error) {
	var system System

	err := db.Where("system_address = ?", systemAddress).First(&system).Error
	if err != nil {
		return nil, err
	}

	return &system, nil
}

func GetSystemByName(name string) (*System, error) {
	var system System

	err := db.Where("name = ?", name).First(&system).Error
	if err != nil {
		return nil, err
	}

	return &system, nil
}

func GetSystemWithBodies(system *System) (*System, error) {
	var retrievedSystem System

	err := db.Preload("Bodies.Signals").Preload("Bodies.ExplorationScans").Preload("Bodies.BiologicalScans").Where("id = ?", system.ID).Find(&retrievedSystem).Error
	if err != nil {
		return nil, err
	}

	return &retrievedSystem, nil
}
