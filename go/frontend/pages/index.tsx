import Image from "next/image";

import { useEffect, useState } from 'react';

import styles from '../styles/layout.module.scss';

interface CurrentState {
    commander: string
    location: string
    credits: number
    ship: {
        type: string
        name: string
        fuellevel: number
        fuelcapacity: number
    }
    statistics: {
        systems_visited: number
        total_distance: number
        total_jumps: number
    }
}

export default function Home() {
    const [currentState, setCurrentState] = useState({} as CurrentState);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setCurrentState(data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    return <>
        <div>
            <div className={styles.grid}>
                <div><Image priority={true} src="https://www.edsm.net/img/users/1/8/7/9/1/3/187913.png" className={styles.cmdrProfilePhoto} width={100} height={100} alt={''} /></div>
                <div></div>

                <div>Commander:</div>
                <div>{currentState.commander}</div>

                <div>Credits:</div>
                <div>{(currentState.credits || 0).toLocaleString()} cr</div>

                <hr className={styles.divider} />
            </div>
        </div>
    </>
}
