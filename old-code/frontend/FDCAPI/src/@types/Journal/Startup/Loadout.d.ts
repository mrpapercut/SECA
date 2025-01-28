declare namespace Journal {
    type ModuleEngineeringModifier = {
        Label: string,
        Value: number,
        OriginalValue: number,
        LessIsGood: number
    }

    type LoadoutModule = {
        Slot: string,
        Item: string,
        On: boolean,
        Priority: number,
        Health: number,
        AmmoInClip?: number,
        AmmoInHopper?: number,
        Engineering?: {
            Engineer: string,
            EngineerID: number,
            BlueprintID: number,
            BlueprintName: string,
            Level: number,
            Quality: number,
            Modifiers: Array<ModuleEngineeringModifier>,
        },
    }

    export interface Loadout extends DefaultEvent {
        Ship: string,
        ShipID: number,
        ShipName: string,
        ShipIdent: string,
        HullValue?: number,
        ModulesValue?: number,
        HullHealth: number,
        UnladenMass: number,
        CargoCapacity: number,
        MaxJumpRange: number,
        FuelCapacity: {
            Main: number,
            Reserve: number,
        },
        Rebuy: number,
        Modules: Array<LoadoutModule>,
    }
}
