import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    setCommanderLastPosition,
    setCommanderCredits
} from '../../redux/actions/commander';

import styles from '../styles/layout.module.scss';

export default function Home({EDSMClient}) {
    const dispatch = useDispatch();

    const commanderLastPosition = useSelector(state => state.commander.lastPosition);
    const commanderCredits = useSelector(state => state.commander.credits);
    const commanderName = useSelector(state => state.commander.name);

    useEffect(() => {
        if (!commanderLastPosition) {
            EDSMClient.getCommanderLastPosition().then(res => {
                dispatch(setCommanderLastPosition(res));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        if (!commanderCredits) {
            EDSMClient.getCommanderCredits().then(res => {
                dispatch(setCommanderCredits(res))
            })
        }
    }, [dispatch]);

    const currentSystem = commanderLastPosition ? <>
        <br />
        System: {commanderLastPosition.system} ({commanderLastPosition.coordinates.x} / {commanderLastPosition.coordinates.y} / {commanderLastPosition.coordinates.z})
    </> : <>Unknown</>;

    const credits = commanderCredits ? <><br />Credits: {commanderCredits.credits[0].balance.toLocaleString()} cr</> : null;

    const lastUpdated = commanderLastPosition ? <><br /><em>Last updated: {commanderLastPosition.date}</em></> : null;

    return (
        <div>
            <Image src="/img/cmdr-anargeek.png" className={styles.cmdrProfilePhoto} width={100} height={100} alt={''} />
            <br />
            Last known position of commander {commanderName}:
            {currentSystem}
            {credits}
            {lastUpdated}
        </div>
    )
}
