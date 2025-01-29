export default function getUnmappedWorthyBodies(system: System): string[] {
    const worthyBodies = ['Earthlike body', 'Water world', 'Ammonia world'];
    const worthyTerraformable = ['High metal content body', 'Rocky body'];
    const worthMapping: string[] = [];

    const unmappedBodies = system.Bodies.filter(b => b.BodyType === 'Planet' && !b.Mapped);
    unmappedBodies.forEach(body => {
        if (body.PlanetClass) {
            if (worthyBodies.includes(body.PlanetClass) || (body.TerraformState !== '' && worthyTerraformable.includes(body.PlanetClass))) {
                worthMapping.push(body.Name.replace(system.Name, ''));
            }
        }
    });

    return worthMapping;
}
