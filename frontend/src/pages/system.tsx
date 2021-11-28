import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {setCommanderLastPosition} from '../../redux/actions/commander';
import {setCurrentSystem} from '../../redux/actions/system';

import parseCelestialBodies from '../util/parseCelestialBodies';

import celestialBodyImages from '../json/celestialBodyImages.json';

import styles from '../styles/layout.module.scss';

export default function System({EDSMClient}) {
    const dispatch = useDispatch();

    const commanderLastPosition = useSelector(state => state.commander.lastPosition);
    const systemInformation = useSelector(state => state.system.currentSystem);

    useEffect(() => {
        if (!commanderLastPosition) {
            EDSMClient.getCommanderLastPosition().then(cmdrPos => {
                dispatch(setCommanderLastPosition(cmdrPos));

                EDSMClient.getSystemCelestialBodies(cmdrPos.system).then(systeminfo => {
                    dispatch(setCurrentSystem(systeminfo));
                });
            });
        } else if (!systemInformation) {
            EDSMClient.getSystemCelestialBodies(commanderLastPosition.system).then(systeminfo => {
                dispatch(setCurrentSystem(systeminfo));
            });
        }
    }, [dispatch]);

    const systemBodies = systemInformation ?
        systemInformation.bodyCount === systemInformation.bodies.length
            ? systemInformation.bodyCount
            : `${systemInformation.bodyCount} (${systemInformation.bodyCount - systemInformation.bodies.length} undiscovered)`
        : null;

    const parsedBodies = systemInformation ? parseCelestialBodies(systemInformation.bodies) : null;

    const renderedBodies = parsedBodies ? parsedBodies.map((body, idx) => {
        return <div key={idx}>
            {body.iconName
                ? <Image src={`/img/Bodies/${celestialBodyImages[body.iconName]}`} width={100} height={100} />
                : <Image src="/img/Bodies/Unknown.png" width={100} height={100} />}
            <span className={styles.value}>{body.body.name} ({body.body.subType})</span>
        </div>;
    }) : null;

    return (
        <>
            <div>
                <span className={styles.label}>Name:</span>
                <span className={styles.value}>{systemInformation ? systemInformation.name : null}</span>
            </div>
            <div>
                <span className={styles.label}>Bodies:</span>
                <span className={styles.value}>{systemBodies}</span>
            </div>
            {renderedBodies}
        </>
    )
}
