import Image from "next/image";

import { useEffect, useState } from 'react';

import styles from '../styles/layout.module.scss';

import { useSocket } from '@/contexts/SocketContext';

import getUnmappedWorthyBodies from '@/util/getUnmappedWorthyBodies';
import getBodiesWithBioSignals from '@/util/getBodiesWithBioSignals';
import getSystemSignals from '@/util/getSystemSignals';
import translateState from '@/util/translateState';
import CurrentRoute from '@/components/CurrentRoute';

export default function Dashboard() {
    const { socket, isConnected } = useSocket();
    const [currentStatus, setCurrentStatus] = useState({} as CurrentStatus);
    const [currentSystem, setCurrentSystem] = useState({} as System);

    useEffect(() => {
        if (!socket) return;

        socket.addListener('getStatus', response => setCurrentStatus(response.status as CurrentStatus))
        socket.addListener('getCurrentSystem', response => setCurrentSystem(response.system as System));

        if (isConnected) {
            socket.sendMessage('getStatus');
            socket.sendMessage('getCurrentSystem');
        }

        return () => {
            socket.removeListener('getStatus');
            socket.removeListener('getCurrentSystem');
        }
    }, [socket, isConnected]);

    console.log({currentStatus, currentSystem});

    let worthMapping: string[] = [];
    let bodiesWithBioSignals: BodyWithBioSignals[] = [];
    if (currentSystem && Object.hasOwn(currentSystem, 'Bodies')) {
        worthMapping = getUnmappedWorthyBodies(currentSystem);
        bodiesWithBioSignals = getBodiesWithBioSignals(currentSystem);
    }

    let systemSignals: SystemSignalCount = {};
    if (currentSystem && Object.hasOwn(currentSystem, 'FSSSignals') && Array.isArray(currentSystem.FSSSignals)) {
        systemSignals = getSystemSignals(currentSystem);
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
                <div>{(currentStatus.credits || 0).toLocaleString()} cr</div>

                <div>Ship:</div>
                <div>{currentStatus.ship_name} ({currentStatus.ship_type})</div>

                <div>State:</div>
                <div>{translateState(currentStatus.state)}</div>

                <div>Current system:</div>
                <div>{currentStatus.current_system}</div>

                {currentStatus.current_body !== '' && currentStatus.current_body !== currentStatus.current_system && <>
                    <div>Current body:</div>
                    <div>{currentStatus.current_body}</div>
                </>}

                {currentStatus.current_sample !== '' && <>
                    <hr className={styles.divider} />

                    <div>Current sample:</div>
                    <div>{currentStatus.current_sample}</div>

                    <div>Sampling progress:</div>
                    <div>{currentStatus.sample_progress}/3</div>

                    <div>Sample base value:</div>
                    <div>{(currentStatus.sample_base_value || 0).toLocaleString()}</div>
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
                                <div key={`bodyBio_${i}`}>{b.name} {b.bioSubtype.length > 0 ? `(${b.bioSubtype.join(', ')})` : `(${b.count > 1 ? `${b.count} signals` : `${b.count} signal`}, ${b.planetClass}, ${b.distance.toFixed(0)} ls)`}</div>
                            )}
                        </div>
                    </>}
                </>}

                {currentSystem && Object.keys(systemSignals).length > 0 && <>
                    <hr className={styles.divider} />

                    <div>System signals:</div><div></div>
                    {Object.keys(systemSignals).map(signalName => <>
                        <div>{signalName}</div>
                        <div>{systemSignals[signalName]}</div>
                    </>)}
                </>}

                <CurrentRoute />

                <hr className={styles.divider} />

                <div>Est. exploration earnings:</div>
                <div>{(currentStatus.estimated_exploration_value || 0).toLocaleString()} cr</div>

                <div>Est. biological earnings:</div>
                <div>{(currentStatus.estimated_biological_value || 0).toLocaleString()} cr</div>

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
