import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {setCommanderLastPosition} from '../../redux/actions/commander';
import {setCurrentSystem} from '../../redux/actions/system';

import systemStyles from '../styles/system.module.scss';

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
                <span className={systemStyles.label}>Name:</span>
                <span className={systemStyles.value}>{systemInformation ? systemInformation.name : null}</span>
            </div>
            <div>
                <span className={systemStyles.label}>Bodies:</span>
                <span className={systemStyles.value}>{systemBodies}</span>
            </div>
        </>
    )
}
