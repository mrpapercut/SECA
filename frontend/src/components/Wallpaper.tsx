import Image from 'next/image';
import {useEffect} from 'react';

import wallpapersJson from '../json/wallpapers.json';

import styles from '../styles/layout.module.scss';

export default function Wallpaper() {
    const getWallpaper = () => wallpapersJson.wallpapers[Math.floor(Math.random() * wallpapersJson.wallpapers.length)];

    return (
        <>
            <div className={styles.wallpaperWrapper}>
                <Image src={`/wallpapers/${getWallpaper()}`} layout="fill" />
            </div>
        </>
    );
}
