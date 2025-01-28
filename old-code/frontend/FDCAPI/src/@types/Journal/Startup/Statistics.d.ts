declare namespace Journal {
    interface Bank_Account {
        Current_Wealth: number,
        Spent_On_Ships: number,
        Spent_On_Outfitting: number,
        Spent_On_Repairs: number,
        Spent_On_Fuel: number,
        Spent_On_Ammo_Consumables: number,
        Insurance_Claims: number,
        Spent_On_Insurance: number,
        Owned_Ship_Count: number
    }

    interface Combat {
        Bounties_Claimed: number,
        Bounty_Hunting_Profit: number,
        Combat_Bonds: number,
        Combat_Bond_Profits: number,
        Assassinations: number,
        Assassination_Profits: number,
        Highest_Single_Reward: number,
        Skimmers_Killed: number
    }

    interface Crime {
        Notoriety: number,
        Fines: number,
        Total_Fines: number,
        Bounties_Received: number,
        Total_Bounties: number,
        Highest_Bounty: number
    }

    interface Smuggling {
        Black_Markets_Traded_With: number,
        Black_Markets_Profits: number,
        Resources_Smuggled: number,
        Average_Profit: number,
        Highest_Single_Transaction: number
    }

    interface Trading {
        Markets_Traded_With: number,
        Market_Profits: number,
        Resources_Traded: number,
        Average_Profit: number,
        Highest_Single_Transaction: number
    }

    interface Mining {
        Mining_Profits: number,
        Quantity_Mined: number,
        Materials_Collected: number
    }

    interface Exploration {
        Systems_Visited: number,
        Exploration_Profits: number,
        Planets_Scanned_To_Level_2: number,
        Planets_Scanned_To_Level_3: number,
        Efficient_Scans: number,
        Highest_Payout: number,
        Total_Hyperspace_Distance: number,
        Total_Hyperspace_Jumps: number,
        Greatest_Distance_From_Start: number,
        Time_Played: number
    }

    interface Passengers {
        Passengers_Missions_Bulk: number,
        Passengers_Missions_VIP: number,
        Passengers_Missions_Delivered: number,
        Passengers_Missions_Ejected: number
    }

    interface Search_And_Rescue {
        SearchRescue_Traded: number,
        SearchRescue_Profit: number,
        SearchRescue_Count: number
    }

    interface Crafting {
        Count_Of_Used_Engineers: number,
        Recipes_Generated: number,
        Recipes_Generated_Rank_1: number,
        Recipes_Generated_Rank_2: number,
        Recipes_Generated_Rank_3: number,
        Recipes_Generated_Rank_4: number,
        Recipes_Generated_Rank_5: number
    }

    interface Crew {

    }

    interface Multicrew {
        Multicrew_Time_Total: number,
        Multicrew_Gunner_Time_Total: number,
        Multicrew_Fighter_Time_Total: number,
        Multicrew_Credits_Total: number,
        Multicrew_Fines_Total: number
    }

    interface Material_Trader_Stats {
        Trades_Completed: number,
        Materials_Traded: number
    }

    export interface Statistics {
        timestamp: string,
        event: string,
        Bank_Account: Bank_Account,
        Combat: Combat,
        Crime: Crime,
        Smuggling: Smuggling,
        Trading: Trading,
        Mining: Mining,
        Exploration: Exploration,
        Passengers: Passengers,
        Search_And_Rescue: Search_And_Rescue,
        Crafting: Crafting,
        Crew: Crew,
        Multicrew: Multicrew,
        Material_Trader_Stats: Material_Trader_Stats
    }
}
