import CelestialBody from '../classes/CelestialBody';

const parseCelestialBodies = (bodies: Array<CelestialBody>) => {
    const celestialBodies = bodies.map(body => new CelestialBody(body));
    const mappedBodies = [];

    // Group children
    for (let i = 0; i < celestialBodies.length; i++) {
        const body = celestialBodies[i];
        const pkeys = Object.keys(body.parents);

        if (pkeys.includes('Planet')) {
            const parent = celestialBodies.find(b => b.bodyId === body.parents['Planet']);
            parent.addChild(body);
        } else if (pkeys.includes('Star')) {
            const parent = celestialBodies.find(b => b.bodyId === body.parents['Star']);
            parent.addChild(body);
        } else {
            mappedBodies.push(body);
        }
    }

    return mappedBodies;
}

export default parseCelestialBodies;
