import Head from 'next/head';

import NavHeader from './NavHeader';
import Wallpaper from './Wallpaper';

import styles from '../styles/layout.module.scss';

const Layout = ({children}) => {
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
