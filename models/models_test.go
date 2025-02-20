package models

import (
	"log"
	"log/slog"
	"os"
	"testing"

	"github.com/mrpapercut/seca/config"
	"gopkg.in/check.v1"
)

func TestModels(t *testing.T) {
	check.TestingT(t)
}

type ModelSuite struct {
	SampleSystem *System
	SampleStar   *Body
	SamplePlanet *Body
}

var _ = check.Suite(&ModelSuite{
	SampleSystem: &System{
		ID:            1,
		Name:          "Ruwachis",
		SystemAddress: 3894572831,
		StarPosX:      -0.124,
		StarPosY:      10.1244,
		StarPosZ:      -104.5135,
	},
	SampleStar: &Body{
		Name:         "Ruwachis A",
		BodySystemID: 1,
		SystemID:     1,
		BodyType:     "Star",
	},
	SamplePlanet: &Body{
		Name:         "Ruwachis A 1",
		BodySystemID: 2,
		SystemID:     1,
		BodyType:     "Planet",
	},
})

func (s *ModelSuite) SetUpSuite(c *check.C) {
	conf, err := config.GetConfig()
	if err != nil {
		log.Fatalf("error loading config: %v", err)
	}

	conf.DBName = ":memory:"

	// Setup logger
	defaultLogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(defaultLogger)

	err = Setup()
	if err != nil {
		c.Fatalf("Failed to create database")
	}
}

func (s *ModelSuite) TearDownTest(c *check.C) {
	Cleanup(c)
}
