declare namespace Journal {
    export interface Reputation extends DefaultEvent {
        Empire?: number,
        Federation?: number,
        Alliance?: number
    }
}
