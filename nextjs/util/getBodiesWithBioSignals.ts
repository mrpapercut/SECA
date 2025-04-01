export default function getBodiesWithBioSignals(system: System): BodyWithBioSignals[] {
    const bodiesWithBioSignals: BodyWithBioSignals[] = [];

    const bodiesWithSignals = system.Bodies.filter(b => Array.isArray(b.signals) && b.signals.length > 0);
    bodiesWithSignals.forEach(body => {
        const bioSignals = (body.signals || []).find(s => s.Type === 'Biological');
        const sampledSignals = (body.biological_scans || []).map(s => s.Genus);

        if (bioSignals) {
            bodiesWithBioSignals.push({
                name: body.Name.replace(system.Name, '').trim(),
                bodyID: body.BodyID,
                planetClass: body.PlanetClass,
                distance: body.DistanceFromArrivalLS,
                bioSubtype: bioSignals.SubType.split(',').filter(t => t !== '').map(t => ({ type: t, sampled: sampledSignals.includes(t) })),
                count: bioSignals.Count,
            });
        }
    });

    bodiesWithBioSignals.sort((a, b) => a.bodyID - b.bodyID)
    bodiesWithBioSignals.sort((a, b) => b.count - a.count)

    return bodiesWithBioSignals;
}
