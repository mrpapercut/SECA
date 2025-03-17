import { ReactNode, useEffect, useState } from 'react';

import { useSocket } from '@/contexts/SocketContext';
import findMainStarInBodies from '@/util/findMainStarInBodies';
import findNextScoopable from '@/util/findNextScoopable';

import styles from '../styles/layout.module.scss';

export default function CurrentRoute({}): ReactNode {
    const { socket, isConnected } = useSocket();
    const [currentRoute, setCurrentRoute] = useState([] as CurrentRoute[]);
    const [currentRouteDistance, setCurrentRouteDistance] = useState(0 as number);

    useEffect(() => {
        if (!socket) return;

        const routeListenerId = socket.addListener('getRoute', response => {
            setCurrentRoute(response.route as CurrentRoute[]);
            setCurrentRouteDistance(response.total_distance as number);
        });

        socket.sendMessage('getRoute');

        return () => {
            socket.removeListener('getRoute', routeListenerId);
        }

    }, [socket, isConnected]);

    if (currentRoute.length === 0) {
        return <></>
    }

    const destinationMainStar = findMainStarInBodies(currentRoute[currentRoute.length - 1].System.Bodies);
    const discoveredDestination = destinationMainStar.WasDiscovered;
    const primaryStarTypeDestination = currentRoute[currentRoute.length - 1].System.PrimaryStarType;

    let discoveredNextStop = false;
    let primaryStarTypeNextStop = '';
    if (currentRoute.length > 1) {
        const nextMainStar = findMainStarInBodies(currentRoute[1].System.Bodies);
        discoveredNextStop = nextMainStar.WasDiscovered;
        primaryStarTypeNextStop = currentRoute[1].System.PrimaryStarType;
    }

    if (currentRoute.length === 1) {
        return <></>
    }

    const nextScoopable = findNextScoopable(currentRoute);

    return <>
        <hr className={styles.divider} />

        {currentRoute.length > 1 && <>
            <div>Next stop:</div>
            <div className={!discoveredNextStop ? styles.newDiscovered : ''}>{currentRoute[1].System.Name} {primaryStarTypeNextStop !== '' ? `(type ${primaryStarTypeNextStop})` : ''}</div>
        </>}

        <div>Destination:</div>
        <div className={!discoveredDestination ? styles.newDiscovered : ''}>{currentRoute[currentRoute.length - 1].System.Name}  {primaryStarTypeDestination !== '' ? `(type ${primaryStarTypeDestination})` : ''}</div>

        <div>Route length:</div>
        <div>{parseInt(currentRouteDistance.toFixed(2), 10).toLocaleString()} ly</div>

        <div>Total stops:</div>
        <div>{currentRoute.length - 1}</div>

        {nextScoopable !== '' && <>
            <div>Next scoopable star:</div>
            <div>{nextScoopable}</div>
        </>}
    </>
}
