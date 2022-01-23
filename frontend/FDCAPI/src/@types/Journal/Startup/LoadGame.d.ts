declare namespace Journal {
    export interface LoadGame extends DefaultEvent {
        FID: string,
        Horizons: boolean,
        Odyssey?: boolean,
        Ship: string,
        Ship_Localised: string,
        ShipID: number,
        ShipName: string,
        ShipIdent: string,
        FuelLevel: number,
        FuelCapacity: number,
        GameMode: string,
        Credits: number,
        Loan: number,
        StartLanded?: true,
        StartDead?: true,
        Group?: string,
    }
}
