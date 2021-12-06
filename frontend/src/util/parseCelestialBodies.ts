import CelestialBody from '../classes/CelestialBody';

const parseCelestialBodies = (bodies: Array<CelestialBody>) => {
    const celestialBodies = bodies.map(body => new CelestialBody(body));

    return celestialBodies;
}

export default parseCelestialBodies;
