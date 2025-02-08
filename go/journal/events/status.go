package events

import (
	"github.com/mrpapercut/seca/models"
)

type GuiFocus int64

const (
	GuiNoFocus         GuiFocus = 0
	GuiInternalPanel   GuiFocus = 1
	GuiExternalPanel   GuiFocus = 2
	GuiCommsPanel      GuiFocus = 3
	GuiRolePanel       GuiFocus = 4
	GuiStationServices GuiFocus = 5
	GuiGalaxyMap       GuiFocus = 6
	GuiSystemMap       GuiFocus = 7
	GuiOrrery          GuiFocus = 8
	GuiFSSMode         GuiFocus = 9
	GuiSAAMode         GuiFocus = 10
	GuiCodex           GuiFocus = 11
)

type LegalState string

const (
	LegalStateClean           LegalState = "Clean"
	LegalStateIllegalCargo    LegalState = "IllegalCargo"
	LegalStateSpeeding        LegalState = "Speeding"
	LegalStateWanted          LegalState = "Wanted"
	LegalStateHostile         LegalState = "Hostile"
	LegalStatePassengerWanted LegalState = "PassengerWanted"
	LegalStateWarrant         LegalState = "Warrant"
)

type StatusEvent struct {
	GenericEvent
	Flags     int64
	Flags2    int64
	Pips      []int64
	Firegroup int64
	GuiFocus  GuiFocus
	Fuel      struct {
		FuelMain      float64
		FuelReservoir float64
	}
	Cargo        float64
	LegalState   LegalState
	Latitude     float64
	Longitude    float64
	Altitude     float64
	Heading      float64
	PlanetRadius float64
	Balance      float64
	BodyName     string
	Destination  struct {
		System SystemAddress
		Body   BodySystemID
		Name   string
	}
	Oxygen         float64
	Health         float64
	Temperature    float64
	SelectedWeapon string `json:"SelectedWeapon_Localised"`
	Gravity        float64
}

func (eh *EventHandler) handleEventStatus(rawEvent string) error {
	event, err := ParseEvent[StatusEvent](rawEvent)
	if err != nil {
		return err
	}

	status := models.GetStatus()

	status.SetFuelLevel(event.Fuel.FuelMain)
	status.SetCredits(int64(event.Balance))
	status.SetCurrentBody(event.BodyName)

	newState := getNewState(&event)

	status.SetState(newState)

	return nil
}

func getNewState(event *StatusEvent) models.State {
	parsedFlags := models.ParseStatusFlags(event.Flags, event.Flags2)

	var newState models.State

	newState = models.StateFlying

	if parsedFlags.DockedOnLandingPad {
		newState = models.StateDocked
	}

	if parsedFlags.LandedOnPlanetSurface {
		newState = models.StateLanded
	}

	if parsedFlags.Supercruise {
		newState = models.StateSupercruise
	}

	if parsedFlags.ScoopingFuel {
		newState = models.StateFuelScooping
	}

	if parsedFlags.FSDCharging {
		newState = models.StateChargeSupercruise
	}

	if parsedFlags.FSDHyperdriveCharging {
		newState = models.StateChargeHyperdrive
	}

	if parsedFlags.InSRV {
		newState = models.StateInSRV
	}

	if parsedFlags.FSDJump {
		newState = models.StateJumping
	}

	if parsedFlags.OnFoot {
		newState = models.StateOnFoot
	}

	if parsedFlags.OnFootInStation {
		newState = models.StateOnFootStation
	}

	if parsedFlags.OnFootOnPlanet {
		newState = models.StateOnFootPlanet
	}

	if parsedFlags.OnFootInHangar {
		newState = models.StateOnFootHangar
	}

	if parsedFlags.OnFootSocialSpace {
		newState = models.StateOnFootSocialSpace
	}

	if parsedFlags.OnFootExterior {
		newState = models.StateOnFootExterior
	}

	if event.GuiFocus == GuiFSSMode {
		newState = models.StateFSSMode
	}

	if event.SelectedWeapon == "Genetic Sampler" {
		newState = models.StateBioScanning
	}

	return newState
}
