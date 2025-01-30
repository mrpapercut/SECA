package models

import (
	"errors"
	"time"

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
	LastVisited   time.Time
}

func SaveSystem(system *System) error {
	var existingSystem System
	err := db.Where("system_address = ?", system.SystemAddress).First(&existingSystem).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return err
	}

	if existingSystem.ID != 0 {
		if existingSystem.StarPosX == 0 && system.StarPosX != 0 {
			existingSystem.StarPosX = system.StarPosX
		}

		if existingSystem.StarPosY == 0 && system.StarPosY != 0 {
			existingSystem.StarPosY = system.StarPosY
		}

		if existingSystem.StarPosZ == 0 && system.StarPosZ != 0 {
			existingSystem.StarPosZ = system.StarPosZ
		}

		if existingSystem.LastVisited.Before(system.LastVisited) {
			existingSystem.LastVisited = system.LastVisited
		}

		return db.Save(&existingSystem).Error
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

func GetLastVisitedSystems(amount int) ([]*System, error) {
	var systems []*System

	if amount < 20 {
		amount = 20
	}

	err := db.Model(&System{}).Order("last_visited DESC").Limit(amount).Find(&systems).Error
	if err != nil {
		return nil, err
	}

	return systems, nil
}
