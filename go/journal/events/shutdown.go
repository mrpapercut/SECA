package events

import "github.com/mrpapercut/seca/discord"

type ShutdownEvent struct {
	GenericEvent
}

func (eh *EventHandler) handleEventShutdown(rawEvent string) error {
	_, err := ParseEvent[ShutdownEvent](rawEvent)
	if err != nil {
		return err
	}

	dc := discord.GetDiscordInstance()
	dc.Stop()

	return nil
}
