declare namespace Journal {
    export interface Materials extends DefaultEvent {
        Raw?: Array<{
            Name: string,
            Count: number
        }>,
        Manufactured?: Array<{
            Name: string,
            Count: number
        }>,
        Encoded?: Array<{
            Name: string,
            Count: number
        }>
    }
}
