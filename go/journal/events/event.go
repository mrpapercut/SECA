package events

import (
	"encoding/json"
	"time"
)

type GenericEvent struct {
	Timestamp time.Time `json:"timestamp"`
	Event     string    `json:"event"`
}

type EventType string

const (
	Commander                EventType = "Commander"
	Location                 EventType = "Location"
	LoadGame                 EventType = "LoadGame"
	Scan                     EventType = "Scan"
	FSSBodySignals           EventType = "FSSBodySignals"
	SAAScanComplete          EventType = "SAAScanComplete"
	MultiSellExplorationData EventType = "MultiSellExplorationData"
	SellOrganicData          EventType = "SellOrganicData"
	Docked                   EventType = "Docked"
	Undocked                 EventType = "Undocked"
	Embark                   EventType = "Embark"
	Disembark                EventType = "Disembark"  // { "timestamp":"2025-01-11T15:43:01Z", "event":"Disembark", "SRV":false, "Taxi":false, "Multicrew":false, "ID":5, "StarSystem":"S171 7", "SystemAddress":44400783, "Body":"S171 7 A", "BodyID":1, "OnStation":false, "OnPlanet":false }
	Statistics               EventType = "Statistics" // { "timestamp":"2025-01-11T10:06:59Z", "event":"Statistics", "Bank_Account":{ "Current_Wealth":365322827, "Spent_On_Ships":124921916, "Spent_On_Outfitting":145579822, "Spent_On_Repairs":523312, "Spent_On_Fuel":14858, "Spent_On_Ammo_Consumables":5194, "Insurance_Claims":1, "Spent_On_Insurance":11734411, "Owned_Ship_Count":5, "Spent_On_Suits":1050000, "Spent_On_Weapons":1375000, "Spent_On_Suit_Consumables":153000, "Suits_Owned":4, "Weapons_Owned":2, "Spent_On_Premium_Stock":2000000, "Premium_Stock_Bought":2 }, "Combat":{ "Bounties_Claimed":0, "Bounty_Hunting_Profit":0, "Combat_Bonds":0, "Combat_Bond_Profits":0, "Assassinations":0, "Assassination_Profits":0, "Highest_Single_Reward":0, "Skimmers_Killed":2, "OnFoot_Combat_Bonds":0, "OnFoot_Combat_Bonds_Profits":0, "OnFoot_Vehicles_Destroyed":0, "OnFoot_Ships_Destroyed":0, "Dropships_Taken":0, "Dropships_Booked":0, "Dropships_Cancelled":0, "ConflictZone_High":0, "ConflictZone_Medium":0, "ConflictZone_Low":0, "ConflictZone_Total":0, "ConflictZone_High_Wins":0, "ConflictZone_Medium_Wins":0, "ConflictZone_Low_Wins":0, "ConflictZone_Total_Wins":0, "Settlement_Defended":0, "Settlement_Conquered":0, "OnFoot_Skimmers_Killed":0, "OnFoot_Scavs_Killed":0 }, "Crime":{ "Notoriety":0, "Fines":8, "Total_Fines":395084, "Bounties_Received":5, "Total_Bounties":3000, "Highest_Bounty":600, "Malware_Uploaded":0, "Settlements_State_Shutdown":0, "Production_Sabotage":0, "Production_Theft":0, "Total_Murders":0, "Citizens_Murdered":0, "Omnipol_Murdered":0, "Guards_Murdered":0, "Data_Stolen":0, "Goods_Stolen":1, "Sample_Stolen":0, "Total_Stolen":1, "Turrets_Destroyed":0, "Turrets_Overloaded":0, "Turrets_Total":0, "Value_Stolen_StateChange":0, "Profiles_Cloned":0 }, "Smuggling":{ "Black_Markets_Traded_With":0, "Black_Markets_Profits":0, "Resources_Smuggled":0, "Average_Profit":0, "Highest_Single_Transaction":0 }, "Trading":{ "Markets_Traded_With":11, "Market_Profits":18192498, "Resources_Traded":1075, "Average_Profit":826931.72727273, "Highest_Single_Transaction":5764010, "Data_Sold":0, "Goods_Sold":0, "Assets_Sold":0 }, "Mining":{ "Mining_Profits":5781896, "Quantity_Mined":24, "Materials_Collected":1978 }, "Exploration":{ "Systems_Visited":1457, "Exploration_Profits":401973758, "Planets_Scanned_To_Level_2":11130, "Planets_Scanned_To_Level_3":11130, "Efficient_Scans":529, "Highest_Payout":12182177, "Total_Hyperspace_Distance":82901, "Total_Hyperspace_Jumps":1628, "Greatest_Distance_From_Start":9447.8074275716, "Time_Played":959220, "OnFoot_Distance_Travelled":15057, "Shuttle_Journeys":0, "Shuttle_Distance_Travelled":0, "Spent_On_Shuttles":0, "First_Footfalls":9, "Planet_Footfalls":17, "Settlements_Visited":7 }, "Passengers":{ "Passengers_Missions_Accepted":12, "Passengers_Missions_Bulk":19, "Passengers_Missions_VIP":37, "Passengers_Missions_Delivered":56, "Passengers_Missions_Ejected":0 }, "Search_And_Rescue":{ "SearchRescue_Traded":8, "SearchRescue_Profit":164300, "SearchRescue_Count":4, "Salvage_Legal_POI":0, "Salvage_Legal_Settlements":0, "Salvage_Illegal_POI":0, "Salvage_Illegal_Settlements":0, "Maglocks_Opened":0, "Panels_Opened":1, "Settlements_State_FireOut":0, "Settlements_State_Reboot":0 }, "Crafting":{ "Count_Of_Used_Engineers":1, "Recipes_Generated":46, "Recipes_Generated_Rank_1":6, "Recipes_Generated_Rank_2":11, "Recipes_Generated_Rank_3":10, "Recipes_Generated_Rank_4":9, "Recipes_Generated_Rank_5":10, "Suit_Mods_Applied":0, "Weapon_Mods_Applied":0, "Suits_Upgraded":0, "Weapons_Upgraded":0, "Suits_Upgraded_Full":0, "Weapons_Upgraded_Full":0, "Suit_Mods_Applied_Full":0, "Weapon_Mods_Applied_Full":0 }, "Crew":{ "NpcCrew_TotalWages":0, "NpcCrew_Hired":0, "NpcCrew_Fired":0, "NpcCrew_Died":0 }, "Multicrew":{ "Multicrew_Time_Total":0, "Multicrew_Gunner_Time_Total":0, "Multicrew_Fighter_Time_Total":0, "Multicrew_Credits_Total":0, "Multicrew_Fines_Total":0 }, "Material_Trader_Stats":{ "Trades_Completed":6, "Materials_Traded":118, "Encoded_Materials_Traded":24, "Raw_Materials_Traded":54, "Grade_1_Materials_Traded":79, "Grade_2_Materials_Traded":7, "Grade_3_Materials_Traded":22, "Grade_4_Materials_Traded":10, "Assets_Traded_In":0, "Assets_Traded_Out":0 }, "Exobiology":{ "Organic_Genus_Encountered":7, "Organic_Species_Encountered":9, "Organic_Variant_Encountered":11, "Organic_Data_Profits":0, "Organic_Data":0, "First_Logged_Profits":0, "First_Logged":0, "Organic_Systems":5, "Organic_Planets":5, "Organic_Genus":0, "Organic_Species":0 } }
	Died                     EventType = "Died"
)

