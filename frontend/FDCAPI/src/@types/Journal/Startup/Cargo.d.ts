declare namespace Journal {
    enum VesselType {
        Ship = "Ship",
        SRV = "SRV",
    }

    interface InventoryItem {
        Name: string,
        Count: number,
        Stolen: number,
        MissionID?: number,
    }

    export interface Cargo extends DefaultEvent {
        Vessel: VesselType,
        Inventory: Array<InventoryItem>,
    }
}
