/// <reference path="./@types/Journal/Journal.d.ts" />
/// <reference path="./@types/Journal/Startup/Cargo.d.ts" />
/// <reference path="./@types/Journal/Startup/ClearSavedGame.d.ts" />
/// <reference path="./@types/Journal/Startup/Commander.d.ts" />
/// <reference path="./@types/Journal/Startup/LoadGame.d.ts" />
/// <reference path="./@types/Journal/Startup/Loadout.d.ts" />
/// <reference path="./@types/Journal/Startup/Materials.d.ts" />
/// <reference path="./@types/Journal/Startup/Missions.d.ts" />
/// <reference path="./@types/Journal/Startup/Progress.d.ts" />
/// <reference path="./@types/Journal/Startup/Rank.d.ts" />
/// <reference path="./@types/Journal/Startup/Reputation.d.ts" />
/// <reference path="./@types/Journal/Startup/Statistics.d.ts" />

// https://elite-journal.readthedocs.io/
class JournalParser {
    unknownEvents: {}

    constructor() {
        this.unknownEvents = {};
    }

    public process(events: Array<{}> = []) {
        events.forEach(event => this.processEvent(event));
        console.log(JSON.stringify(this.unknownEvents));
    }

    private processEvent(rawEvent) {
        const eventType = rawEvent.event;

        const possibleEvents = {
            // Startup
            Cargo: this.processCargo,
            ClearSavedGame: this.processClearSavedGame,
            Commander: this.processCommander,
            Loadout: this.processLoadout,
            Materials: this.processMaterials,
            Missions: this.processMissions,
            NewCommander: this.processNewCommander,
            LoadGame: this.processLoadGame,
            Passengers: this.processPassengers,
            Powerplay: this.processPowerplay,
            Progress: this.processProgress,
            Rank: this.processRank,
            Reputation: this.processReputation,
            Statistics: this.processStatistics,
        }

        const ignoredEvents = [
            'Music',
            'NavRoute', // Valuable info written to NavRoute.json
            'ModuleInfo', // Valuable info written to ModuleInfo.json
        ];

        if (ignoredEvents.includes(eventType)) {
            // Skip
        } else if (Object.keys(possibleEvents).includes(eventType)) {
            possibleEvents[eventType](rawEvent);
        } else {
            if (!Object.keys(this.unknownEvents).includes(eventType)) {
                this.unknownEvents[eventType] = rawEvent;
            }
            console.log(`Unknown event: ${eventType}`);
        }
    }

    private processCargo(event: Journal.Cargo) {
        // console.log(event.event, event);
    }

    private processClearSavedGame(event: Journal.ClearSavedGame) {
        // console.log(event.event, event);
    }

    private processCommander(event: Journal.Commander) {
        // console.log(event.event, event);
    }

    private processLoadGame(event: Journal.LoadGame) {
        // console.log(event.event, event);
    }

    private processLoadout(event: Journal.Loadout) {
        // console.log(event.event, event);
    }

    private processMaterials(event: Journal.Materials) {
        // console.log(event.event, event);
    }

    private processMissions(event: Journal.Missions) {
        // console.log(event.event, event);
    }

    private processNewCommander(event) {
        console.log(event.event, event);
    }

    private processPassengers(event) {
        console.log(event.event, event);
    }

    private processPowerplay(event) {
        console.log(event.event, event);
    }

    private processProgress(event: Journal.Progress) {
        // console.log(event.event, event);
    }

    private processRank(event: Journal.Rank) {
        // console.log(event.event, event);
    }

    private processReputation(event: Journal.Reputation) {
        // console.log(event.event, event);
    }

    private processStatistics(event: Journal.Statistics) {
        // console.log(event.event, event);
    }
}

export default JournalParser;