type EventTimestamp *time.Time

type BodyName string
type BodySystemID int64
type StarSystem string
type SystemAddress int64
type MarketID int64

type FSSBodySignalType string

const (
	SignalBiological FSSBodySignalType = "Biological"
	SignalGeological FSSBodySignalType = "Geological"
	SignalHuman      FSSBodySignalType = "Human"
	SignalThargoid   FSSBodySignalType = "Thargoid"
	SignalGuardian   FSSBodySignalType = "Guardian"
	SignalOther      FSSBodySignalType = "Other"
)

type FSSBodySignalGenus struct {
	Genus string `json:"Genus_Localised"`
}

type FSSBodySignal struct {
	Type  string `json:"Type_Localised"`
	Count int
}

type NamePercentMap struct {
	Name    string
	Percent float64
}

func ParseEvent[T any](rawEvent string) (T, error) {
	var t T
	err := json.Unmarshal([]byte(rawEvent), &t)
	if err != nil {
		return t, err
	}

	return t, nil
}

type EventHandler struct{}

func (eh *EventHandler) HandleEvent(eventType string, rawEvent string) error {
	switch eventType {
	case "Commander":
		return eh.handleEventCommander(rawEvent)
	case "LoadGame":
		return eh.handleEventLoadGame(rawEvent)
	case "Location":
		return eh.handleEventLocation(rawEvent)
	case "Statistics":
		return eh.handleEventStatistics(rawEvent)
	case "FSDJump":
		return eh.handleEventFSDJump(rawEvent)
	case "FSDTarget":
		return eh.handleEventFSDTarget(rawEvent)
	case "Scan":
		return eh.handleEventScan(rawEvent)
	case "FSSBodySignals":
		return eh.handleEventFSSBodySignals(rawEvent)
	case "SAASignalsFound":
		return eh.handleEventFSSBodySignals(rawEvent)
	case "SAAScanComplete":
		return eh.handleEventSAAScanComplete(rawEvent)
	case "ScanOrganic":
		return eh.handleEventScanOrganic(rawEvent)
	case "MultiSellExplorationData":
		return eh.handleEventMultiSellExplorationData(rawEvent)
	case "SellOrganicData":
		return eh.handleEventSellOrganicData(rawEvent)
	case "Died":
		return eh.handleEventDied(rawEvent)
	case "NavRoute":
		return eh.handleEventNavRoute(rawEvent)
	}

	return nil
}
