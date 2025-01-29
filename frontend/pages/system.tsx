import { useState, useEffect } from 'react';
import Image from "next/image";

import { useSocket } from '@/contexts/SocketContext';

import getBodyIcon from '@/util/getBodyIcon';

import styles from '../styles/layout.module.scss';

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

    console.log(currentSystem);
    if (Object.keys(currentSystem).length === 0) {
        return <></>;
    }

    currentSystem.Bodies.sort((a, b) => a.BodyID - b.BodyID);

    return <>
        <div>
            <h1>{currentSystem.Name} ({currentSystem.Bodies.length} bodies)</h1>
            <div className={styles.grid3}>
                {currentSystem.Bodies.map(body => {
                    const isStar = body.BodyType === 'Star';

                    let imgWidth = 100;
                    if (isStar) {
                        if (body.StellarMass <= 1.5) imgWidth = 250 * body.StellarMass;
                        else imgWidth = 100 * body.StellarMass;
                    } else {
                        if (body.MassEM < 0.01) imgWidth = 10000 * body.MassEM;
                        else if (body.MassEM < 0.1) imgWidth = 1000 * body.MassEM;
                        else imgWidth = 100 * body.MassEM;
                    }
                    imgWidth = Math.min(400, Math.max(20, imgWidth));

                    return <>
                        <hr className={styles.divider} />
                        <div key={`img_${body.BodyID}`} style={{textAlign: 'center'}}>
                            <Image src={getBodyIcon(body)} alt={body.Name} width={imgWidth} height={imgWidth} style={{margin: '0 auto'}}/>
                            <div key={`stats_${body.BodyID}`}>
                                {(isStar ? [
                                    body.WasDiscovered ? 'Previously discovered' : 'Not yet discovered'
                                ] : [
                                    body.WasDiscovered ? 'Previously discovered' : 'Not yet discovered',
                                    body.WasMapped ? 'Previously mapped' : 'Not yet mapped',
                                    body.Mapped ? 'Mapped!' : 'Not mapped',
                                    body.Footfall ? 'Footfall!' : 'No footfall',
                                ]).join(', ')}
                            </div>
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
