package models

import (
	"fmt"
	"log/slog"
	"sync"
)

type State string

const (
	StateFlying            State = "flying"
	StateSupercruise       State = "supercruise"
	StateChargeSupercruise State = "supercruise_charging"
	StateJumping           State = "jumping"
	StateChargeHyperdrive  State = "hyperdrive_charging"
	StateDocked            State = "docked"
	StateLanded            State = "landed"
	StateInSRV             State = "in_srv"
	StateOnFoot            State = "on_foot"
	StateOnFootStation     State = "on_foot_station"
	StateOnFootHangar      State = "on_foot_hangar"
	StateOnFootPlanet      State = "on_foot_planet"
	StateOnFootSocialSpace State = "on_foot_social_space"
	StateOnFootExterior    State = "on_foot_exterior"
	StateFuelScooping      State = "fuel_scooping"
	StateFSSMode           State = "in_fss_mode"
	StateBioScanning       State = "bio_scanning"
)

type Status struct {
	CommanderName             string  `json:"commander_name"`
	ShipName                  string  `json:"ship_name"`
	ShipType                  string  `json:"ship_type"`
	Credits                   int64   `json:"credits"`
	State                     State   `json:"state"`
	CurrentSystem             string  `json:"current_system"`
	CurrentBody               string  `json:"current_body"`
	CurrentSample             string  `json:"current_sample"`
	SampleProgress            int64   `json:"sample_progress"`
	SampleBaseValue           int64   `json:"sample_base_value"`
	SampleCCR                 int64   `json:"sample_ccr"`
	EstimatedExplorationValue int64   `json:"estimated_exploration_value"`
	EstimatedBiologicalValue  int64   `json:"estimated_biological_value"`
	SystemsVisited            int64   `json:"systems_visited"`
	TotalJumps                int64   `json:"total_jumps"`
	TotalDistance             float64 `json:"total_distance"`
	FuelLevel                 float64 `json:"fuel_level"`
	FuelCapacity              float64 `json:"fuel_capacity"`
}

// Update on LoadGame, Loadout
type StatusCommanderInfo struct {
	CommanderName string `json:"commander_name"`
	ShipName      string `json:"ship_name"`
	ShipType      string `json:"ship_type"`
}

// Update on Status
type StatusCredits struct {
	Credits int64 `json:"credits"`
}

// Update on Status, FSDJump
type StatusState struct {
	State         State  `json:"state"`
	CurrentSystem string `json:"current_system"`
	CurrentBody   string `json:"current_body"`
}

// Updates on ScanOrganic
type StatusSampling struct {
	CurrentSample   string `json:"current_sample"`
	SampleProgress  int64  `json:"sample_progress"`
	SampleBaseValue int64  `json:"sample_base_value"`
	SampleCCR       int64  `json:"sample_ccr"`
}

// Updates on Scan
type StatusSystemExploration struct {
	// BodiesWorthMapping
	// BodiesWithBioSignals
}

// Updates on FSSSignalDiscovered
type StatusSystemSignals struct {
	Signals []FSSSignal `json:"signals"`
}

// Updates on NavRoute, FSDJump
type CurrentRoute struct{}

// Updates on Scan, ScanOrganic, exploration & biological sale
type StatusScanStatistics struct {
	EstimatedExplorationValue int64 `json:"estimated_exploration_value"`
	EstimatedBiologicalValue  int64 `json:"estimated_biological_value"`
}

// Updated on Statistics, FSDJump
type StatusTravelStatistics struct {
	SystemsVisited int64   `json:"systems_visited"`
	TotalJumps     int64   `json:"total_jumps"`
	TotalDistance  float64 `json:"total_distance"`
}

// Updates on LoadGame, Loadout, FSDJump, Status
type StatusFuel struct {
	FuelCapacity float64 `json:"fuel_capacity"`
	FuelLevel    float64 `json:"fuel_level"`
}

var statusInstance *Status
var statusLock = &sync.Mutex{}

func GetStatus() *Status {
	if statusInstance == nil {
		statusLock.Lock()
		defer statusLock.Unlock()

		if statusInstance == nil {
			statusInstance = &Status{}
		}
	}

	return statusInstance
}

func ClearStatus() {
	statusInstance = nil
}

func (s *Status) SetCommanderName(name string) {
	s.CommanderName = name
}

func (s *Status) SetShip(shipName, shipType string) {
	s.ShipName = shipName
	s.ShipType = shipType
}

func GetStatusCommanderInfo() *StatusCommanderInfo {
	status := GetStatus()

	return &StatusCommanderInfo{
		CommanderName: status.CommanderName,
		ShipName:      status.ShipName,
		ShipType:      status.ShipType,
	}
}

