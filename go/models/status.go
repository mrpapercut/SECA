package models

import "fmt"

type Status struct {
	ID             uint    `gorm:"autoIncrement,primaryKey" json:"-"`
	Identifier     string  `json:"-"`
	CommanderName  string  `json:"commander_name"`
	Balance        int64   `json:"balance"`
	ShipName       string  `json:"ship_name"`
	ShipType       string  `json:"ship_type"`
	FuelLevel      float64 `json:"fuel_level"`
	FuelCapacity   float64 `json:"fuel_capacity"`
	System         string  `json:"current_system"`
	Body           string  `json:"body"`
	Landed         bool    `json:"is_landed"`
	Docked         bool    `json:"is_docked"`
	OnFoot         bool    `json:"is_on_foot"`
	InSRV          bool    `json:"is_in_srv"`
	Exploration    int64   `json:"estimated_exploration_value"`
	Biological     int64   `json:"estimated_biological_value"`
	SystemsVisited int64   `json:"systems_visited"`
	TotalJumps     int64   `json:"total_jumps"`
	TotalDistance  int64   `json:"total_distance"`
}

const statusIdentifier = "CURRENT_STATUS"

func InitializeStatus() error {
	err := db.FirstOrCreate(&Status{Identifier: statusIdentifier}).Error

	return err
}

func GetStatus() (*Status, error) {
	var status Status
	err := db.Where("identifier = ?", statusIdentifier).First(&status).Error
	if err != nil {
		return nil, err
	}

	explorationValue, err := GetTotalEstimatedExplorationScanValue()
	if err != nil {
		return nil, fmt.Errorf("error getting exploration value: %v", err)
	}
	status.Exploration = explorationValue

	biologicalValue, err := GetTotalEstimatedBiologicalScanValue()
	if err != nil {
		return nil, fmt.Errorf("error getting biological value: %v", err)
	}
	status.Biological = biologicalValue

	return &status, nil
}

func UpdateStatus(status *Status) error {
	var retrievedStatus Status
	err := db.Where("identifier = ?", statusIdentifier).First(&retrievedStatus).Error
	if err != nil {
		return err
	}

	if status.CommanderName != "" && retrievedStatus.CommanderName != status.CommanderName {
		retrievedStatus.CommanderName = status.CommanderName
	}

	if status.Balance != 0 && retrievedStatus.Balance != status.Balance {
		retrievedStatus.Balance = status.Balance
	}

	if status.ShipType != "" && retrievedStatus.ShipType != status.ShipType {
		retrievedStatus.ShipType = status.ShipType
	}

	if status.ShipName != "" && retrievedStatus.ShipName != status.ShipName {
		retrievedStatus.ShipName = status.ShipName
	}

	if status.FuelLevel != float64(0) && retrievedStatus.FuelLevel != status.FuelLevel {
		retrievedStatus.FuelLevel = status.FuelLevel
	}

	if status.FuelCapacity != float64(0) && retrievedStatus.FuelCapacity != status.FuelCapacity {
		retrievedStatus.FuelCapacity = status.FuelCapacity
	}

	if status.System != "" && retrievedStatus.System != status.System {
		retrievedStatus.System = status.System
	}

	if retrievedStatus.Body != status.Body {
		retrievedStatus.Body = status.Body
	}

	if status.SystemsVisited != 0 && retrievedStatus.SystemsVisited != status.SystemsVisited {
		retrievedStatus.SystemsVisited = status.SystemsVisited
	}

	if status.TotalDistance != 0 && retrievedStatus.TotalDistance != status.TotalDistance {
		retrievedStatus.TotalDistance = status.TotalDistance
	}

	if status.TotalJumps != 0 && retrievedStatus.TotalJumps != status.TotalJumps {
		retrievedStatus.TotalJumps = status.TotalJumps
	}

	retrievedStatus.Landed = status.Landed
	retrievedStatus.Docked = status.Docked
	retrievedStatus.OnFoot = status.OnFoot

	explorationValue, err := GetTotalEstimatedExplorationScanValue()
	if err != nil {
		return fmt.Errorf("error getting exploration value: %v", err)
	}
	retrievedStatus.Exploration = explorationValue

	biologicalValue, err := GetTotalEstimatedBiologicalScanValue()
	if err != nil {
		return fmt.Errorf("error getting biological value: %v", err)
	}
	retrievedStatus.Biological = biologicalValue

	return db.Save(&retrievedStatus).Error
}

func UpdateStatusEarnings() error {
	status, err := GetStatus()
	if err != nil {
		return fmt.Errorf("error getting status: %v", err)
	}

	explorationValue, err := GetTotalEstimatedExplorationScanValue()
	if err != nil {
		return fmt.Errorf("error getting exploration value: %v", err)
	}
	status.Exploration = explorationValue

	biologicalValue, err := GetTotalEstimatedBiologicalScanValue()
	if err != nil {
		return fmt.Errorf("error getting biological value: %v", err)
	}
	status.Biological = biologicalValue

	return db.Save(&status).Error
}
