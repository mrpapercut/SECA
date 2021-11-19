import Image from 'next/image';
import { GetServerSideProps } from 'next';

import Layout from '../components/Layout';

import APIClient from '../../vendor/EDSM/APIClient';

import styles from '../styles/layout.module.scss';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = new APIClient(process.env.EDSM_API_KEY, process.env.COMMANDER_NAME);

    const cmdrLastPosition = await client.getCommanderLastPosition();
    const cmdrCredits = await client.getCommanderCredits();

    return {
        props: {
            lastPosition: cmdrLastPosition,
            credits: cmdrCredits.credits[0].balance,
            commanderName: process.env.COMMANDER_NAME
        }
    }
}

export default function Home({lastPosition, credits, commanderName}) {
    return (
        <Layout>
            <div>
                <Image src="/img/cmdr-anargeek.png" className={styles.cmdrProfilePhoto} width={100} height={100} alt={''} />
                <br />
                Last known position of commander {commanderName}:
                <br />
                System: {lastPosition.system} ({lastPosition.coordinates.x} / {lastPosition.coordinates.y} / {lastPosition.coordinates.z})
                <br />
                Credits: {credits.toLocaleString()} cr
                <br />
                <em>Last updated: {lastPosition.date}</em>
            </div>
        </Layout>
    )
}
