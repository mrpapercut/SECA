import '../styles/global.scss';

import {Provider} from 'react-redux';
import { store } from '../../redux/store';

import Layout from '../components/Layout';

import APIClient from '../../vendor/EDSM/APIClient';

const EDSMClient = new APIClient(process.env.NEXT_PUBLIC_EDSM_API_KEY, process.env.NEXT_PUBLIC_COMMANDER_NAME);

const App = ({Component, pageProps}) => {
    const _pageProps = Object.assign({}, pageProps, {EDSMClient});

    return (
        <Provider store={store}>
            <Layout>
                <Component {..._pageProps} />
            </Layout>
        </Provider>
    );
}

export default App;
