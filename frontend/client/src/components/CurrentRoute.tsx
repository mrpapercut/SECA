import { useEffect, useState } from 'react';

import APIClient from '../../vendor/EDSM/APIClient';

import calculateDistance from '../util/calculateDistance';

import { CMDRNAME } from '../../config';

import styles from '../styles/layout.module.scss';

const CurrentRoute = ({EDSMClient, route}: {EDSMClient: APIClient, route: NavRoute.Route}) => {
    const nextStop = route.Route[1];
    const destination = route.Route[route.Route.length - 1];
    const totalJumps = route.Route.length - 1;
    const totalDistance = getTotalDistance(route);

    const [nextStopSystem, setNextStopSystem] = useState({} as APIResponses.SystemTrafficResponse);
    const [destinationSystem, setDestinationSystem] = useState({} as APIResponses.SystemTrafficResponse);

    useEffect(() => {
        const fetchInfo = async () => {
            const targets = [route.Route[1].StarSystem];
            if (route.Route.length > 2) {
                targets.push(route.Route[route.Route.length - 1].StarSystem);
            }

            EDSMClient.getSystemTraffic(route.Route[1].StarSystem).then(res => {
                setNextStopSystem(res);
            });

            if (route.Route.length > 2)
            EDSMClient.getSystemTraffic(route.Route[route.Route.length - 1].StarSystem).then(res => {
                setDestinationSystem(res);
            });
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

const getTotalDistance = (route: NavRoute.Route) => {
    const currentPosition = route.Route[0];

    let total = 0;
    let prevPos = {x: currentPosition.StarPos[0], y: currentPosition.StarPos[1], z: currentPosition.StarPos[2]};

    route.Route.slice(1).forEach(s => {
        const newPos = {x: s.StarPos[0], y: s.StarPos[1], z: s.StarPos[2]};
        const distance = calculateDistance(prevPos, newPos);
        total += distance;
        prevPos = newPos;
    });

    return parseFloat(total.toFixed(2));
}

export default CurrentRoute;
