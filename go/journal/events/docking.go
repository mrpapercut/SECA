package events

import (
	"fmt"
	"log/slog"

	"github.com/mrpapercut/seca/models"
)

type StationType string
type StationName string
type StationGovernment string
type StationEconomy string
type StationService string
type StationLandingPads struct {
	Small  int
	Medium int
	Large  int
}

type EventDocked struct {
	GenericEvent
	StationName       StationName
	StationType       StationType
	Taxi              bool
	Multicrew         bool
	StarSystem        StarSystem
	SystemAddress     SystemAddress
	MarketID          MarketID
	StationFaction    map[string]string
	StationGovernment StationGovernment `json:"StationGovernment_Localised"`
	StationServices   []StationService
	StationEconomy    StationEconomy `json:"StationEconomy_Localised"`
	DistFromStarLS    float64
	LandingPads       StationLandingPads
}

func (eh *EventHandler) handleEventDocked(rawEvent string) error {
	event, err := ParseEvent[EventDocked](rawEvent)
	if err != nil {
		return err
	}

	status := models.GetStatus()
	status.SetCurrentSystem(string(event.StarSystem))
	status.SetCurrentBody(string(event.StationName))

	return nil
}

type EventUndocked struct {
	GenericEvent
	StationName StationName
	StationType StationType
	MarketID    MarketID
	Taxi        bool
	Multicrew   bool
}

func (eh *EventHandler) handleEventUndocked(rawEvent string) error {
	_, err := ParseEvent[EventUndocked](rawEvent)
	if err != nil {
		return err
	}

	status := models.GetStatus()
	status.SetCurrentBody("")

	return nil
}

type EventEmbark struct {
	GenericEvent
	SRV           bool
	Taxi          bool
	Multicrew     bool
	ID            int
	StarSystem    StarSystem
	SystemAddress SystemAddress
	Body          BodyName
	BodySystemID  BodySystemID `json:"BodyID"`
	OnStation     bool
	OnPlanet      bool
	StationName   StationName
	StationType   StationType
	MarketID      MarketID
}

func (eh *EventHandler) handleEventEmbark(rawEvent string) error {
	/*
		event, err := ParseEvent[EventEmbark](rawEvent)
		if err != nil {
			return err
		}

		status := models.GetStatus()
		if err != nil {
			return fmt.Errorf("error getting status: %v", err)
		}

		status.Docked = event.OnStation
		status.Landed = event.OnPlanet
		status.OnFoot = false
		status.InSRV = event.SRV

		err = models.UpdateStatus(status)
		if err != nil {
			return fmt.Errorf("error updating status: %v", err)
		}
	*/

	return nil
}

type EventDisembark struct {
	GenericEvent
	SRV           bool
	Taxi          bool
	Multicrew     bool
	ID            int
	StarSystem    StarSystem
	SystemAddress SystemAddress
	Body          BodyName
	BodySystemID  BodySystemID `json:"BodyID"`
	OnStation     bool
	OnPlanet      bool
	StationName   StationName
	StationType   StationType
	MarketID      MarketID
}

func (eh *EventHandler) handleEventDisembark(rawEvent string) error {
	event, err := ParseEvent[EventDisembark](rawEvent)
	if err != nil {
		return err
	}

	/*
		status, err := models.GetStatus()
		if err != nil {
			return fmt.Errorf("error getting status: %v", err)
		}

		status.Docked = event.OnStation
		status.Landed = event.OnPlanet
		status.OnFoot = true
		status.InSRV = false
	*/

	if event.OnPlanet {
		body, err := models.GetBody(int64(event.SystemAddress), int64(event.BodySystemID))
		if err != nil {
			slog.Warn(fmt.Sprintf("error getting body to check footfall: %v", err))
		} else {
			if !body.Footfall {
				body.Footfall = true
				err = models.SaveBody(body)
				if err != nil {
					return fmt.Errorf("error updating body: %v", err)
				}
			}
		}
	}

	/*
		err = models.UpdateStatus(status)
		if err != nil {
			return fmt.Errorf("error updating status: %v", err)
		}
	*/

	return nil
}

type EventTouchdown struct {
	GenericEvent
	PlayerControlled bool
	Taxi             bool
	Multicrew        bool
	StarSystem       StarSystem
	SystemAddress    SystemAddress
	Body             BodyName
	BodySystemID     BodySystemID `json:"BodyID"`
	OnStation        bool
	OnPlanet         bool
	Latitude         float64
	Longitude        float64
}

func (eh *EventHandler) handleEventTouchdown(rawEvent string) error {
	/*
		event, err := ParseEvent[EventTouchdown](rawEvent)
		if err != nil {
			return err
		}

		status, err := models.GetStatus()
		if err != nil {
			return fmt.Errorf("error getting status: %v", err)
		}

		status.Docked = event.OnStation
		status.Landed = event.OnPlanet
		status.OnFoot = false
		status.InSRV = false

		err = models.UpdateStatus(status)
		if err != nil {
			return fmt.Errorf("error updating status: %v", err)
		}
	*/

	return nil
}

type EventLiftoff struct {
	GenericEvent
	PlayerControlled bool
	Taxi             bool
	Multicrew        bool
	StarSystem       StarSystem
	SystemAddress    SystemAddress
	Body             BodyName
	BodySystemID     BodySystemID `json:"BodyID"`
	OnStation        bool
	OnPlanet         bool
	Latitude         float64
	Longitude        float64
}

func (eh *EventHandler) handleEventLiftoff(rawEvent string) error {
	/*
		event, err := ParseEvent[EventLiftoff](rawEvent)
		if err != nil {
			return err
		}

		status, err := models.GetStatus()
		if err != nil {
			return fmt.Errorf("error getting status: %v", err)
		}

		status.Docked = event.OnStation
		status.Landed = false
		status.OnFoot = false
		status.InSRV = false

		err = models.UpdateStatus(status)
		if err != nil {
			return fmt.Errorf("error updating status: %v", err)
		}
	*/

	return nil
}

type EventApproachBody struct {
	GenericEvent
	StarSystem    StarSystem
	SystemAddress SystemAddress
	Body          BodyName
	BodySystemID  BodySystemID `json:"BodyID"`
}

func (eh *EventHandler) handleEventApproachBody(rawEvent string) error {
	event, err := ParseEvent[EventApproachBody](rawEvent)
	if err != nil {
		return err
	}

	status := models.GetStatus()
	status.SetCurrentBody(string(event.Body))

	return nil
}

type EventLeaveBody struct {
	GenericEvent
	StarSystem    StarSystem
	SystemAddress SystemAddress
	Body          BodyName
	BodySystemID  BodySystemID `json:"BodyID"`
}

func (eh *EventHandler) handleEventLeaveBody(rawEvent string) error {
	_, err := ParseEvent[EventLeaveBody](rawEvent)
	if err != nil {
		return err
	}

	status := models.GetStatus()
	status.SetCurrentBody("")

	return nil
}
