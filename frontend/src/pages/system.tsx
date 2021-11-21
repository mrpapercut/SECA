import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {setCommanderLastPosition} from '../../redux/actions/commander';
import {setCurrentSystem} from '../../redux/actions/system';

import styles from '../styles/layout.module.scss';

export default function System({EDSMClient}) {
    const dispatch = useDispatch();

    const commanderLastPosition = useSelector(state => state.commander.lastPosition);
    const systemInformation = useSelector(state => state.system.currentSystem);

    useEffect(() => {
        if (!commanderLastPosition) {
            EDSMClient.getCommanderLastPosition().then(res => {
                dispatch(setCommanderLastPosition(res));
            });
        } else if (!systemInformation) {
            EDSMClient.getSystemCelestialBodies(commanderLastPosition.system).then(res => {
                dispatch(setCurrentSystem(res));
            });
        }
    }, [dispatch]);

    const systemBodies = systemInformation ?
        systemInformation.bodyCount === systemInformation.bodies.length
            ? systemInformation.bodyCount
            : `${systemInformation.bodyCount} (${systemInformation.bodyCount - systemInformation.bodies.length} undiscovered)`
        : null;

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
        </>
    )
}