func (s *Status) SetCredits(credits int64) {
	s.Credits = credits
}

func GetStatusCredits() *StatusCredits {
	status := GetStatus()

	return &StatusCredits{
		Credits: status.Credits,
	}
}

func (s *Status) SetState(state State) {
	s.State = state
}

func (s *Status) SetCurrentSystem(systemName string) {
	s.CurrentSystem = systemName
}

func (s *Status) SetCurrentBody(bodyName string) {
	s.CurrentBody = bodyName
}

func GetStatusState() *StatusState {
	status := GetStatus()

	return &StatusState{
		State:         status.State,
		CurrentSystem: status.CurrentSystem,
		CurrentBody:   status.CurrentBody,
	}
}

func (s *Status) SetCurrentSample(sampleSpecies BiologicalSpecies, sampleGenus BiologicalGenus, sampleVariant string) {
	if s.CurrentSample != sampleVariant {
		s.CurrentSample = sampleVariant
		s.SampleProgress = 1
		s.SampleBaseValue = GetBiologicalScanValue(sampleSpecies, false)
		s.SampleCCR = GetBiologicalScanCCR(sampleGenus)
	} else {
		s.SampleProgress += 1
	}
}

func (s *Status) ClearCurrentSample() {
	s.CurrentSample = ""
	s.SampleProgress = 0
	s.SampleBaseValue = 0
	s.SampleCCR = 0
}

func GetStatusSampling() *StatusSampling {
	status := GetStatus()

	return &StatusSampling{
		CurrentSample:   status.CurrentSample,
		SampleProgress:  status.SampleProgress,
		SampleBaseValue: status.SampleBaseValue,
		SampleCCR:       status.SampleCCR,
	}
}

func (s *Status) UpdateEstimatedExplorationEarnings() {
	explorationValue, err := GetTotalEstimatedExplorationScanValue()
	if err != nil {
		slog.Warn(fmt.Sprintf("error getting exploration value: %v", err))
		return
	}
	s.EstimatedExplorationValue = explorationValue
}

func (s *Status) UpdateEstimatedBiologicalEarnings() {
	biologicalValue, err := GetTotalEstimatedBiologicalScanValue()
	if err != nil {
		slog.Warn(fmt.Sprintf("error getting biological value: %v", err))
	}
	s.EstimatedBiologicalValue = biologicalValue
}

func GetStatusScanStatistics() *StatusScanStatistics {
	status := GetStatus()

	return &StatusScanStatistics{
		EstimatedExplorationValue: status.EstimatedExplorationValue,
		EstimatedBiologicalValue:  status.EstimatedBiologicalValue,
	}
}

func (s *Status) SetTravelStatistics(systemsVisited int64, totalJumps int64, totalDistance float64) {
	s.SystemsVisited = systemsVisited
	s.TotalJumps = totalJumps
	s.TotalDistance = totalDistance
}

func (s *Status) UpdateTravelStatistics(jumpDistance float64) {
	s.SystemsVisited += 1
	s.TotalJumps += 1
	s.TotalDistance += jumpDistance
}

func GetStatusTravelStatistics() *StatusTravelStatistics {
	status := GetStatus()

	return &StatusTravelStatistics{
		SystemsVisited: status.SystemsVisited,
		TotalJumps:     status.TotalJumps,
		TotalDistance:  status.TotalDistance,
	}
}

func (s *Status) SetFuelCapacity(fuelCapacity float64) {
	s.FuelCapacity = fuelCapacity
}

func (s *Status) SetFuelLevel(fuelLevel float64) {
	s.FuelLevel = fuelLevel
}

func GetStatusFuel() *StatusFuel {
	status := GetStatus()

	return &StatusFuel{
		FuelCapacity: status.FuelCapacity,
		FuelLevel:    status.FuelLevel,
	}
}

type Flag1 int64
type Flag2 int64

