import { GetServerSideProps } from 'next';

import Layout from '../components/Layout';

import APIClient from '../../vendor/EDSM/APIClient';

import systemStyles from '../styles/system.module.scss';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = new APIClient(process.env.EDSM_API_KEY, process.env.COMMANDER_NAME);

    const cmdrLastPosition = await client.getCommanderLastPosition();
    const systemInformation = await client.getSystemCelestialBodies(cmdrLastPosition.system);

    return {
        props: {
            systemInformation
        }
    }
}

const System = ({systemInformation}) => {
    return (
        <Layout>
            <div>
                <span className={systemStyles.label}>Name:</span>
                <span className={systemStyles.value}>{systemInformation.name}</span>
            </div>
            <div>
                <span className={systemStyles.label}>Bodies:</span>
                <span className={systemStyles.value}>{
                    systemInformation.bodyCount === systemInformation.bodies.length
                    ? systemInformation.bodyCount
                    : `${systemInformation.bodyCount} (${systemInformation.bodyCount - systemInformation.bodies.length} undiscovered)`
                }</span>
            </div>
        </Layout>
    )
}

export default System;
