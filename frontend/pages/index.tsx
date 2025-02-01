import Image from "next/image";

import { useEffect, useState } from 'react';

import styles from '../styles/layout.module.scss';

import { useSocket } from '@/contexts/SocketContext';

import getUnmappedWorthyBodies from '@/util/getUnmappedWorthyBodies';
import getBodiesWithBioSignals from '@/util/getBodiesWithBioSignals';
import findMainStarInBodies from '@/util/findMainStarInBodies';

export default function Dashboard() {
    const {socket, isConnected} = useSocket();
    const [currentStatus, setCurrentStatus] = useState({} as CurrentStatus);
    const [currentRoute, setCurrentRoute] = useState([] as CurrentRoute[]);
    const [currentRouteDistance, setCurrentRouteDistance] = useState(0 as number);
    const [currentSystem, setCurrentSystem] = useState({} as System);

    useEffect(() => {
        if (!socket) return;

        socket.addListener('getStatus', response => setCurrentStatus(response.status as CurrentStatus))
        socket.addListener('getRoute', response => {
            setCurrentRoute(response.route as CurrentRoute[]);
            setCurrentRouteDistance(response.total_distance as number);
        });
        socket.addListener('getCurrentSystem', response => setCurrentSystem(response.system as System));

        if (isConnected) {
            socket.sendMessage('getStatus');
            socket.sendMessage('getRoute');
            socket.sendMessage('getCurrentSystem');
        }

        return () => {
            socket.removeListener('getStatus');
            socket.removeListener('getRoute');
            socket.removeListener('getCurrentSystem');
        }
    }, [socket, isConnected]);

    let worthMapping: string[] = [];
    let bodiesWithBioSignals: BodyWithBioSignals[] = [];
    if (currentSystem && Object.hasOwn(currentSystem, 'Bodies')) {
        worthMapping = getUnmappedWorthyBodies(currentSystem);
        bodiesWithBioSignals = getBodiesWithBioSignals(currentSystem);
    }

    let discoveredCurrent = false;
    let primaryStarTypeCurrent = '';
    let discoveredNextStop = false;
    let primaryStarTypeNextStop = '';
    let discoveredDestination = false;
    let primaryStarTypeDestination = '';
    if (currentRoute.length > 0) {
        const currentMainStar = findMainStarInBodies(currentRoute[0].System.Bodies);
        discoveredCurrent = currentMainStar.WasDiscovered;
        primaryStarTypeCurrent = currentRoute[0].System.PrimaryStarType;

        const destinationMainStar = findMainStarInBodies(currentRoute[currentRoute.length - 1].System.Bodies);
        discoveredDestination = destinationMainStar.WasDiscovered;
        primaryStarTypeDestination = currentRoute[currentRoute.length - 1].System.PrimaryStarType;

        if (currentRoute.length > 1) {
            const nextMainStar = findMainStarInBodies(currentRoute[1].System.Bodies);
            discoveredNextStop = nextMainStar.WasDiscovered;
            primaryStarTypeNextStop = currentRoute[1].System.PrimaryStarType;
        }
    }

    return <>
        <div className={isConnected ? styles.isConnected : styles.isNotConnected}>
            <div className={styles.cmdrProfileWrapper}>
                <Image priority={true} src="https://www.edsm.net/img/users/1/8/7/9/1/3/187913.png?v=1738138512" className={styles.cmdrProfilePhoto} width={100} height={100} alt={''} />
            </div>
            <div className={styles.grid}>
                <div>Commander:</div>
                <div>{currentStatus.commander_name}</div>

                <div>Credits:</div>
                <div>{(currentStatus.balance || 0).toLocaleString()} cr</div>

                <div>Ship:</div>
                <div>{currentStatus.ship_name} ({currentStatus.ship_type})</div>

                <div>State:</div>
                <div>{currentStatus.is_on_foot ? 'On foot' : currentStatus.is_in_srv ? 'In SRV' : currentStatus.is_landed ? 'Landed' : currentStatus.is_docked ? 'Docked' : 'Flying'}</div>

                <div>Current system:</div>
                <div className={!discoveredCurrent ? styles.newDiscovered : ''}>{currentStatus.current_system} {primaryStarTypeCurrent !== '' ? `(type ${primaryStarTypeCurrent})` : ''}</div>

                {currentStatus.body !== '' && currentStatus.body !== currentStatus.current_system && <>
                    <div>Current body:</div>
                    <div>{currentStatus.body}</div>
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
                    <div className={!discoveredNextStop ? styles.newDiscovered : ''}>{currentRoute[1].System.Name} {primaryStarTypeNextStop !== '' ? `(type ${primaryStarTypeNextStop})` : ''}</div>

                    <div>Destination:</div>
                    <div className={!discoveredDestination ? styles.newDiscovered : ''}>{currentRoute[currentRoute.length - 1].System.Name}  {primaryStarTypeDestination !== '' ? `(type ${primaryStarTypeDestination})` : ''}</div>

                    <div>Route length:</div>
                    <div>{parseInt(currentRouteDistance.toFixed(2), 10).toLocaleString()} ly</div>

                    <div>Total stops:</div>
                    <div>{currentRoute.length - 1}</div>
                </>}

                <hr className={styles.divider} />

                <div>Est. exploration earnings:</div>
                <div>{ (currentStatus.estimated_exploration_value || 0).toLocaleString() } cr</div>

                <div>Est. biological earnings:</div>
                <div>{ (currentStatus.estimated_biological_value || 0).toLocaleString() } cr</div>

                <hr className={styles.divider} />

                <div>Systems visited:</div>
                <div>{(currentStatus.systems_visited || 0).toLocaleString()}</div>

                <div>Total jumps:</div>
                <div>{(currentStatus.total_jumps || 0).toLocaleString()}</div>

                <div>Total distance:</div>
                <div>{parseFloat((currentStatus.total_distance || 0).toFixed(2)).toLocaleString()} ly</div>
            </div>
        </div>
    </>
}
