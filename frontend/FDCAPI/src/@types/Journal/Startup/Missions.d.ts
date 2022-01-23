declare namespace Journal {
    type Mission = {
        MissionID: number,
        Name: string,
        PassengerMission: boolean,
        Expires: number,
    }

    export interface Missions extends DefaultEvent {
        Active: Array<Mission>,
        Failed: Array<Mission>,
        Complete: Array<Mission>
    }
}
