import { ReactNode, useEffect, useState } from 'react';

import { useSocket } from '@/contexts/SocketContext';
import translateShipType from '@/util/translateShipType';

export default function CommanderInfo(): ReactNode {
    const { socket, isConnected } = useSocket();
    const [commanderInfo, setCommanderInfo] = useState({} as CommanderInfo);
    const [credits, setCredits] = useState(0 as number);

    useEffect(() => {
        if (!socket) return;

        const infoListenerId = socket.addListener('getStatusCommanderInfo', response => setCommanderInfo(response.commander_info as CommanderInfo))
        const creditsListenerId = socket.addListener('getStatusCredits', response => setCredits(response.credits as number))

        socket.sendMessage('getStatusCommanderInfo');
        socket.sendMessage('getStatusCredits');

        return () => {
            socket.removeListener('getStatusCommanderInfo', infoListenerId);
            socket.removeListener('getStatusCredits', creditsListenerId);
        }

    }, [socket, isConnected]);

    return <>
        <div>Commander:</div>
        <div>{commanderInfo?.commander_name || ''}</div>

        <div>Credits:</div>
        <div>{(credits || 0).toLocaleString()} cr</div>

        <div>Ship:</div>
        <div>{commanderInfo?.ship_name} ({translateShipType(commanderInfo?.ship_type)})</div>
    </>
}
