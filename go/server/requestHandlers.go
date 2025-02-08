package server

import (
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/mrpapercut/seca/models"
)

type ResponseStatus struct {
	Type   string         `json:"type"`
	Status *models.Status `json:"status"`
}

func SendStatusUpdate() {
	message, err := handleGetStatusRequest()
	if err != nil {
		slog.Warn(fmt.Sprintf("error sending status update: %v", err))
		return
	}

	SendMessage(message)
}

func handleGetStatusRequest() ([]byte, error) {
	status := models.GetStatus()
	status.UpdateEstimatedExplorationEarnings()
	status.UpdateEstimatedBiologicalEarnings()

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

func SendRouteUpdate() {
	message, err := handleGetRouteRequest()
	if err != nil {
		slog.Warn(fmt.Sprintf("error sending route update: %v", err))
		return
	}

	SendMessage(message)
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

func SendCurrentSystemUpdate() {
	message, err := handleGetCurrentSystemRequest()
	if err != nil {
		slog.Warn(fmt.Sprintf("error sending current system update: %v", err))
		return
	}

	SendMessage(message)
}

func handleGetCurrentSystemRequest() ([]byte, error) {
	status := models.GetStatus()

	if status.CurrentSystem == "" {
		return nil, fmt.Errorf("error: current system not in status")
	}

	system, err := models.GetSystemByName(status.CurrentSystem)
	if err != nil {
		return nil, fmt.Errorf("error getting system by name: %v", err)
	}

	systemWithBodies, err := models.GetSystemWithBodies(system)
	if err != nil {
		return nil, fmt.Errorf("error getting system with bodies: %v", err)
	}

	fssSignals, err := models.GetFSSSignalsBySystem(systemWithBodies)
	if err != nil {
		return nil, fmt.Errorf("error getting fss signals for system: %v", err)
	}

	systemWithBodies.FSSSignals = fssSignals

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

type ResponseFlightlog struct {
	Type      string           `json:"type"`
	Flightlog []*models.System `json:"flightlog"`
}

func SendFlightlogUpdate() {
	message, err := handleGetFlightlogRequest()
	if err != nil {
		slog.Warn(fmt.Sprintf("error sending flightlog update: %v", err))
		return
	}

	SendMessage(message)
}

func handleGetFlightlogRequest() ([]byte, error) {
	systems, err := models.GetLastVisitedSystems(20)
	if err != nil {
		return nil, fmt.Errorf("error getting last visited systems: %v", err)
	}

	flightlogResponse := &ResponseFlightlog{
		Type:      "getFlightlog",
		Flightlog: systems,
	}

	jsonFlightlog, err := json.Marshal(flightlogResponse)
	if err != nil {
		return nil, fmt.Errorf("error parsing flightlog to json: %v", err)
	}

	return jsonFlightlog, nil
}
