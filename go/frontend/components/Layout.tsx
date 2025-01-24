import Head from 'next/head';

import NavHeader from './NavHeader';

import styles from '../styles/layout.module.scss';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Head>
                <title>SECA - SuperElite Companion App</title>
            </Head>
            {/* <Wallpaper /> */}
            <div className={styles.wrapper}>
                <NavHeader />
                <main className={styles.mainContent}>{children}</main>
            </div>
        </div>
    )
}

export default Layout;
