import { useState, useEffect } from 'react';
import Image from "next/image";

import { useSocket } from '@/contexts/SocketContext';

import getBodyIcon from '@/util/getBodyIcon';
import calculateDistance from '@/util/calculateDistance';

import styles from '../styles/layout.module.scss';

function getBodyImageSize(body: Body): number {
    let imgWidth = 100;

    if (body.BodyType === 'Star') {
        imgWidth = 125;
    }

    return imgWidth;
}

function getBodyStateIcons(body: Body): React.ReactNode {
    const icons = [];

    icons.push(body.Discovered && !body.WasDiscovered ? 'discovered-first' : body.Discovered ? 'discovered-self' : body.WasDiscovered ? 'discovered-active' : 'discovered-inactive');
    if (body.BodyType === 'Planet') {
        icons.push(body.Mapped && !body.WasMapped ? 'mapped-first' : body.Mapped ? 'mapped-self' : body.WasMapped ? 'mapped-active' : 'mapped-inactive');
        icons.push(body.Footfall ? 'footfall-self' : 'footfall-inactive');
    }

    return <>
        {icons.map(icon => <Image key={`icon_${icon}`} src={`/images/icons/${icon}.png`} width={48} height={48} alt={icon} />)}
    </>
}

function getSystemDistances(currentSystem: System): Record<string, number> {
    const systems: Record<string, Coordinates> = {
        Sol: {x: 0, y: 0, z: 0},
        Ruwachis: {x: 83.96875, y: -22.3125, z: 83.125},
        Colonia: {x: -9530.5, y: -910.28125, z: 19808.125},
        'Sagittarius A*': {x: 25.21875, y: -20.90625, z: 25899.96875},
        'Beagle Point': {x: -1111.5625, y: -134.21875, z: 65269.75}
    }

    const distances: Record<string, number> = {}
    const currentCoordinates: Coordinates = {x: currentSystem.StarPosX, y: currentSystem.StarPosY, z: currentSystem.StarPosZ}

    for (const s in systems) {
        distances[s] = calculateDistance(currentCoordinates, systems[s])
    }

    return distances
}

function getSystemBioPredictions(currentSystem: System) {
    currentSystem.Bodies.forEach(body => {
        console.log(body.signals)
    });
}

export default function System() {
    const {socket, isConnected} = useSocket();
    const [currentSystem, setCurrentSystem] = useState({} as System);

    useEffect(() => {
        if (!socket) return;

        socket.addListener('getCurrentSystem', response => {
            setCurrentSystem(response.system as System)
        });

        if (isConnected) {
            socket.sendMessage('getCurrentSystem');
        }
    }, [socket, isConnected]);

    if (Object.keys(currentSystem).length === 0) {
        return <></>;
    }

    currentSystem.Bodies.sort((a, b) => a.DistanceFromArrivalLS - b.DistanceFromArrivalLS);

    const calculatedDistances = getSystemDistances(currentSystem);

    getSystemBioPredictions(currentSystem);

    return <>
        <div>
            <h3>{currentSystem.Name} ({currentSystem.Bodies.length} bodies)</h3>
            <hr className={styles.divider} />
            <div className={styles.grid}>
                {Object.keys(calculatedDistances).map(key => <>
                    <div key={`dist_${key}_label`}>{key}</div>
                    <div key={`dist_${key}_value`}>{calculatedDistances[key].toFixed(2)} ly</div>
                </>)}
            </div>

            <div className={styles.grid3}>
                {currentSystem.Bodies.filter(b => b.BodyType !== '').map(body => {
                    const isStar = body.BodyType === 'Star';
                    const imgWidth = getBodyImageSize(body);
                    const bodyStatIcons = getBodyStateIcons(body);

                    return <>
                        <hr className={styles.divider} />
                        <div key={`img_${body.BodyID}`} style={{textAlign: 'center'}}>
                            <Image src={getBodyIcon(body)} alt={body.Name} width={imgWidth} height={imgWidth} style={{margin: '0 auto'}}/>
                            <div key={`stats_${body.BodyID}`}>{bodyStatIcons}</div>
                        </div>
                        <div className={styles.grid3} style={{gridColumn: 'span 2'}}>
                            <div>Name:</div>
                            <div style={{gridColumn: 'span 2'}}>{body.Name}</div>

                            <div>Type:</div>
                            <div style={{gridColumn: 'span 2'}}>{isStar ? `Star type ${body.StarType}` : body.PlanetClass}</div>

                            <div>Distance:</div>
                            <div style={{gridColumn: 'span 2'}}>{body.DistanceFromArrivalLS.toFixed(2)} ls</div>

                            {!isStar && <>
                                <div>Landable:</div>
                                <div style={{gridColumn: 'span 2'}}>{body.Landable ? 'Yes' : 'No'}</div>
                            </>}

                            {body.Atmosphere !== '' && <>
                                <div>Atmosphere:</div>
                                <div style={{textTransform: 'capitalize', gridColumn: 'span 2'}}>{body.Atmosphere.replaceAll(' atmosphere', '')}</div>
                            </>}

                            {(body.signals || []).length > 0 && <>
                                <div>Signals:</div>
                                <div style={{gridColumn: 'span 2'}}>{body.signals?.map(s => `${s.Type} (${s.SubType !== '' ? s.SubType.replaceAll(',', ', ') : s.Count})`)}</div>
                            </>}
                        </div>
                    </>
                })}
            </div>
        </div>
    </>
}
