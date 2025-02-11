package discord

import (
	"fmt"
	"log/slog"
	"sync"
	"time"

	"github.com/hugolgst/rich-go/client"
	"github.com/mrpapercut/seca/config"
)

type DiscordPresence struct {
	Message chan *client.Activity
	TimeNow time.Time
}

var discordInstance *DiscordPresence
var discordLock = &sync.Mutex{}

func GetDiscordInstance() *DiscordPresence {
	if discordInstance == nil {
		discordLock.Lock()
		defer discordLock.Unlock()

		if discordInstance == nil {
			discordInstance = &DiscordPresence{
				Message: make(chan *client.Activity),
			}
		}
	}

	return discordInstance
}

func (d *DiscordPresence) Start() error {
	d.TimeNow = time.Now()

	conf, _ := config.GetConfig()

	err := client.Login(conf.DiscordClientID)
	if err != nil {
		return fmt.Errorf("error logging in: %v", err)
	}

	go d.startListening()

	return nil
}

func (d *DiscordPresence) startListening() {
	for {
		message := <-d.Message

		slog.Info("Setting Discord presence", "state", message.State, "details", message.Details)

		go d.setActivity(message)
	}
}

func (d *DiscordPresence) setActivity(activity *client.Activity) {
	activity.Timestamps.Start = &d.TimeNow

	err := client.SetActivity(*activity)
	if err != nil {
		slog.Warn(fmt.Sprintf("error setting activity: %v", err))
	}
}
