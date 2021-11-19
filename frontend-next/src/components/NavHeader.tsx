import Link from 'next/link';

import styles from '../styles/layout.module.scss';

const NavHeader = () => {
    return (
        <header className={styles.navHeader}>
            <Link href="/" key="dashboard">
                <a>Dashboard</a>
            </Link>
            <Link href="/nearby" key="nearby">
                <a>Nearby</a>
            </Link>
            <Link href="/system" key="system">
                <a>System</a>
            </Link>
        </header>
    )
}

export default NavHeader;
