import Image from "next/image";

import { useEffect, useState } from 'react';

import styles from '../styles/layout.module.scss';

function findMainStarInBodies(bodies: Body[]): Body {
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

function getUnmappedWorthyBodies(system: System): string[] {
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

function getBodiesWithBioSignals(system: System): BodyWithBioSignals[] {
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

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [currentState, setCurrentState] = useState({} as CurrentState);
    const [currentRoute, setCurrentRoute] = useState([] as CurrentRoute[]);
    const [currentRouteDistance, setCurrentRouteDistance] = useState(0 as number);
    const [currentSystem, setCurrentSystem] = useState({} as System);

    useEffect(() => {
        let socket: WebSocket;
        let retryTimeout: NodeJS.Timeout;

        const connect = () => {
            console.log('Connecting to WebSocket server...');
            socket = new WebSocket(`ws://${window.location.hostname}:8080/`);

            socket.onopen = () => {
                if (retryTimeout) clearTimeout(retryTimeout);

                setIsConnected(true);

                socket.send('getStatus');
                socket.send('getRoute');
                socket.send('getCurrentSystem');
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (!Object.hasOwn(data, 'type')) {
                    console.log('Received message has invalid structure:', data);
                    return
                }

                switch(data.type) {
                    case 'getStatus':
                        socket.send('getCurrentSystem');
                        return setCurrentState(data.status);
                    case 'getRoute':
                        setCurrentRoute(data.route);
                        setCurrentRouteDistance(data.total_distance);
                        return;
                    case 'getCurrentSystem':
                        setCurrentSystem(data.system);
                        return;
                }
            };

            // socket.onerror = (error) => {
            //     console.log('WebSocket error:', error);
            // };

            socket.onclose = () => {
                setIsConnected(false);
                retryTimeout = setTimeout(() => connect(), 500);
            };
        };

        connect();

        return () => {
            if (socket) socket.close();
            if (retryTimeout) clearTimeout(retryTimeout);
        };
    }, []);

    let worthMapping: string[] = [];
    let bodiesWithBioSignals: BodyWithBioSignals[] = [];
    if (currentSystem && Object.hasOwn(currentSystem, 'Bodies')) {
        worthMapping = getUnmappedWorthyBodies(currentSystem);
        bodiesWithBioSignals = getBodiesWithBioSignals(currentSystem);
    }

    let discoveredCurrent = false;
    let discoveredNextStop = false;
    let discoveredDestination = false;
    if (currentRoute.length > 0) {
        const currentMainStar = findMainStarInBodies(currentRoute[0].System.Bodies);
        discoveredCurrent = currentMainStar.WasDiscovered;

        const destinationMainStar = findMainStarInBodies(currentRoute[currentRoute.length - 1].System.Bodies);
        discoveredDestination = destinationMainStar.WasDiscovered;

        if (currentRoute.length > 1) {
            const nextMainStar = findMainStarInBodies(currentRoute[1].System.Bodies);
            discoveredNextStop = nextMainStar.WasDiscovered;
        }
    }

    return <>
        <div className={isConnected ? styles.isConnected : styles.isNotConnected}>
            <div className={styles.cmdrProfileWrapper}>
                <Image priority={true} src="https://www.edsm.net/img/users/1/8/7/9/1/3/187913.png" className={styles.cmdrProfilePhoto} width={100} height={100} alt={''} />
            </div>
            <div className={styles.grid}>
                <div>Commander:</div>
                <div>{currentState.commander_name}</div>

                <div>Credits:</div>
                <div>{(currentState.balance || 0).toLocaleString()} cr</div>

                <div>Ship:</div>
                <div>{currentState.ship_name} ({currentState.ship_type})</div>

                <div>State:</div>
                <div>{currentState.is_on_foot ? 'On foot' : currentState.is_in_srv ? 'In SRV' : currentState.is_landed ? 'Landed' : currentState.is_docked ? 'Docked' : 'Flying'}</div>

                <div>Current system:</div>
                <div className={!discoveredCurrent ? styles.newDiscovered : ''}>{currentState.current_system}</div>

                {currentState.body !== '' && currentState.body !== currentState.current_system && <>
                    <div>Current body:</div>
                    <div>{currentState.body}</div>
                </>}

                {currentSystem && (worthMapping.length > 0 || bodiesWithBioSignals.length > 0) && <>
                    <hr className={styles.divider} />

                    {worthMapping.length > 0 && <>
                        <div>Worth mapping:</div>
                        <div>{worthMapping.join(', ')}</div>
                    </>}

                    {bodiesWithBioSignals.length > 0 && <>
                        <div>Bodies with bio signals:</div>
                        <div>
                            {bodiesWithBioSignals.map((b, i) =>
                                <div key={`bodyBio_${i}`}>{b.name} {b.bioSubtype.length > 0 ? `(${b.bioSubtype.join(', ')})` : `(${b.count})`}</div>
                            )}
                        </div>
                    </>}
                </>}

                {currentRoute.length > 1 && <>
                    <hr className={styles.divider} />

                    <div>Next stop:</div>
                    <div className={!discoveredNextStop ? styles.newDiscovered : ''}>{currentRoute[1].System.Name}</div>

                    <div>Destination:</div>
                    <div className={!discoveredDestination ? styles.newDiscovered : ''}>{currentRoute[currentRoute.length - 1].System.Name}</div>

                    <div>Route length:</div>
                    <div>{parseInt(currentRouteDistance.toFixed(2), 10).toLocaleString()} ly</div>

                    <div>Total stops:</div>
                    <div>{currentRoute.length - 1}</div>
                </>}

                <hr className={styles.divider} />

                <div>Est. exploration earnings:</div>
                <div>{ (currentState.estimated_exploration_value || 0).toLocaleString() } cr</div>

                <div>Est. biological earnings:</div>
                <div>{ (currentState.estimated_biological_value || 0).toLocaleString() } cr</div>

                <hr className={styles.divider} />

                <div>Systems visited:</div>
                <div>{(currentState.systems_visited || 0).toLocaleString()}</div>

                <div>Total jumps:</div>
                <div>{(currentState.total_jumps || 0).toLocaleString()}</div>

                <div>Total distance:</div>
                <div>{(currentState.total_distance || 0).toLocaleString()} ly</div>
            </div>
        </div>
    </>
}
