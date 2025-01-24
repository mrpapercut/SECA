package models

import "time"

type NamePercentMap struct {
	Name    string
	Percent float64
}

type Coordinates struct {
	X float64
	Y float64
	Z float64
}

type TerraformState string

const (
	NotTerraformable TerraformState = ""
	Terraformable    TerraformState = "Terraformable"
	Terraforming     TerraformState = "Terraforming"
	Terraformed      TerraformState = "Terraformed"
)

type PlanetClass string

const (
	IcyBody                  PlanetClass = "Icy body"
	RockyBody                PlanetClass = "Rocky body"
	RockyIceBody             PlanetClass = "Rocky ice body"
	MetalRichBody            PlanetClass = "Metal rich body"
	HighMetalContentBody     PlanetClass = "High metal content body"
	EarthLikeWorld           PlanetClass = "Earthlike body"
	WaterWorld               PlanetClass = "Water world"
	AmmoniaWorld             PlanetClass = "Ammonia world"
	HeliumGasGiant           PlanetClass = "Helium rich gas giant"
	GasGiantWaterBasedLife   PlanetClass = "Gas giant with water based life"
	GasGiantAmmoniaBasedLife PlanetClass = "Gas giant with ammonia based life"
	WaterGiant               PlanetClass = "Water giant"
	ClassIGasGiant           PlanetClass = "Sudarsky class I gas giant"
	ClassIIGasGiant          PlanetClass = "Sudarsky class II gas giant"
	ClassIIIGasGiant         PlanetClass = "Sudarsky class III gas giant"
	ClassIVGasGiant          PlanetClass = "Sudarsky class IV gas giant"
	ClassVGasGiant           PlanetClass = "Sudarsky class V gas giant"
)

type Atmosphere string
type AtmosphereType string
type AtmosphereComposition map[string]float64
type Composition map[string]float64
type Materials []NamePercentMap
type Volcanism string

type StarType string

const (
	// Main Sequence
	ClassO StarType = "O"
	ClassB StarType = "B"
	ClassA StarType = "A"
	ClassF StarType = "F"
	ClassG StarType = "G"
	ClassK StarType = "K"
	ClassM StarType = "M"
	// Giants
	ClassBBlueWhiteSupergiant   StarType = "B_BlueWhiteSupergiant"
	ClassABlueWhiteSupergiant   StarType = "A_BlueWhiteSupergiant"
	ClassFWhiteSupergiant       StarType = "F_WhiteSupergiant"
	ClassGWhiteYellowSupergiant StarType = "G_WhiteYellowSupergiant"
	ClassKOrangeGiant           StarType = "K_OrangeGiant"
	ClassMRedGiant              StarType = "M_RedGiant"
	ClassMRedSupergiant         StarType = "M_RedSupergiant"
	// Proto stars
	ClassAeBe StarType = "AeBe" // Herbig Ae/Be
	ClassTTS  StarType = "TTS"  // T Tauri
	// Carbon stars
	ClassC  StarType = "C"
	ClassCJ StarType = "CJ"
	ClassCN StarType = "CN"
	ClassMS StarType = "MS"
	ClassS  StarType = "S"
	// Wolf-Rayet
	ClassW   StarType = "W"
	ClassWC  StarType = "WC"
	ClassWN  StarType = "WN"
	ClassWNC StarType = "WNC"
	ClassWO  StarType = "WO"
	// White dwarfs
	ClassD   StarType = "D"
	ClassDA  StarType = "DA"
	ClassDAB StarType = "DAB"
	ClassDAO StarType = "DAO"
	ClassDAZ StarType = "DAZ"
	ClassDAV StarType = "DAV"
	ClassDB  StarType = "DB"
	ClassDBZ StarType = "DBZ"
	ClassDBV StarType = "DBV"
	ClassDO  StarType = "DO"
	ClassDOV StarType = "DOV"
	ClassDQ  StarType = "DQ"
	ClassDC  StarType = "DC"
	ClassDCV StarType = "DCV"
	ClassDX  StarType = "DX"
	// Brown dwarfs
	ClassL StarType = "L"
	ClassT StarType = "T"
	ClassY StarType = "Y"
	// Non-sequence
	ClassN    StarType = "N"
	ClassH    StarType = "H"
	ClassSMBH StarType = "SuperMassiveBlackHole"
)

