import Link from 'next/link';

import styles from '../styles/layout.module.scss';

const NavHeader = () => {
    return (
        <header className={styles.navHeader}>
            <Link href="/" key="dashboard">Dashboard</Link>
            <Link href="/system" key="system">System</Link>
            <Link href="/flightlog" key="flightlog">Flight log</Link>
        </header>
    )
}

export default NavHeader;
