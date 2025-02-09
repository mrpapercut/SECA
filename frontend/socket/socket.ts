export default class SocketConnection {
    socket: WebSocket | undefined;
    retryTimeout: NodeJS.Timeout | undefined;

    isConnected: boolean = false;

    listeners: Record<string, { id: number, callback: (data: Record<string, unknown>) => void }[]> = {}
    nextListenerId = 0;

    messageQueue: string[] = [];

    onConnectionChange: ((status: boolean) => void) | undefined;

    constructor() {

    }

    connect() {
        console.log('Connecting to WebSocket server...');
        this.socket = new WebSocket(`ws://${window.location.hostname}:8080/`);

        this.socket.onopen = () => {
            console.log('Connected to WebSocket server');
            if (this.retryTimeout) clearTimeout(this.retryTimeout);

            this.isConnected = true;
            if (this.onConnectionChange) this.onConnectionChange(true);

            while (this.messageQueue.length > 0) {
                this.socket?.send(this.messageQueue.shift() as string);
            }
        }

        this.socket.onclose = () => {
            this.isConnected = false;
            if (this.onConnectionChange) this.onConnectionChange(false);

            this.retryTimeout = setTimeout(() => this.connect(), 500);
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (!Object.hasOwn(data, 'type')) {
                console.log('Received message has invalid structure:', data);
                return
            }

            if (!Object.keys(this.listeners).includes(data.type)) {
                console.log(`No listener for type '${data.type}'`);
            } else {
                this.listeners[data.type]?.forEach(listener => listener.callback(data));
            }
        }
    }

    close() {
        if (this.socket) this.socket.close();
        if (this.retryTimeout) clearTimeout(this.retryTimeout);
    }

    addListener(type: string, callback: (responseData: Record<string, unknown>) => void): number {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }

        const id = this.nextListenerId++;
        this.listeners[type].push({ id, callback });

        return id;
    }

    removeListener(type: string, id: number) {
        if (!Object.hasOwn(this.listeners, type)) return;

        this.listeners[type] = this.listeners[type].filter(listener => listener.id !== id);

        if (this.listeners[type].length === 0) {
            delete this.listeners[type];
        }
    }

    setConnectionChangeCallback(callback: (status: boolean) => void) {
        this.onConnectionChange = callback;
    }

    sendMessage(message: string): void {
        if (this.isConnected && this.socket) {
            this.socket.send(message);
        } else {
            this.messageQueue.push(message);
        }
    }
}

/*
console.log('Connecting to WebSocket server...');
socket = new WebSocket(`ws://${window.location.hostname}:8080/`);

socket.onopen = () => {
    if (retryTimeout) clearTimeout(retryTimeout);

    setIsConnected(true);

    socket.send('getStatus');
    socket.send('getRoute');
    socket.send('getCurrentSystem');
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (!Object.hasOwn(data, 'type')) {
        console.log('Received message has invalid structure:', data);
        return
    }

    switch(data.type) {
        case 'getStatus':
            socket.send('getCurrentSystem');
            return setCurrentState(data.status);
        case 'getRoute':
            setCurrentRoute(data.route);
            setCurrentRouteDistance(data.total_distance);
            return;
        case 'getCurrentSystem':
            setCurrentSystem(data.system);
            return;
    }
};

// socket.onerror = (error) => {
//     console.log('WebSocket error:', error);
// };

socket.onclose = () => {
    setIsConnected(false);
    retryTimeout = setTimeout(() => connect(), 500);
};
*/
