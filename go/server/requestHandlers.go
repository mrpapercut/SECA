package server

import (
	"encoding/json"
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type ResponseStatus struct {
	Type   string         `json:"type"`
	Status *models.Status `json:"status"`
}

func handleGetStatusRequest() ([]byte, error) {
	status, err := models.GetStatus()
	if err != nil {
		return nil, fmt.Errorf("error getting status: %v", err)
	}

	statusResponse := &ResponseStatus{
		Type:   "getStatus",
		Status: status,
	}

	jsonStatus, err := json.Marshal(&statusResponse)
	if err != nil {
		return nil, fmt.Errorf("error parsing status to json: %v", err)
	}

	return jsonStatus, nil
}

type ResponseRoute struct {
	Type          string                     `json:"type"`
	Route         []*models.RouteWithSystems `json:"route"`
	TotalDistance float64                    `json:"total_distance"`
}

func handleGetRouteRequest() ([]byte, error) {
	route, err := models.GetRoute()
	if err != nil {
		return nil, fmt.Errorf("error getting route: %v", err)
	}

	totalDistance, err := models.GetRouteLength(route)
	if err != nil {
		totalDistance = float64(0)
	}

	routeResponse := &ResponseRoute{
		Type:          "getRoute",
		Route:         route,
		TotalDistance: totalDistance,
	}

	jsonRoute, err := json.Marshal(&routeResponse)
	if err != nil {
		return nil, fmt.Errorf("error parsing status to json: %v", err)
	}

	return jsonRoute, nil
}

type ResponseSystem struct {
	Type   string         `json:"type"`
	System *models.System `json:"system"`
}

func handleGetCurrentSystemRequest() ([]byte, error) {
	status, err := models.GetStatus()
	if err != nil {
		return nil, fmt.Errorf("error getting status: %v", err)
	}

	if status.System == "" {
		return nil, fmt.Errorf("error: current system not in status")
	}

	system, err := models.GetSystemByName(status.System)
	if err != nil {
		return nil, fmt.Errorf("error getting system by name: %v", err)
	}

	systemWithBodies, err := models.GetSystemWithBodies(system)
	if err != nil {
		return nil, fmt.Errorf("error getting system with bodies: %v", err)
	}

	systemResponse := &ResponseSystem{
		Type:   "getCurrentSystem",
		System: systemWithBodies,
	}

	jsonSystem, err := json.Marshal(systemResponse)
	if err != nil {
		return nil, fmt.Errorf("error parsing system to json: %v", err)
	}

	return jsonSystem, nil
}
