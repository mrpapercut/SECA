import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import APIClient from '../../vendor/EDSM/APIClient';
import JournalClient from '../../vendor/Journal/client';

import {
    setCommanderLastPosition,
    setCommanderCredits
} from '../../redux/actions/commander';

import {
    setCurrentSystem,
    setScanValues
} from '../../redux/actions/system';

import styles from '../styles/layout.module.scss';
import calculateEstimatedValue from '../util/calculateEstimatedValue';
import { CMDRNAME } from '../../config';
import { setJournalRoute } from '../../redux/actions/journal';

const refreshInterval = 10;

export default function Home({EDSMClient, JournalClient} : {EDSMClient: APIClient, JournalClient: JournalClient}) {
    const dispatch = useDispatch();

    const commanderLastPosition = useSelector((state: ReduxStates.ReduxState) => state.commander.lastPosition);
    const commanderCredits = useSelector((state: ReduxStates.ReduxState) => state.commander.credits);
    const commanderName = useSelector((state: ReduxStates.ReduxState) => state.commander.name);

    const commanderCurrentSystem = useSelector((state: ReduxStates.ReduxState) => state.system.currentSystem);
    const systemScanValues = useSelector((state: ReduxStates.ReduxState) => state.system.scanValues);

    const journalRoute = useSelector((state: ReduxStates.ReduxState) => state.journal.route);

    const [countdown, setCountdown] = useState(refreshInterval);

    const fetchCommander = async () => {
        if (!commanderLastPosition) {
            const cmdrPos = await EDSMClient.getCommanderLastPosition()
            dispatch(setCommanderLastPosition(cmdrPos));
        }
    }

    useEffect(() => {
        fetchCommander();
    }, []);

    const fetchIntervalData = async () => {
        const cmdrLastPos = await EDSMClient.getCommanderLastPosition();

        if (commanderLastPosition && (!commanderCurrentSystem || commanderLastPosition.systemId64 !== cmdrLastPos.systemId64)) {
            dispatch(setCommanderLastPosition(cmdrLastPos));

            console.log('Getting commander credits');
            EDSMClient.getCommanderCredits().then(res => {
                dispatch(setCommanderCredits(res))
            });

            console.log('Updating route');
            JournalClient.getRoute().then(res => {
                dispatch(setJournalRoute(res));
            });
        }

        if (cmdrLastPos && cmdrLastPos.system) {
            console.log('Getting current system');
            EDSMClient.getSystemCelestialBodies(cmdrLastPos.system).then(res => {
                dispatch(setCurrentSystem(res));
            });

            console.log('Getting system scan values');
            EDSMClient.getSystemEstimatedScanValues(cmdrLastPos.system).then(res => {
                dispatch(setScanValues(res))
            });
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 0) {
                    fetchIntervalData();
                    return refreshInterval;
                }

                return prev - 1;
            });
          }, 1000);

        return () => clearInterval(interval);
    }, [commanderLastPosition, commanderCurrentSystem]);

    const currentSystem = commanderLastPosition ? `${commanderLastPosition.system} ${commanderLastPosition.firstDiscover ? '*' : ''}` : 'Unknown';

    const credits = commanderCredits ? `${commanderCredits.credits[0].balance.toLocaleString()} cr` : null;

    const amountDiscovered = commanderCurrentSystem && commanderCurrentSystem.bodies.length > 0 && commanderCurrentSystem.bodyCount > 0
        ? `${((commanderCurrentSystem.bodies.length / commanderCurrentSystem.bodyCount) * 100).toFixed(2)}%`
        : `0%`;

    const lastUpdated = commanderLastPosition ? commanderLastPosition.date : null;

    const scanValues = systemScanValues ? `${systemScanValues.estimatedValue.toLocaleString()} cr` : null;
    const mappedScanValues = systemScanValues ? `${systemScanValues.estimatedValueMapped.toLocaleString()} cr` : null;
    const valuableBodies = systemScanValues ? systemScanValues.valuableBodies : [];

    if (commanderCurrentSystem) {
        for (let i = 0; i < valuableBodies.length; i++) {
            const vb = valuableBodies[i];

            const body = commanderCurrentSystem.bodies.find(b => b.id === vb.bodyId);
            if (!body) continue;

            const estimatedValue = calculateEstimatedValue('Planet', body.subType, body.earthMasses, body.terraformingState === 'Candidate for terraforming', {
                haveMapped: true,
                isFirstDiscoverer: body.discovery?.commander === CMDRNAME,
                isFirstMapper: true,
                efficiencyBonus: false,
            });

            valuableBodies[i].valueMax = estimatedValue;
        }
    }

    console.log(journalRoute);

    return (
        <div>
            <div className={styles.grid}>
                <div><Image src="https://www.edsm.net/img/users/1/8/7/9/1/3/187913.png" className={styles.cmdrProfilePhoto} width={100} height={100} alt={''} /></div>
                <div>Refreshing in {countdown} seconds</div>

                <div>Commander:</div>
                <div>{commanderName}</div>

                <div>Credits:</div>
                <div>{credits}</div>

                <div>System:</div>
                <div>{currentSystem}</div>

                <div>Discovered:</div>
                <div>{amountDiscovered}</div>

                <div>Scan values (mapped):</div>
                <div>{scanValues} ({mappedScanValues})</div>

                {valuableBodies.length > 0 && <>
                    <div>Valuable bodies:</div>
                    <div>{valuableBodies.map((b, i) => <div key={`vb${i}`}>{b.bodyName}<br />{b.valueMax.toLocaleString()} cr {b.distance} ls</div>)}</div>
                </>}

                <div><em>Last updated:</em></div>
                <div><em>{lastUpdated}</em></div>
            </div>
        </div>
    )
}
