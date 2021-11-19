import Head from 'next/head';

import NavHeader from './NavHeader';

import styles from '../styles/layout.module.scss';

const Layout = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>EliteD</title>
            </Head>
            <NavHeader />
            <main>{children}</main>
        </div>
    )
}

export default Layout;
