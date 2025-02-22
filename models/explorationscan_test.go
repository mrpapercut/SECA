package models

import (
	"testing"
)

func createTestBodyScan(props testBodyScanProps) *ExplorationScan {
	return &ExplorationScan{
		SystemID: 1,
		System:   System{},
		BodyID:   1,
		Body: Body{
			BodyType:       "Planet",
			PlanetClass:    props.PlanetClass,
			TerraformState: props.TerraformState,
			MassEM:         props.MassEM,
			WasDiscovered:  props.WasDiscovered,
			WasMapped:      props.WasMapped,
			Mapped:         props.HasMapped,
		},
		EfficiencyTargetMet: props.EffTargetMet,
	}
}

type testBodyScanProps struct {
	PlanetClass    PlanetClass
	MassEM         float64
	TerraformState TerraformState
	WasDiscovered  bool
	WasMapped      bool
	HasMapped      bool
	EffTargetMet   bool
	ExpectedValue  []int64
}

var bodyScanProps = []testBodyScanProps{{
	PlanetClass:    AmmoniaWorld,
	MassEM:         0.43914,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{143463, 373004, 777091, 1887305, 2242455},
}, {
	PlanetClass:    EarthLikeWorld,
	MassEM:         0.498039,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{270290, 702753, 1464068, 3555753, 4224870},
}, {
	PlanetClass:    WaterWorld,
	MassEM:         0.780638,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{99747, 259343, 540297, 1312209, 1559138},
}, {
	PlanetClass:    WaterWorld,
	MassEM:         0.453011,
	TerraformState: Terraformable,
	ExpectedValue:  []int64{268616, 698400, 1455001, 3533732, 4198704},
}, {
	PlanetClass:    HighMetalContentBody,
	MassEM:         0.344919,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{14070, 36581, 76211, 185092, 219923},
}, {
	PlanetClass:    HighMetalContentBody,
	MassEM:         0.466929,
	TerraformState: Terraformable,
	ExpectedValue:  []int64{163948, 426264, 888051, 2156792, 2562654},
}, {
	PlanetClass:    MetalRichBody,
	MassEM:         0.323933,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{31632, 82244, 171342, 416136, 494443},
}, {
	PlanetClass:    IcyBody,
	MassEM:         0.01854,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{500, 1300, 2262, 4953, 6330},
}, {
	PlanetClass:    RockyBody,
	MassEM:         0.003359,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{500, 1300, 2170, 4661, 6064},
}, {
	PlanetClass:    RockyBody,
	MassEM:         0.142312,
	TerraformState: Terraformable,
	ExpectedValue:  []int64{129504, 336711, 701482, 1703675, 2024270},
}, {
	PlanetClass:    RockyIceBody,
	MassEM:         0.180686,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{500, 1300, 2446, 5533, 6861},
}, {
	PlanetClass:    ClassIGasGiant,
	MassEM:         69.55164,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{3845, 9997, 20828, 50584, 60103},
}, {
	PlanetClass:    ClassIIGasGiant,
	MassEM:         476.2409,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{28405, 73853, 153861, 373679, 443997},
}, {
	PlanetClass:    ClassIIIGasGiant,
	MassEM:         1148.922,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{995, 2587, 5389, 13088, 15551},
}, {
	PlanetClass:    ClassIVGasGiant,
	MassEM:         2615.635,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{1119, 2910, 6062, 14723, 17494},
}, {
	PlanetClass:    ClassVGasGiant,
	MassEM:         925.5758,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{966, 2510, 5230, 12702, 15092},
}, {
	PlanetClass:    GasGiantAmmoniaBasedLife,
	MassEM:         170.4551,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{774, 2014, 4195, 10188, 12105},
}, {
	PlanetClass:    GasGiantWaterBasedLife,
	MassEM:         477.0018,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{883, 2295, 4782, 11615, 13800},
}, {
	PlanetClass:    HeliumGasGiant,
	MassEM:         550.1418,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{900, 2339, 4874, 11837, 14064},
}, {
	PlanetClass:    WaterGiant,
	MassEM:         47.16377,
	TerraformState: NotTerraformable,
	ExpectedValue:  []int64{667, 1734, 3613, 8774, 10425},
}}

type scanState struct {
	WasDiscovered bool
	WasMapped     bool
	HasMapped     bool
	EffTargetMet  bool
}

var states = []scanState{{
	WasDiscovered: true,
	WasMapped:     true,
	HasMapped:     false,
	EffTargetMet:  false,
}, {
	WasDiscovered: false,
	WasMapped:     false,
	HasMapped:     false,
	EffTargetMet:  false,
}, {
	WasDiscovered: true,
	WasMapped:     true,
	HasMapped:     true,
	EffTargetMet:  true,
}, {
	WasDiscovered: true,
	WasMapped:     false,
	HasMapped:     true,
	EffTargetMet:  true,
}, {
	WasDiscovered: false,
	WasMapped:     false,
	HasMapped:     true,
	EffTargetMet:  true,
}}

func TestCalculatePlanetValue(t *testing.T) {
	for _, props := range bodyScanProps {
		for i, state := range states {
			props.WasDiscovered = state.WasDiscovered
			props.WasMapped = state.WasMapped
			props.HasMapped = state.HasMapped
			props.EffTargetMet = state.EffTargetMet

			scan := createTestBodyScan(props)

			value := GetExplorationScanValue(scan)

			if value != props.ExpectedValue[i] {
				t.Errorf("%s: expected %d, received %d", props.PlanetClass, props.ExpectedValue[i], value)
			}
		}
	}
}
