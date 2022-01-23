declare namespace Journal {
    export interface ClearSavedGame extends DefaultEvent {
        Name?: string,
        FID: string,
    }
}
