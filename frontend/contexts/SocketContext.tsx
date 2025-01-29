import { createContext, useContext, useEffect, useState } from 'react';
import SocketConnection from '@/socket/socket';

interface SocketContextType {
    socket: SocketConnection | null
    isConnected: boolean
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({children}: {children: React.ReactNode}) => {
    const [socket, setSocket] = useState<SocketConnection | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new SocketConnection();

        socketInstance.setConnectionChangeCallback(setIsConnected);
        socketInstance.connect();

        const waitForConnection = () => {
            if (!socketInstance.isConnected) {
                return setTimeout(waitForConnection, 100);
            }
        }

        waitForConnection();

        setSocket(socketInstance);

        return () => {
            socketInstance.close();
        }
    }, []);

    return <SocketContext.Provider value={{ socket, isConnected }}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }

    return context;
}
