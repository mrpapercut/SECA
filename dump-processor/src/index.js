const fs = require('fs');
const readline = require('readline');
const child_process = require('child_process');
const path = require('path');

const got = require('got');

const ElasticsearchConn = require('./ElasticsearchConn');

const dumpsConfig = require('./dumps-config.json');

const mapRowToTemplate = require('./mapRowToTemplate');

class DumpsProcessor {
    constructor(debug = false) {
        this.debugEnabled = debug;
        this.dumpsPath = path.resolve(__dirname, '../dumps/');

        this.es = new ElasticsearchConn();
        this.es.initialize();
    }

    debug(level, ...messages) {
        if (this.debugEnabled === true) {
            console[level](...messages);
        }
    }

    async process(dumpConfig) {
        this.esReadyInterval = setInterval(async () => {
            if (await this.es.ready()) {
                clearInterval(this.esReadyInterval);
                await this.es.insertMappingTemplates();

                await this.deleteFiles(dumpConfig.name);
                await this.downloadFile(dumpConfig.url, dumpConfig.name);
                await this.extractFile(dumpConfig.name);
                await this.splitFile(dumpConfig.name);
                // await this.readFile(dumpConfig);
                // await this.deleteFiles(dumpConfig.name);
            }
        }, 1000);
    }

    deleteFiles(filename) {
        const jsonGzipFilepath = path.resolve(this.dumpsPath, `${filename}.json.gz`);
        const jsonFilepath = path.resolve(this.dumpsPath, `${filename}.json`);

        return new Promise((resolve, reject) => {
            try {
                fs.unlinkSync(jsonGzipFilepath);
                this.debug('log', `Deleted file ${jsonGzipFilepath}`);
            } catch (e) {
                this.debug('log', `Could not delete file ${jsonGzipFilepath} because file does not exist`);
            }

            try {
                fs.unlinkSync(jsonFilepath);
                this.debug('log', `Deleted file ${jsonFilepath}`);
            } catch (e) {
                this.debug('log', `Could not delete file ${jsonFilepath} because file does not exist`);
            }

            resolve();
        });
    }

    downloadFile(url, filename) {
        const filepath = path.resolve(this.dumpsPath, `${filename}.json.gz`);

        let lastPercentage = -1;

        return new Promise((resolve, reject) => {
            const downloadStream = got.stream(url);
            const writerStream = fs.createWriteStream(filepath);

            this.debug('log', `Starting download of ${filename}`);
            downloadStream
                .on('downloadProgress', ({transferred, total, percent}) => {
                    const percentage = Math.round(percent * 100);

                    if (percentage > lastPercentage) {
                        this.debug('log', `Progress: ${transferred}/${total} (${percentage}%)`);
                        lastPercentage = percentage;
                    }
                })
                .on('error', error => {
                    this.debug('error', `Download failed: ${error.message}`);
                });

            writerStream
                .on('error', error => {
                    this.debug('error', `Could not write file to system: ${error.message}`);
                })
                .on('finish', () => {
                    this.debug('log', `File downloaded to ${filepath}`);
                    resolve();
                });

            downloadStream.pipe(writerStream);
        });
    }

    extractFile(filename) {
        this.debug('log', `Extracting file ${filename}.json.gz`);
        child_process.spawnSync('gunzip', ['-k', `/app/dumps/${filename}.json.gz`]);
    }

    splitFile(filename) {
        this.debug('log', `Splitting ${filename}.json into chunks`);
        child_process.spawnSync('split', ['-d', '-l100000', '--additional-suffix=.json', `/app/dumps/${filename}.json`, `/app/dumps/${filename}-split-`]);
    }

    readFile(dumpConfig) {
        const filepath = path.resolve(this.dumpsPath, `${dumpConfig.name}.json`);
        let counter = 0;

        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: fs.createReadStream(filepath)
            });

            rl.on('line', async line => {
                let validline = null;

                try {
                    validline = JSON.parse(line.substr(0, line.length - 1));
                    counter++;
                } catch (e) {}

                if (validline !== null) {
                    await this.insertRow(dumpConfig, validline)
                }
            });

            rl.on('close', () => {
                this.debug('log', `Processed ${counter} lines`)
                resolve();
            });
        });
    }

    async insertRow(dumpConfig, json) {
        const mappedRow = mapRowToTemplate(dumpConfig.mapping, json);

        await this.es.indexDoc(dumpConfig.index, mappedRow);
    }
}

const DEBUG = true;
const systemsWithCoordinatesConfig = dumpsConfig[0];
const systemsWithCoordinates7daysConfig = dumpsConfig[1];
const systemsWithoutCoordinatesConfig = dumpsConfig[2];

const processor = new DumpsProcessor(DEBUG);

[/*systemsWithCoordinatesConfig, systemsWithCoordinates7daysConfig,*/ systemsWithoutCoordinatesConfig].forEach(config => {
    await processor.process(config);
});
