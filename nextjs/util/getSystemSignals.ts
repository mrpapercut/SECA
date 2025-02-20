export default function getSystemSignals(system: System): SystemSignalCount {
    const signalCount: SystemSignalCount = {}

    for (let i = 0; i < system.FSSSignals.length; i++) {
        const signal = system.FSSSignals[i];

        if (!Object.hasOwn(signalCount, signal.SignalType)) {
            signalCount[signal.SignalType] = 0;
        }

        signalCount[signal.SignalType]++;
    }

    return signalCount;
}
