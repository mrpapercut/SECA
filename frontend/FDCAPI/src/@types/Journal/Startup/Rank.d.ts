declare namespace Journal {
    export interface Rank extends DefaultEvent {
        Combat: number,
        Trade: number,
        Explore: number,
        Empire: number,
        Federation: number,
        CQC: number
    }
}
