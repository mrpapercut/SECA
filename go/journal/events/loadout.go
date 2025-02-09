package events

import "github.com/mrpapercut/seca/models"

type LoadoutModuleEngineeringModifier struct {
	Label         string
	Value         float64
	OriginalValue float64
	LessIsGood    int64
}

type LoadoutModuleEngineering struct {
	Engineer           string
	EngineerID         int64
	BlueprintID        int64
	BlueprintName      string
	Level              int64
	Quality            float64
	ExperimentalEffect string `json:"ExperimentalEffect_Localised"`
	Modifiers          []LoadoutModuleEngineeringModifier
}

type LoadoutModule struct {
	Slot        string
	Item        string
	On          bool
	Priority    int64
	Health      float64
	Value       int64
	Engineering LoadoutModuleEngineering
}

type LoadoutEvent struct {
	GenericEvent
	Ship          string
	ShipID        int64
	ShipName      string
	ShipIdent     string
	HullValue     int64
	ModulesValue  int64
	HullHealth    float64
	UnladenMass   float64
	CargoCapacity int64
	MaxJumpRange  float64
	FuelCapacity  struct {
		Main    float64
		Reserve float64
	}
	Rebuy   int64
	Modules []LoadoutModule
}

func (ev *EventHandler) handleEventLoadout(rawEvent string) error {
	event, err := ParseEvent[LoadoutEvent](rawEvent)
	if err != nil {
		return err
	}

	status := models.GetStatus()

	status.SetShip(event.ShipName, event.Ship)
	status.SetFuelCapacity(event.FuelCapacity.Main)

	return nil
}
