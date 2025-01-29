export default function getBodiesWithBioSignals(system: System): BodyWithBioSignals[] {
    const bodiesWithBioSignals: BodyWithBioSignals[] = [];

    const bodiesWithSignals = system.Bodies.filter(b => Array.isArray(b.signals) && b.signals.length > 0);
    bodiesWithSignals.forEach(body => {
        const bioSignals = (body.signals || []).find(s => s.Type === 'Biological');

        if (bioSignals) {
            bodiesWithBioSignals.push({
                name: body.Name.replace(system.Name, ''),
                bioSubtype: bioSignals.SubType.split(',').filter(t => t !== ''),
                count: bioSignals.Count,
                bodyID: body.BodyID
            });
        }
    });

    bodiesWithBioSignals.sort((a, b) => a.bodyID - b.bodyID)
    bodiesWithBioSignals.sort((a, b) => b.count - a.count)

    return bodiesWithBioSignals;
}