type EventTimestamp *time.Time

type BiologicalGenus string

const (
	GenusAleoida          BiologicalGenus = "Aleoida"
	GenusAmphoraPlant     BiologicalGenus = "Amphora Plant"
	GenusAnemone          BiologicalGenus = "Anemone"
	GenusBacterium        BiologicalGenus = "Bacterium"
	GenusBarkMound        BiologicalGenus = "Bark Mound"
	GenusBrainTree        BiologicalGenus = "Brain Tree"
	GenusCactoida         BiologicalGenus = "Cactoida"
	GenusClypeus          BiologicalGenus = "Clypeus"
	GenusConcha           BiologicalGenus = "Concha"
	GenusCrystallineShard BiologicalGenus = "Crystalline Shard"
	GenusElectricae       BiologicalGenus = "Electricae"
	GenusFonticulua       BiologicalGenus = "Fonticulua"
	GenusFrutexa          BiologicalGenus = "Frutexa"
	GenusFumerola         BiologicalGenus = "Fumerola"
	GenusFungoida         BiologicalGenus = "Fungoida"
	GenusOsseus           BiologicalGenus = "Osseus"
	GenusRecepta          BiologicalGenus = "Recepta"
	GenusSinuousTuber     BiologicalGenus = "Sinuous Tuber"
	GenusStratum          BiologicalGenus = "Stratum"
	GenusTubus            BiologicalGenus = "Tubus"
	GenusTussock          BiologicalGenus = "Tussock"
	GenusThargoid         BiologicalGenus = "Thargoid"
)

type BiologicalSpecies string

