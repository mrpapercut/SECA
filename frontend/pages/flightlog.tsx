import { useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';

import styles from '../styles/layout.module.scss';

export default function FlightLog() {
    const {socket, isConnected} = useSocket();
    const [flightlog, setFlightlog] = useState([] as System[]);

    useEffect(() => {
        if (!socket) return;

        socket.addListener('getFlightlog', response => {
            setFlightlog(response.flightlog as System[])
        });

        if (isConnected) {
            socket.sendMessage('getFlightlog');
        }
    }, [socket, isConnected]);

    return <>
        <h1>Flightlog</h1>
        <div className={styles.grid}>
            {flightlog.map(s => <>
                <div>{s.Name}</div>
                <div>{s.LastVisited.toString()}</div>
            </>)}
        </div>
    </>
}
