declare namespace Journal {
    export interface Progress extends DefaultEvent {
        Combat: number,
        Trade: number,
        Explore: number,
        Empire: number,
        Federation: number,
        CQC: number
    }
}
