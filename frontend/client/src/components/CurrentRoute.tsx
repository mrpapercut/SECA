import { useEffect, useState } from 'react';

import APIClient from '../../vendor/EDSM/APIClient';

import calculateDistance from '../util/calculateDistance';

import { CMDRNAME } from '../../config';

import styles from '../styles/layout.module.scss';

const CurrentRoute = ({EDSMClient, route, currentSystem}: {EDSMClient: APIClient, route: NavRoute.Route, currentSystem: string}) => {
    const stops = [];

    let foundCurrent = false;
    for (let i = 0; i < route.Route.length; i++) {
        if (route.Route[i].StarSystem === currentSystem) {
            foundCurrent = true;
            continue;
        }

        if (foundCurrent) {
            stops.push(route.Route[i]);
        }
    }

    const nextStop = stops[0];
    const destination = stops[stops.length - 1];
    const totalJumps = stops.length;
    const totalDistance = getTotalDistance(stops);

    const [nextStopSystem, setNextStopSystem] = useState({} as APIResponses.SystemTrafficResponse);
    const [destinationSystem, setDestinationSystem] = useState({} as APIResponses.SystemTrafficResponse);

    useEffect(() => {
        const fetchInfo = async () => {
            EDSMClient.getSystemTraffic(stops[0].StarSystem).then(res => {
                setNextStopSystem(res);
            });

            if (stops.length > 2) {
                EDSMClient.getSystemTraffic(stops[stops.length - 1].StarSystem).then(res => {
                    setDestinationSystem(res);
                });
            }
        }

        fetchInfo();
    }, []);

    const nextStopDiscovered = Object.keys(nextStopSystem).length === 0 || nextStopSystem.discovery.commander === CMDRNAME;
    const destinationDiscovered = Object.keys(destinationSystem).length === 0 || destinationSystem.discovery.commander === CMDRNAME;

    return <>
        <div>Route:</div>
        <div>{totalJumps} jumps, {totalDistance}ly</div>

        <div>Next stop:</div>
        <div className={nextStopDiscovered ? styles.newDiscovered : null}>{nextStop.StarSystem} (type {nextStop.StarClass})</div>

        <div>Destination:</div>
        <div className={destinationDiscovered ? styles.newDiscovered : null}>{destination.StarSystem} (type {destination.StarClass})</div>
    </>
};

const getTotalDistance = (route: NavRoute.RouteItem[]) => {
    const currentPosition = route[0];

    let total = 0;
    let prevPos = {x: currentPosition.StarPos[0], y: currentPosition.StarPos[1], z: currentPosition.StarPos[2]};

    route.slice(1).forEach(s => {
        const newPos = {x: s.StarPos[0], y: s.StarPos[1], z: s.StarPos[2]};
        const distance = calculateDistance(prevPos, newPos);
        total += distance;
        prevPos = newPos;
    });

    return parseFloat(total.toFixed(2));
}

export default CurrentRoute;