const (
	SpeciesAleoidaArcus                  BiologicalSpecies = "Aleoida Arcus"
	SpeciesAleoidaCoronamus              BiologicalSpecies = "Aleoida Coronamus"
	SpeciesAleoidaGravis                 BiologicalSpecies = "Aleoida Gravis"
	SpeciesAleoidaLaminiae               BiologicalSpecies = "Aleoida Laminiae"
	SpeciesAleoidaSpica                  BiologicalSpecies = "Aleoida Spica"
	SpeciesAmphoraPlant                  BiologicalSpecies = "Amphora Plant"
	SpeciesAnemoneBlatteumBioluminescent BiologicalSpecies = "Blatteum Bioluminescent Anemone"
	SpeciesAnemoneCroceum                BiologicalSpecies = "Croceum Anemone"
	SpeciesAnemoneLuteolum               BiologicalSpecies = "Luteolum Anemone"
	SpeciesAnemonePrasinumBioluminescent BiologicalSpecies = "Prasinum Bioluminescent Anemone"
	SpeciesAnemonePuniceum               BiologicalSpecies = "Puniceum Anemone"
	SpeciesAnemoneRoseum                 BiologicalSpecies = "Roseum Anemone"
	SpeciesAnemoneRoseumBioluminescent   BiologicalSpecies = "Roseum Bioluminescent Anemone"
	SpeciesAnemoneRubeumBioluminescent   BiologicalSpecies = "Rubeum Bioluminescent Anemone"
	SpeciesBacteriumAcies                BiologicalSpecies = "Bacterium Acies"
	SpeciesBacteriumAlcyoneum            BiologicalSpecies = "Bacterium Alcyoneum"
	SpeciesBacteriumAurasus              BiologicalSpecies = "Bacterium Aurasus"
	SpeciesBacteriumBullaris             BiologicalSpecies = "Bacterium Bullaris"
	SpeciesBacteriumCerbrus              BiologicalSpecies = "Bacterium Cerbrus"
	SpeciesBacteriumInformem             BiologicalSpecies = "Bacterium Informem"
	SpeciesBacteriumNebulus              BiologicalSpecies = "Bacterium Nebulus"
	SpeciesBacteriumOmentum              BiologicalSpecies = "Bacterium Omentum"
	SpeciesBacteriumScopulum             BiologicalSpecies = "Bacterium Scopulum"
	SpeciesBacteriumTela                 BiologicalSpecies = "Bacterium Tela"
	SpeciesBacteriumVerrata              BiologicalSpecies = "Bacterium Verrata"
	SpeciesBacteriumVesicula             BiologicalSpecies = "Bacterium Vesicula"
	SpeciesBacteriumVolu                 BiologicalSpecies = "Bacterium Volu"
	SpeciesBarkMound                     BiologicalSpecies = "Bark Mound"
	SpeciesBrainTreeAureum               BiologicalSpecies = "Aureum Brain Tree"
	SpeciesBrainTreeGypseeum             BiologicalSpecies = "Gypseeum Brain Tree"
	SpeciesBrainTreeLindigoticum         BiologicalSpecies = "Lindigoticum Brain Tree"
	SpeciesBrainTreeLividum              BiologicalSpecies = "Lividum Brain Tree"
	SpeciesBrainTreeOstrinum             BiologicalSpecies = "Ostrinum Brain Tree"
	SpeciesBrainTreePuniceum             BiologicalSpecies = "Puniceum Brain Tree"
	SpeciesBrainTreeRoseum               BiologicalSpecies = "Roseum Brain Tree"
	SpeciesBrainTreeViride               BiologicalSpecies = "Viride Brain Tree"
	SpeciesCactoidaCortexum              BiologicalSpecies = "Cactoida Cortexum"
	SpeciesCactoidaLapis                 BiologicalSpecies = "Cactoida Lapis"
	SpeciesCactoidaPeperatis             BiologicalSpecies = "Cactoida Peperatis"
	SpeciesCactoidaPullulanta            BiologicalSpecies = "Cactoida Pullulanta"
	SpeciesCactoidaVermis                BiologicalSpecies = "Cactoida Vermis"
	SpeciesClypeusLacrimam               BiologicalSpecies = "Clypeus Lacrimam"
	SpeciesClypeusMargaritus             BiologicalSpecies = "Clypeus Margaritus"
	SpeciesClypeusSpeculumi              BiologicalSpecies = "Clypeus Speculumi"
	SpeciesConchaAureolas                BiologicalSpecies = "Concha Aureolas"
	SpeciesConchaBiconcavis              BiologicalSpecies = "Concha Biconcavis"
	SpeciesConchaLabiata                 BiologicalSpecies = "Concha Labiata"
	SpeciesConchaRenibus                 BiologicalSpecies = "Concha Renibus"
	SpeciesCrystallineShard              BiologicalSpecies = "Crystalline Shard"
	SpeciesElectricaePluma               BiologicalSpecies = "Electricae Pluma"
	SpeciesElectricaeRadialem            BiologicalSpecies = "Electricae Radialem"
	SpeciesFonticuluaCampestris          BiologicalSpecies = "Fonticulua Campestris"
	SpeciesFonticuluaDigitos             BiologicalSpecies = "Fonticulua Digitos"
	SpeciesFonticuluaFluctus             BiologicalSpecies = "Fonticulua Fluctus"
	SpeciesFonticuluaLapida              BiologicalSpecies = "Fonticulua Lapida"
	SpeciesFonticuluaSegmentatus         BiologicalSpecies = "Fonticulua Segmentatus"
	SpeciesFonticuluaUpupam              BiologicalSpecies = "Fonticulua Upupam"
	SpeciesFrutexaAcus                   BiologicalSpecies = "Frutexa Acus"
	SpeciesFrutexaCollum                 BiologicalSpecies = "Frutexa Collum"
	SpeciesFrutexaFera                   BiologicalSpecies = "Frutexa Fera"
	SpeciesFrutexaFlabellum              BiologicalSpecies = "Frutexa Flabellum"
	SpeciesFrutexaFlammasis              BiologicalSpecies = "Frutexa Flammasis"
	SpeciesFrutexaMetallicum             BiologicalSpecies = "Frutexa Metallicum"
	SpeciesFrutexaSponsae                BiologicalSpecies = "Frutexa Sponsae"
	SpeciesFumerolaAquatis               BiologicalSpecies = "Fumerola Aquatis"
	SpeciesFumerolaCarbosis              BiologicalSpecies = "Fumerola Carbosis"
	SpeciesFumerolaExtremus              BiologicalSpecies = "Fumerola Extremus"
	SpeciesFumerolaNitris                BiologicalSpecies = "Fumerola Nitris"
	SpeciesFungoidaBullarum              BiologicalSpecies = "Fungoida Bullarum"
	SpeciesFungoidaGelata                BiologicalSpecies = "Fungoida Gelata"
	SpeciesFungoidaSetisis               BiologicalSpecies = "Fungoida Setisis"
	SpeciesFungoidaStabitis              BiologicalSpecies = "Fungoida Stabitis"
	SpeciesOsseusCornibus                BiologicalSpecies = "Osseus Cornibus"
	SpeciesOsseusDiscus                  BiologicalSpecies = "Osseus Discus"
	SpeciesOsseusFractus                 BiologicalSpecies = "Osseus Fractus"
	SpeciesOsseusPellebantus             BiologicalSpecies = "Osseus Pellebantus"
	SpeciesOsseusPumice                  BiologicalSpecies = "Osseus Pumice"
	SpeciesOsseusSpiralis                BiologicalSpecies = "Osseus Spiralis"
	SpeciesReceptaConditivus             BiologicalSpecies = "Recepta Conditivus"
	SpeciesReceptaDeltahedronix          BiologicalSpecies = "Recepta Deltahedronix"
	SpeciesReceptaUmbrux                 BiologicalSpecies = "Recepta Umbrux"
	SpeciesSinuousTuberAlbidum           BiologicalSpecies = "Albidum Sinuous Tubers"
	SpeciesSinuousTuberBlatteum          BiologicalSpecies = "Blatteum Sinuous Tubers"
	SpeciesSinuousTuberCaeruleum         BiologicalSpecies = "Caeruleum Sinuous Tubers"
	SpeciesSinuousTuberLindigoticum      BiologicalSpecies = "Lindigoticum Sinuous Tubers"
	SpeciesSinuousTuberPrasinum          BiologicalSpecies = "Prasinum Sinuous Tubers"
	SpeciesSinuousTuberRoseus            BiologicalSpecies = "Roseus Sinuous Tubers"
	SpeciesSinuousTuberViolaceum         BiologicalSpecies = "Violaceum Sinuous Tubers"
	SpeciesSinuousTuberViride            BiologicalSpecies = "Viride Sinuous Tubers"
	SpeciesStratumAraneamus              BiologicalSpecies = "Stratum Araneamus"
	SpeciesStratumCucumisis              BiologicalSpecies = "Stratum Cucumisis"
	SpeciesStratumExcutitus              BiologicalSpecies = "Stratum Excutitus"
	SpeciesStratumFrigus                 BiologicalSpecies = "Stratum Frigus"
	SpeciesStratumLaminamus              BiologicalSpecies = "Stratum Laminamus"
	SpeciesStratumLimaxus                BiologicalSpecies = "Stratum Limaxus"
	SpeciesStratumPaleas                 BiologicalSpecies = "Stratum Paleas"
	SpeciesStratumTectonicas             BiologicalSpecies = "Stratum Tectonicas"
	SpeciesTubusCavas                    BiologicalSpecies = "Tubus Cavas"
	SpeciesTubusCompagibus               BiologicalSpecies = "Tubus Compagibus"
	SpeciesTubusConifer                  BiologicalSpecies = "Tubus Conifer"
	SpeciesTubusRosarium                 BiologicalSpecies = "Tubus Rosarium"
	SpeciesTubusSororibus                BiologicalSpecies = "Tubus Sororibus"
	SpeciesTussockAlbata                 BiologicalSpecies = "Tussock Albata"
	SpeciesTussockCapillum               BiologicalSpecies = "Tussock Capillum"
	SpeciesTussockCaputus                BiologicalSpecies = "Tussock Caputus"
	SpeciesTussockCatena                 BiologicalSpecies = "Tussock Catena"
	SpeciesTussockCultro                 BiologicalSpecies = "Tussock Cultro"
	SpeciesTussockDivisa                 BiologicalSpecies = "Tussock Divisa"
	SpeciesTussockIgnis                  BiologicalSpecies = "Tussock Ignis"
	SpeciesTussockPennata                BiologicalSpecies = "Tussock Pennata"
	SpeciesTussockPennatis               BiologicalSpecies = "Tussock Pennatis"
	SpeciesTussockPropagito              BiologicalSpecies = "Tussock Propagito"
	SpeciesTussockSerrati                BiologicalSpecies = "Tussock Serrati"
	SpeciesTussockStigmasis              BiologicalSpecies = "Tussock Stigmasis"
	SpeciesTussockTriticum               BiologicalSpecies = "Tussock Triticum"
	SpeciesTussockVentusa                BiologicalSpecies = "Tussock Ventusa"
	SpeciesTussockVirgam                 BiologicalSpecies = "Tussock Virgam"
	SpeciesThargoidSpires                BiologicalSpecies = "Thargoid Spires"
	SpeciesThargoidMegaBarnacles         BiologicalSpecies = "Thargoid Mega Barnacles"
	SpeciesThargoidCoralTree             BiologicalSpecies = "Coral Tree"
	SpeciesThargoidCoralRoot             BiologicalSpecies = "Coral Root"
)

