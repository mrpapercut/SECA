import Layout from '@/components/Layout';
import '../styles/global.scss';

import type { AppProps } from "next/app";
import { SocketProvider } from '@/contexts/SocketContext';

export default function App({ Component, pageProps }: AppProps) {
    return <SocketProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </SocketProvider>
}
