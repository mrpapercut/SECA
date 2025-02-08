package models

import (
	"fmt"
	"math"
)

type Route struct {
	ID            uint  `gorm:"autoIncrement,primaryKey"`
	Position      int64 `gorm:"not null"`
	SystemAddress int64 `gorm:"not null"`
}

type RouteWithSystems struct {
	Route
	System *System
}

func GetRoute() ([]*RouteWithSystems, error) {
	var route []*Route
	err := db.Model(&Route{}).Find(&route).Error
	if err != nil {
		return nil, err
	}

	status := GetStatus()

	foundCurrentPosition := false

	mappedRoute := make([]*RouteWithSystems, 0)
	for _, r := range route {
		system, err := GetSystemByAddress(r.SystemAddress)
		if err != nil {
			return nil, fmt.Errorf("error getting system for route-stop: %v", err)
		}

		if system.Name == status.CurrentSystem {
			foundCurrentPosition = true
		}

		if !foundCurrentPosition {
			continue
		}

		bodies, err := GetBodies(r.SystemAddress)
		if err != nil {
			return nil, fmt.Errorf("error getting bodies for system: %v", err)
		}

		system.Bodies = bodies

		mappedRoute = append(mappedRoute, &RouteWithSystems{
			Route:  *r,
			System: system,
		})
	}

	return mappedRoute, nil
}

func UpdateRoute(route []*Route) error {
	err := db.Where("1 = 1").Delete(&Route{}).Error
	if err != nil {
		return err
	}

	for _, stop := range route {
		err = db.Save(stop).Error
		if err != nil {
			return err
		}
	}

	return nil
}

func GetRouteLength(route []*RouteWithSystems) (float64, error) {
	totalDistance := float64(0)

	if len(route) < 2 {
		return totalDistance, nil
	}

	prevPos := &Coordinates{
		X: route[0].System.StarPosX,
		Y: route[0].System.StarPosY,
		Z: route[0].System.StarPosZ,
	}

	for _, stop := range route[1:] {
		newPos := &Coordinates{
			X: stop.System.StarPosX,
			Y: stop.System.StarPosY,
			Z: stop.System.StarPosZ,
		}

		distance := calculateDistance(*prevPos, *newPos)
		totalDistance += distance

		prevPos = newPos
	}

	return totalDistance, nil
}

func calculateDistance(a Coordinates, b Coordinates) float64 {
	return math.Sqrt(math.Pow(b.X-a.X, 2) + math.Pow(b.Y-a.Y, 2) + math.Pow(b.Z-a.Z, 2))
}
