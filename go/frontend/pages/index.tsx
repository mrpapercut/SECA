import Image from "next/image";

import { useEffect, useState } from 'react';

import styles from '../styles/layout.module.scss';

interface CurrentState {
    commander_name: string
    balance: number
    ship_type: string
    ship_name: string
    fuel_level: number
    fuel_capacity: number
    current_system: string
    body: string
    is_landed: boolean
    is_docked: boolean
    is_on_foot: boolean
    estimated_exploration_value: number
    estimated_biological_value: number
    systems_visited: number
    total_distance: number
    total_jumps: number
}

interface CurrentRoute {
    position: number
    system: RouteSystem
}

interface RouteSystem {
    name: string
    system_address: number
    starpos_x: number
    starpos_y: number
    starpos_z: number
    bodies: RouteBody[]
}

interface RouteBody {
    name: string
    body_system_id: number
    body_type: string
    star_type: string
    was_discovered: boolean
    was_mapped: boolean
    discovered: boolean
    mapped: boolean
}

function findMainStarInBodies(bodies: RouteBody[]): RouteBody {
    if (bodies.length === 0) {
        return {
            name: 'unknown',
            body_system_id: 0,
            body_type: 'star',
            star_type: '',
            was_discovered: true,
            was_mapped: true,
            discovered: false,
            mapped: false
        };
    }

    bodies.sort((a, b) => {
        return b.body_system_id - a.body_system_id
    });

    return bodies[0];
}

export default function Home() {
    const [isConnected, setIsConnected] = useState(false);
    const [currentState, setCurrentState] = useState({} as CurrentState);
    const [currentRoute, setCurrentRoute] = useState([] as CurrentRoute[]);
    const [currentRouteDistance, setCurrentRouteDistance] = useState(0 as number);

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
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (!Object.hasOwn(data, 'type')) {
                    console.log('Received message has invalid structure:', data);
                    return
                }

                switch(data.type) {
                    case 'getStatus':
                        return setCurrentState(data.status);
                    case 'getRoute':
                        setCurrentRoute(data.route);
                        setCurrentRouteDistance(data.total_distance);
                        return;
                }
            };

            socket.onerror = (error) => {
                console.log('WebSocket error:', error);
            };

            socket.onclose = () => {
                setIsConnected(false);
                retryTimeout = setTimeout(() => connect(), 500); // Retry after 2 seconds
            };
        };

        connect();

        return () => {
            if (socket) socket.close();
            if (retryTimeout) clearTimeout(retryTimeout);
        };
    }, []);

    let discoveredCurrent = false;
    let discoveredNextStop = false;
    let discoveredDestination = false;
    if (currentRoute.length > 0) {
        const currentMainStar = findMainStarInBodies(currentRoute[0].system.bodies);
        discoveredCurrent = currentMainStar.was_discovered;

        const destinationMainStar = findMainStarInBodies(currentRoute[currentRoute.length - 1].system.bodies);
        discoveredDestination = destinationMainStar.was_discovered;

        if (currentRoute.length > 1) {
            const nextMainStar = findMainStarInBodies(currentRoute[1].system.bodies);
            discoveredNextStop = nextMainStar.was_discovered;
        }
    }

    console.log(currentState);

    return <>
        <div className={isConnected ? styles.isConnected : styles.isNotConnected}>
            <div className={styles.grid}>
                <div><Image priority={true} src="https://www.edsm.net/img/users/1/8/7/9/1/3/187913.png" className={styles.cmdrProfilePhoto} width={100} height={100} alt={''} /></div>
                <div></div>

                <div>Commander:</div>
                <div>{currentState.commander_name}</div>

                <div>Credits:</div>
                <div>{(currentState.balance || 0).toLocaleString()} cr</div>

                <div>Ship:</div>
                <div>{currentState.ship_name} ({currentState.ship_type})</div>

                <div>State:</div>
                <div>{currentState.is_landed ? 'Landed' : currentState.is_docked ? 'Docked' : 'Flying'}</div>

                <div>Current system:</div>
                <div className={!discoveredCurrent ? styles.newDiscovered : ''}>{currentState.current_system}</div>

                {currentState.body !== '' && <>
                    <div>Current body:</div>
                    <div>{currentState.body}</div>
                </>}

                {currentRoute.length > 0 && <>
                    <hr className={styles.divider} />

                    <div>Next stop:</div>
                    <div className={!discoveredNextStop ? styles.newDiscovered : ''}>{currentRoute[0].system.name}</div>

                    {currentRoute.length > 1 && <>
                        <div>Destination:</div>
                        <div className={!discoveredDestination ? styles.newDiscovered : ''}>{currentRoute[currentRoute.length - 1].system.name}</div>
                    </>}

                    <div>Route length:</div>
                    <div>{parseInt(currentRouteDistance.toFixed(2), 10).toLocaleString()} ly</div>

                    <div>Total stops:</div>
                    <div>{currentRoute.length - 1}</div>
                </>}

                <hr className={styles.divider} />

                <div>Est. exploration earnings:</div>
                <div>{ currentState.estimated_exploration_value.toLocaleString() } cr</div>

                <div>Est. biological earnings:</div>
                <div>{ currentState.estimated_biological_value.toLocaleString() } cr</div>

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
