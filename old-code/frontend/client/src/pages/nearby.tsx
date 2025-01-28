import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import APIClient from '../../vendor/EDSM/APIClient';
import JournalClient from '../../vendor/Journal/client';

import { setNearbySystems } from '../../redux/actions/nearby';
import { setCommanderLastPosition } from '../../redux/actions/commander';

import calculateDistance from '../util/calculateDistance';

export default function Nearby({EDSMClient, JournalClient} : {EDSMClient: APIClient, JournalClient: JournalClient}) {
    const dispatch = useDispatch();

    const commanderLastPosition = useSelector((state: ReduxStates.ReduxState) => state.commander.lastPosition);
    const nearbySystems = useSelector((state: ReduxStates.ReduxState) => state.nearby.nearby);

    const fetchCommander = async () => {
        if (!commanderLastPosition) {
            const cmdrPos = await EDSMClient.getCommanderLastPosition()
            dispatch(setCommanderLastPosition(cmdrPos));
        }
    }

    useEffect(() => {
        fetchCommander();
    }, []);

    useEffect(() => {
        if (!commanderLastPosition || !Object.hasOwn(commanderLastPosition, 'coordinates')) {
            console.log('no last pos known');
            return
        }

        const {x, y, z} = commanderLastPosition.coordinates;
        const maxSize = 200;

        EDSMClient.getSystemsInCube(commanderLastPosition.system, x, y, z, maxSize).then(res => {
            dispatch(setNearbySystems(res));
        })
    }, [commanderLastPosition]);

    return <>
        <h2>Nearby</h2>
        {nearbySystems && nearbySystems.length > 0 && <div>
            {nearbySystems.map(s => {
                const origin = {
                    x: commanderLastPosition.coordinates.x,
                    y: commanderLastPosition.coordinates.y,
                    z: commanderLastPosition.coordinates.z,
                }

                return <div>{s.name} ({calculateDistance(origin, s.coords)}ly)</div>
            })}
        </div>}
    </>
}