const (
	DOCKED_ON_LANDING_PAD        Flag1 = 0x1
	LANDED_ON_PLANET_SURFACE     Flag1 = 0x2
	LANDING_GEAR_DEPLOYED        Flag1 = 0x4
	SHIELDS_UP                   Flag1 = 0x8
	SUPERCRUISE                  Flag1 = 0x10
	FLIGHT_ASSIST_OFF            Flag1 = 0x20
	HARDPOINTS_DEPLOYED          Flag1 = 0x40
	IN_WING                      Flag1 = 0x80
	LIGHTS_ON                    Flag1 = 0x100
	CARGO_SCOOP_DEPLOYED         Flag1 = 0x200
	SILENT_RUNNING               Flag1 = 0x400
	SCOOPING_FUEL                Flag1 = 0x800
	SRV_HANDBRAKE                Flag1 = 0x1000
	SRV_USING_TURRET_VIEW        Flag1 = 0x2000
	SRV_TURRET_RETRACTED         Flag1 = 0x4000
	SRV_DRIVE_ASSIST             Flag1 = 0x8000
	FSD_MASS_LOCKED              Flag1 = 0x10000
	FSD_CHARGING                 Flag1 = 0x20000
	FSD_COOLDOWN                 Flag1 = 0x40000
	LOW_FUEL                     Flag1 = 0x80000
	OVERHEATING                  Flag1 = 0x100000
	HAS_LAT_LONG                 Flag1 = 0x200000
	IS_IN_DANGER                 Flag1 = 0x400000
	BEING_INTERDICTED            Flag1 = 0x800000
	IN_MAIN_SHIP                 Flag1 = 0x1000000
	IN_FIGHTER                   Flag1 = 0x2000000
	IN_SRV                       Flag1 = 0x4000000
	HUD_IN_ANALYSIS_MODE         Flag1 = 0x8000000
	NIGHTVISION                  Flag1 = 0x10000000
	ALTITUDE_FROM_AVERAGE_RADIUS Flag1 = 0x20000000
	FSD_JUMP                     Flag1 = 0x40000000
	SRV_HIGH_BEAM                Flag1 = 0x80000000
	ON_FOOT                      Flag2 = 0x1
	IN_TAXI                      Flag2 = 0x2
	IN_MULTICREW                 Flag2 = 0x4
	ON_FOOT_IN_STATION           Flag2 = 0x8
	ON_FOOT_ON_PLANET            Flag2 = 0x10
	AIM_DOWN_SIGHT               Flag2 = 0x20
	LOW_OXYGEN                   Flag2 = 0x40
	LOW_HEALTH                   Flag2 = 0x80
	COLD                         Flag2 = 0x100
	HOT                          Flag2 = 0x200
	VERY_COLD                    Flag2 = 0x400
	VERY_HOT                     Flag2 = 0x800
	GLIDE_MODE                   Flag2 = 0x1000
	ON_FOOT_IN_HANGAR            Flag2 = 0x2000
	ON_FOOT_SOCIAL_SPACE         Flag2 = 0x4000
	ON_FOOT_EXTERIOR             Flag2 = 0x8000
	BREATHABLE_ATMOSPHERE        Flag2 = 0x10000
	TELEPRESENCE_MULTICREW       Flag2 = 0x20000
	PHYSICAL_MULTICREW           Flag2 = 0x40000
	FSD_HYPERDRIVE_CHARGING      Flag2 = 0x80000
)

type ParsedFlags struct {
	DockedOnLandingPad        bool
	LandedOnPlanetSurface     bool
	LandingGearDeployed       bool
	ShieldsUp                 bool
	Supercruise               bool
	FlightAssistOff           bool
	HardpointsDeployed        bool
	InWing                    bool
	LightsOn                  bool
	CargoScoopDeployed        bool
	SilentRunning             bool
	ScoopingFuel              bool
	SRVHandbrakeOn            bool
	SRVUsingTurretView        bool
	SRVTurretRetracted        bool
	SRVDrivingAssistOn        bool
	FSDMassLocked             bool
	FSDCharging               bool
	FSDCooldown               bool
	LowFuel                   bool
	Overheating               bool
	HasLatLong                bool
	IsInDanger                bool
	BeingInterdicted          bool
	InMainShip                bool
	InFighter                 bool
	InSRV                     bool
	HudInAnalysisMode         bool
	Nightvision               bool
	AltitudeFromAverageRadius bool
	FSDJump                   bool
	SRVHighBeam               bool
	OnFoot                    bool
	InTaxi                    bool
	InMulticrew               bool
	OnFootInStation           bool
	OnFootOnPlanet            bool
	AimDownSight              bool
	LowOxygen                 bool
	LowHealth                 bool
	Cold                      bool
	Hot                       bool
	VeryCold                  bool
	VeryHot                   bool
	GlideMode                 bool
	OnFootInHangar            bool
	OnFootSocialSpace         bool
	OnFootExterior            bool
	BreathableAtmosphere      bool
	TelepresenceMulticrew     bool
	PhysicalMulticrew         bool
	FSDHyperdriveCharging     bool
}

