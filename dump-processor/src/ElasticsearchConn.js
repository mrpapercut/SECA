const {Client} = require('@elastic/elasticsearch');
const got = require('got');

const systemsMappingTemplate = require('./templates/systems.json');

class ElasticsearchConn {
    constructor() {
        this.elasticfqdn = `${process.env.ELASTIC_SCHEME}://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`;
    }

    async initialize() {
        await this.setupClient();
    }

    async ready() {
        try {
            await this.pingElastic();

            return true;
        } catch (e) {
            return false;
        }
    }

    async pingElastic() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.ping();

                resolve();
            } catch (e) {
                reject('Unable to reach Elasticsearch');
            }
        });
    }

    async setupClient() {
        this.client = new Client({
            node: this.elasticfqdn,
            auth: {
                username: process.env.ELASTIC_USER,
                password: process.env.ELASTIC_PASS
            },
            maxRetries: 1,
            requestTimeout: 1000
        });
    }

    async insertMappingTemplates() {
        const mappingTemplates = {
            systems: systemsMappingTemplate
        };

        for (const i in mappingTemplates) {
            const indexExists = await this.client.indices.exists({
                index: i
            });

            if (indexExists.hasOwnProperty('statusCode') && indexExists.statusCode === 200) {
                console.log(`Index already exists: ${i}`);
            } else {
                console.log(`Index ${i} does not exist, creating now`);
                const indexCreated = await this.client.indices.create({
                    index: i,
                    body: {
                        mappings: {
                            properties: mappingTemplates[i].mappings._doc.properties
                        }
                    }
                });

                if (indexCreated.hasOwnProperty('statusCode') && indexCreated.statusCode === 200) {
                    console.log(`Index ${i} successfully created`);
                };
            }
        }
    }

    async indexDoc(indexName, doc) {
        await this.client.index({
            index: indexName,
            body: doc
        });
    }
}

module.exports = ElasticsearchConn;