var BiologicalScanValues = map[BiologicalSpecies]int64{
	SpeciesAleoidaArcus:                  7252500,
	SpeciesAleoidaCoronamus:              6284600,
	SpeciesAleoidaGravis:                 12934900,
	SpeciesAleoidaLaminiae:               3385200,
	SpeciesAleoidaSpica:                  3385200,
	SpeciesAmphoraPlant:                  3626400,
	SpeciesAnemoneBlatteumBioluminescent: 1499900,
	SpeciesAnemoneCroceum:                3399800,
	SpeciesAnemoneLuteolum:               1499900,
	SpeciesAnemonePrasinumBioluminescent: 1499900,
	SpeciesAnemonePuniceum:               1499900,
	SpeciesAnemoneRoseum:                 1499900,
	SpeciesAnemoneRoseumBioluminescent:   1499900,
	SpeciesAnemoneRubeumBioluminescent:   1499900,
	SpeciesBacteriumAcies:                1000000,
	SpeciesBacteriumAlcyoneum:            1658500,
	SpeciesBacteriumAurasus:              1000000,
	SpeciesBacteriumBullaris:             1152500,
	SpeciesBacteriumCerbrus:              1689800,
	SpeciesBacteriumInformem:             8418000,
	SpeciesBacteriumNebulus:              9116600,
	SpeciesBacteriumOmentum:              4638900,
	SpeciesBacteriumScopulum:             8633800,
	SpeciesBacteriumTela:                 1949000,
	SpeciesBacteriumVerrata:              3897000,
	SpeciesBacteriumVesicula:             1000000,
	SpeciesBacteriumVolu:                 7774700,
	SpeciesBarkMound:                     1471900,
	SpeciesBrainTreeAureum:               3565100,
	SpeciesBrainTreeGypseeum:             3565100,
	SpeciesBrainTreeLindigoticum:         3565100,
	SpeciesBrainTreeLividum:              1593700,
	SpeciesBrainTreeOstrinum:             3565100,
	SpeciesBrainTreePuniceum:             3565100,
	SpeciesBrainTreeRoseum:               1593700,
	SpeciesBrainTreeViride:               1593700,
	SpeciesCactoidaCortexum:              3667600,
	SpeciesCactoidaLapis:                 2483600,
	SpeciesCactoidaPeperatis:             2483600,
	SpeciesCactoidaPullulanta:            3667600,
	SpeciesCactoidaVermis:                16202800,
	SpeciesClypeusLacrimam:               8418000,
	SpeciesClypeusMargaritus:             11873200,
	SpeciesClypeusSpeculumi:              16202800,
	SpeciesConchaAureolas:                7774700,
	SpeciesConchaBiconcavis:              16777215,
	SpeciesConchaLabiata:                 2352400,
	SpeciesConchaRenibus:                 4572400,
	SpeciesCrystallineShard:              3626400,
	SpeciesElectricaePluma:               6284600,
	SpeciesElectricaeRadialem:            6284600,
	SpeciesFonticuluaCampestris:          1000000,
	SpeciesFonticuluaDigitos:             1804100,
	SpeciesFonticuluaFluctus:             16777215,
	SpeciesFonticuluaLapida:              3111000,
	SpeciesFonticuluaSegmentatus:         19010800,
	SpeciesFonticuluaUpupam:              5727600,
	SpeciesFrutexaAcus:                   7774700,
	SpeciesFrutexaCollum:                 1639800,
	SpeciesFrutexaFera:                   1632500,
	SpeciesFrutexaFlabellum:              1808900,
	SpeciesFrutexaFlammasis:              10326000,
	SpeciesFrutexaMetallicum:             1632500,
	SpeciesFrutexaSponsae:                5988000,
	SpeciesFumerolaAquatis:               6284600,
	SpeciesFumerolaCarbosis:              6284600,
	SpeciesFumerolaExtremus:              16202800,
	SpeciesFumerolaNitris:                7500900,
	SpeciesFungoidaBullarum:              3703200,
	SpeciesFungoidaGelata:                3330300,
	SpeciesFungoidaSetisis:               1670100,
	SpeciesFungoidaStabitis:              2680300,
	SpeciesOsseusCornibus:                1483000,
	SpeciesOsseusDiscus:                  12934900,
	SpeciesOsseusFractus:                 4027800,
	SpeciesOsseusPellebantus:             9739000,
	SpeciesOsseusPumice:                  3156300,
	SpeciesOsseusSpiralis:                2404700,
	SpeciesReceptaConditivus:             14313700,
	SpeciesReceptaDeltahedronix:          16202800,
	SpeciesReceptaUmbrux:                 12934900,
	SpeciesSinuousTuberAlbidum:           3425600,
	SpeciesSinuousTuberBlatteum:          1514500,
	SpeciesSinuousTuberCaeruleum:         1514500,
	SpeciesSinuousTuberLindigoticum:      1514500,
	SpeciesSinuousTuberPrasinum:          1514500,
	SpeciesSinuousTuberRoseus:            1514500,
	SpeciesSinuousTuberViolaceum:         1514500,
	SpeciesSinuousTuberViride:            1514500,
	SpeciesStratumAraneamus:              2448900,
	SpeciesStratumCucumisis:              16202800,
	SpeciesStratumExcutitus:              2448900,
	SpeciesStratumFrigus:                 2637500,
	SpeciesStratumLaminamus:              2788300,
	SpeciesStratumLimaxus:                1362000,
	SpeciesStratumPaleas:                 1362000,
	SpeciesStratumTectonicas:             19010800,
	SpeciesTubusCavas:                    11873200,
	SpeciesTubusCompagibus:               7774700,
	SpeciesTubusConifer:                  2415500,
	SpeciesTubusRosarium:                 2637500,
	SpeciesTubusSororibus:                5727600,
	SpeciesTussockAlbata:                 3252500,
	SpeciesTussockCapillum:               7025800,
	SpeciesTussockCaputus:                3472400,
	SpeciesTussockCatena:                 1766600,
	SpeciesTussockCultro:                 1766600,
	SpeciesTussockDivisa:                 1766600,
	SpeciesTussockIgnis:                  1849000,
	SpeciesTussockPennata:                5853800,
	SpeciesTussockPennatis:               1000000,
	SpeciesTussockPropagito:              1000000,
	SpeciesTussockSerrati:                4447100,
	SpeciesTussockStigmasis:              19010800,
	SpeciesTussockTriticum:               7774700,
	SpeciesTussockVentusa:                3277700,
	SpeciesTussockVirgam:                 14313700,
	SpeciesThargoidSpires:                2247100,
	SpeciesThargoidMegaBarnacles:         2313500,
	SpeciesThargoidCoralTree:             1896800,
	SpeciesThargoidCoralRoot:             1924600,
}

var BiologicalScanCCR = map[BiologicalGenus]int64{
	GenusAleoida:          150,
	GenusAmphoraPlant:     100,
	GenusAnemone:          100,
	GenusBacterium:        500,
	GenusBarkMound:        100,
	GenusBrainTree:        100,
	GenusCactoida:         300,
	GenusClypeus:          150,
	GenusConcha:           150,
	GenusCrystallineShard: 100,
	GenusElectricae:       1000,
	GenusFonticulua:       500,
	GenusFrutexa:          150,
	GenusFumerola:         100,
	GenusFungoida:         300,
	GenusOsseus:           800,
	GenusRecepta:          150,
	GenusSinuousTuber:     100,
	GenusStratum:          500,
	GenusTubus:            800,
	GenusTussock:          200,
	GenusThargoid:         100,
}

type ScanType string

const (
	Detailed ScanType = "Detailed"
	AutoScan ScanType = "AutoScan"
)