func ParseStatusFlags(flags1 int64, flags2 int64) *ParsedFlags {
	parsedFlags := &ParsedFlags{
		DockedOnLandingPad:        flags1&int64(DOCKED_ON_LANDING_PAD) != 0,
		LandedOnPlanetSurface:     flags1&int64(LANDED_ON_PLANET_SURFACE) != 0,
		LandingGearDeployed:       flags1&int64(LANDING_GEAR_DEPLOYED) != 0,
		ShieldsUp:                 flags1&int64(SHIELDS_UP) != 0,
		Supercruise:               flags1&int64(SUPERCRUISE) != 0,
		FlightAssistOff:           flags1&int64(FLIGHT_ASSIST_OFF) != 0,
		HardpointsDeployed:        flags1&int64(HARDPOINTS_DEPLOYED) != 0,
		InWing:                    flags1&int64(IN_WING) != 0,
		LightsOn:                  flags1&int64(LIGHTS_ON) != 0,
		CargoScoopDeployed:        flags1&int64(CARGO_SCOOP_DEPLOYED) != 0,
		SilentRunning:             flags1&int64(SILENT_RUNNING) != 0,
		ScoopingFuel:              flags1&int64(SCOOPING_FUEL) != 0,
		SRVHandbrakeOn:            flags1&int64(SRV_HANDBRAKE) != 0,
		SRVUsingTurretView:        flags1&int64(SRV_USING_TURRET_VIEW) != 0,
		SRVTurretRetracted:        flags1&int64(SRV_TURRET_RETRACTED) != 0,
		SRVDrivingAssistOn:        flags1&int64(SRV_DRIVE_ASSIST) != 0,
		FSDMassLocked:             flags1&int64(FSD_MASS_LOCKED) != 0,
		FSDCharging:               flags1&int64(FSD_CHARGING) != 0,
		FSDCooldown:               flags1&int64(FSD_COOLDOWN) != 0,
		LowFuel:                   flags1&int64(LOW_FUEL) != 0,
		Overheating:               flags1&int64(OVERHEATING) != 0,
		HasLatLong:                flags1&int64(HAS_LAT_LONG) != 0,
		IsInDanger:                flags1&int64(IS_IN_DANGER) != 0,
		BeingInterdicted:          flags1&int64(BEING_INTERDICTED) != 0,
		InMainShip:                flags1&int64(IN_MAIN_SHIP) != 0,
		InFighter:                 flags1&int64(IN_FIGHTER) != 0,
		InSRV:                     flags1&int64(IN_SRV) != 0,
		HudInAnalysisMode:         flags1&int64(HUD_IN_ANALYSIS_MODE) != 0,
		Nightvision:               flags1&int64(NIGHTVISION) != 0,
		AltitudeFromAverageRadius: flags1&int64(ALTITUDE_FROM_AVERAGE_RADIUS) != 0,
		FSDJump:                   flags1&int64(FSD_JUMP) != 0,
		SRVHighBeam:               flags1&int64(SRV_HIGH_BEAM) != 0,
		OnFoot:                    flags2&int64(ON_FOOT) != 0,
		InTaxi:                    flags2&int64(IN_TAXI) != 0,
		InMulticrew:               flags2&int64(IN_MULTICREW) != 0,
		OnFootInStation:           flags2&int64(ON_FOOT_IN_STATION) != 0,
		OnFootOnPlanet:            flags2&int64(ON_FOOT_ON_PLANET) != 0,
		AimDownSight:              flags2&int64(AIM_DOWN_SIGHT) != 0,
		LowOxygen:                 flags2&int64(LOW_OXYGEN) != 0,
		LowHealth:                 flags2&int64(LOW_HEALTH) != 0,
		Cold:                      flags2&int64(COLD) != 0,
		Hot:                       flags2&int64(HOT) != 0,
		VeryCold:                  flags2&int64(VERY_COLD) != 0,
		VeryHot:                   flags2&int64(VERY_HOT) != 0,
		GlideMode:                 flags2&int64(GLIDE_MODE) != 0,
		OnFootInHangar:            flags2&int64(ON_FOOT_IN_HANGAR) != 0,
		OnFootSocialSpace:         flags2&int64(ON_FOOT_SOCIAL_SPACE) != 0,
		OnFootExterior:            flags2&int64(ON_FOOT_EXTERIOR) != 0,
		BreathableAtmosphere:      flags2&int64(BREATHABLE_ATMOSPHERE) != 0,
		TelepresenceMulticrew:     flags2&int64(TELEPRESENCE_MULTICREW) != 0,
		PhysicalMulticrew:         flags2&int64(PHYSICAL_MULTICREW) != 0,
		FSDHyperdriveCharging:     flags2&int64(FSD_HYPERDRIVE_CHARGING) != 0,
	}

	return parsedFlags
}
