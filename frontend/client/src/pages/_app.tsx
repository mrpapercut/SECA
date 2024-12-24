import '../styles/global.scss';

import {Provider} from 'react-redux';
import { store } from '../../redux/store';

import Layout from '../components/Layout';

import APIClient from '../../vendor/EDSM/APIClient';

import {APIKEY, CMDRNAME} from '../../config';

const EDSMClient = new APIClient(APIKEY, CMDRNAME);

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
