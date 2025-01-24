package events

import (
	"log"
	"log/slog"
	"os"
	"testing"

	"github.com/mrpapercut/seca/config"
	"github.com/mrpapercut/seca/models"
	"gopkg.in/check.v1"
)

func TestEvents(t *testing.T) {
	check.TestingT(t)
}

type EventSuite struct {
	eventHandler *EventHandler
}

var _ = check.Suite(&EventSuite{
	eventHandler: &EventHandler{},
})

func (s *EventSuite) SetUpSuite(c *check.C) {
	conf, err := config.GetConfig()
	if err != nil {
		log.Fatalf("error loading config: %v", err)
	}

	conf.DBName = ":memory:"

	// Setup logger
	defaultLogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(defaultLogger)

	err = models.Setup()
	if err != nil {
		c.Fatalf("Failed to create database")
	}
}

func (s *EventSuite) TearDownTest(c *check.C) {
	models.Cleanup(c)
}
