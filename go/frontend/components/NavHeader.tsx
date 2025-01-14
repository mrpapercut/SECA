import Link from 'next/link';

import styles from '../styles/layout.module.scss';

const NavHeader = () => {
    return (
        <header className={styles.navHeader}>
            <Link href="/" key="dashboard">Dashboard</Link>
            <Link href="/commander" key="commander">Commander</Link>
            <Link href="/flightlog" key="flightlog">Flight log</Link>
            <Link href="/system" key="system">System</Link>
            <Link href="/nearby" key="nearby">Nearby</Link>
        </header>
    )
}

export default NavHeader;
