export default function findMainStarInBodies(bodies: Body[]): Body {
    if (bodies.length === 0) {
        return {
            Name: 'unknown',
            BodyID: 0,
            BodyType: 'Star',
            StarType: '',
            WasDiscovered: true,
            WasMapped: true,
            Discovered: false,
            Mapped: false
        } as Body;
    }

    bodies.sort((a, b) => {
        return a.BodyID - b.BodyID
    });

    return bodies[0];
}
