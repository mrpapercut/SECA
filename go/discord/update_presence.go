package discord

import (
	"github.com/hugolgst/rich-go/client"
	"github.com/mrpapercut/seca/models"
)

func UpdateDiscordPresence() {
	status := models.GetStatus()

	dcState := status.CurrentSystem
	param := status.CurrentBody

	if status.State == models.StateJumpingToSystem {
		// Get first of route
	}

	dcDetails := TranslateStateForDiscord(status.State, param)

	dc := GetDiscordInstance()

	dc.Message <- &client.Activity{
		State:   dcState,
		Details: dcDetails,
	}
}
