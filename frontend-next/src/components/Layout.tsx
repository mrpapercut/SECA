import Head from 'next/head';

import NavHeader from './NavHeader';
import Wallpaper from './Wallpaper';

import styles from '../styles/layout.module.scss';

const Layout = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>EliteD</title>
            </Head>
            <Wallpaper />
            <NavHeader />
            <main>{children}</main>
        </div>
    )
}

export default Layout;
