import { GetServerSideProps } from 'next';

import Layout from '../components/Layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {}
    }
}

const Nearby = (props) => {
    return (
        <Layout>
            <div>Nearby systems:</div>
        </Layout>
    )
}

export default Nearby;
