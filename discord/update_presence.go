package discord

import (
	"fmt"
	"log/slog"

	"github.com/hugolgst/rich-go/client"
	"github.com/mrpapercut/seca/models"
)

func UpdateDiscordPresence() {
	dc := GetDiscordInstance()

	if !dc.Connected {
		return
	}

	status := models.GetStatus()

	dcState := fmt.Sprintf("System: %s", status.CurrentSystem)
	param := status.CurrentBody

	if status.State == models.StateJumpingToSystem || status.State == models.StateChargeHyperdrive {
		nextStop, err := models.GetNextStop()
		if err != nil {
			slog.Warn(fmt.Sprintf("error getting next stop: %v", err))
		} else {
			param = nextStop.System.Name
		}
	}

	dcDetails := TranslateStateForDiscord(status.State, param)

	dc.Message <- &client.Activity{
		State:   dcState,
		Details: dcDetails,
	}
}
