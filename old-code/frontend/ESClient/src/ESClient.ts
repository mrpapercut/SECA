import {Client} from '@elastic/elasticsearch';

class ESClient {
    client: Client;

    constructor() {

    }

    public async initialize() {
        await this.setupClient();
    }

    public async ready() {
        try {
            await this.pingElastic();

            return true;
        } catch (e) {
            console.log(e);

            return false;
        }
    }

    private async pingElastic() {
        let pingCount = 0;

        return new Promise(async (resolve, reject) => { // eslint-disable-line no-async-promise-executor
            while (pingCount <= 50) {
                try {
                    await this.client.ping();

                    resolve(true);
                } catch (e) {
                    pingCount++;
                }
            }

            reject('Unable to reach Elasticsearch');
        });
    }

    private async setupClient() {
        this.client = new Client({
            node: `${process.env.ELASTIC_SCHEME}://${process.env.ELASTIC_NODE01}:${process.env.ELASTIC_PORT}`,
            auth: {
                username: process.env.ELASTIC_USER,
                password: process.env.ELASTIC_PASS
            }
        });
    }

    public async query(query) {
        const result = await this.client.search({
            index: process.env.INDEX_SYSTEMS_WITH_COORDINATES,
            body: query
        });

        if (result && result.body.hits.total.value > 0) {
            return result.body.hits.hits;
        } else {
            return {};
        }
    }
}

export default ESClient;
