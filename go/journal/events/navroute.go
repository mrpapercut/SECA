package events

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

type RouteStop struct {
	Name          string `json:"StarSystem"`
	SystemAddress int64
	StarPos       []float64
	StarClass     string
}

type NavRouteEvent struct {
	GenericEvent
	Route []*RouteStop
}

func (eh *EventHandler) handleEventNavRoute(rawEvent string) error {
	event, err := ParseEvent[NavRouteEvent](rawEvent)
	if err != nil {
		return err
	}

	if len(event.Route) == 0 {
		return nil
	}

	route := make([]*models.Route, 0)

	for i, routeStop := range event.Route {
		system := &models.System{
			Name:          routeStop.Name,
			SystemAddress: routeStop.SystemAddress,
			StarPosX:      routeStop.StarPos[0],
			StarPosY:      routeStop.StarPos[1],
			StarPosZ:      routeStop.StarPos[2],
		}

		err := models.SaveSystem(system)
		if err != nil {
			return fmt.Errorf("error saving system: %v", err)
		}

		route = append(route, &models.Route{
			Position:      int64(i),
			SystemAddress: routeStop.SystemAddress,
		})
	}

	err = models.UpdateRoute(route)
	if err != nil {
		return fmt.Errorf("error updating route: %v", err)
	}

	return nil
}
