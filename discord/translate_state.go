package discord

import (
	"fmt"

	"github.com/mrpapercut/seca/models"
)

func TranslateStateForDiscord(state models.State, param string) string {
	newState := ""

	switch state {
	case models.StateFlying:
		if param != "" {
			newState = fmt.Sprintf("Flying near %s", param)
		} else {
			newState = "Flying"
		}
	case models.StateSupercruise:
		if param != "" {
			newState = fmt.Sprintf("In supercruise near %s", param)
		} else {
			newState = "Supercruising"
		}
	case models.StateChargeSupercruise:
		newState = "Preparing to jump to supercruise"
	case models.StateJumpingToSupercruise:
		newState = "Jumping to supercruise"
	case models.StateChargeHyperdrive:
		newState = fmt.Sprintf("Preparing to jump to system %s", param)
	case models.StateJumpingToSystem:
		newState = fmt.Sprintf("Jumping to system %s", param)
	case models.StateDocked:
		newState = fmt.Sprintf("Docked at %s", param)
	case models.StateLanded:
		newState = fmt.Sprintf("Landed on %s", param)
	case models.StateInSRV:
		newState = fmt.Sprintf("Driving SRV on %s", param)
	case models.StateOnFoot:
		if param != "" {
			newState = fmt.Sprintf("Walking on %s", param)
		} else {
			newState = "Walking"
		}
	case models.StateOnFootStation:
		newState = fmt.Sprintf("Walking around in %s", param)
	case models.StateOnFootHangar:
		newState = fmt.Sprintf("Walking around in hangar of %s", param)
	case models.StateOnFootPlanet:
		newState = fmt.Sprintf("Walking around on %s", param)
	case models.StateOnFootSocialSpace:
		newState = fmt.Sprintf("Walking around in the Concourse of %s", param)
	case models.StateOnFootExterior:
		newState = fmt.Sprintf("Walking outside on %s", param)
	case models.StateFuelScooping:
		newState = "Fuel scooping"
	case models.StateFSSMode:
		newState = "Scanning bodies"
	case models.StateBioScanning:
		newState = fmt.Sprintf("Scanning lifeforms on %s", param)
	}

	return newState
}
