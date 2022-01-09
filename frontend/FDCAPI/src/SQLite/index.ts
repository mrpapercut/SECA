const path = require('path');
import {
    Database as sqliteDatabase,
    open as sqliteOpen,
} from 'sqlite';
import {Database as sqlite3Database} from 'sqlite3';

import dbSchema from './dbschema';

type DBSchema = {
    name: string,
    index: string,
    fields: object
}

class SQLite {
    db: sqliteDatabase;
    dbSchema: DBSchema;

    constructor() {
        this.db = null;
        this.dbSchema = dbSchema;
    }

    public async init() {
        await this.openDatabase();
    }

    public ready() {
        return this.db instanceof sqliteDatabase;
    }

    private async openDatabase() {
        if (!process.env.SQLITE_DB_NAME || process.env.SQLITE_DB_NAME === '') {
            throw Error('No environment variable for SQLITE_DB_NAME');
        }

        const dbname = process.env.SQLITE_DB_NAME.endsWith('.db') ? process.env.SQLITE_DB_NAME : process.env.SQLITE_DB_NAME + '.db';
        this.db = await sqliteOpen({
            filename: path.resolve(__dirname, '../../db/', dbname),
            driver: sqlite3Database
        });

        // Check if migrations need to be run
        const tables = await this.db.all('SELECT name FROM sqlite_master WHERE type="table"');
        if (! tables.find(t => t.name === this.dbSchema.name)) {
            await this.migrate();
        }
    }

    private async migrate(forceClear = false) {
        if (this.ready()) {
            const migrated = await this.db.migrate({
                force: forceClear,
                migrationsPath: path.resolve(__dirname, '../../db/migrations/')
            });

            return migrated;
        } else {
            throw Error('No database');
        }
    }

    private async insertRow(values) {
        this.validateSchemaValues(values);

        const fieldNames = Object.keys(this.dbSchema.fields);

        const rawQuery = `INSERT INTO ${this.dbSchema.name} (${fieldNames.join(', ')}) `
            + `VALUES (${fieldNames.map(f => `@${f}`).join(', ')})`

        const query = await this.db.prepare(rawQuery);
        const bindValues = {};
        fieldNames.forEach(f => {
            bindValues[`@${f}`] = values[f];
        });

        await query.bind(bindValues);

        const res = await query.run();

        return res;
    }

    private async updateRow(values: object, whereField: string = null) {
        this.validateSchemaValues(values);

        const index = whereField || this.dbSchema.index;
        const fieldNames = Object.keys(this.dbSchema.fields);
        const otherFields = fieldNames.filter(f => f !== index);
        const rawQuery = `UPDATE ${this.dbSchema.name} SET ${otherFields.map(f => `${f} = @${f}`).join(', ')} WHERE ${index} = @${index}`;

        const query = await this.db.prepare(rawQuery);
        const bindValues = {};
        otherFields.forEach(f => {
            bindValues[`@${f}`] = values[f];
        });

        await query.bind(bindValues);

        const res = await query.run();

        return res;
    }

    private validateSchemaValues(values: object = {}) {
        if (this.dbSchema === null) {
            throw Error('DBSchemaError: Missing schema');
        } else if (!(this.dbSchema instanceof Object) || this.dbSchema.constructor.name !== 'Object') {
            throw Error('DBSchemaError: schema is not an object');
        }

        for (let v in values) {
            if (!this.dbSchema.fields.hasOwnProperty(v)) {
                throw Error(`DBSchemaError: key '${v}' does not exist`);
            } else {
                switch (this.dbSchema.fields[v]) {
                    case 'string':
                        if (typeof values[v] !== 'string') {
                            throw Error(`DBSchemaError: value for '${v}' is not a string`);
                        }
                        break;

                    case 'int':
                        if (typeof values[v] !== 'number'
                            || /\./.test(values[v].toString()) === true) {
                                throw Error(`DBSchemaError: value for '${v}' is not an integer`);
                            }
                        break;

                    case 'float':
                        if (isNaN(parseFloat(values[v]))
                            || /\./.test(values[v].toString()) === false) {
                            throw Error(`DBSchemaError: value for '${v}' is not a float`);
                        }
                        break;
                }
            }
        }
    }

    async getByIndex(value: string) {
        if (!this.ready()) await this.openDatabase();

        const index = this.dbSchema.index;
        const rawQuery = `SELECT * FROM ${this.dbSchema.name} WHERE ${index} = @${index}`;

        const query = await this.db.prepare(rawQuery);

        const bindValues = {
            [`@${index}`]: value
        };

        await query.bind(bindValues);

        const res = await query.get();

        return res;
    }

    /* Custom */
    public async addAuth(cmdr: string, state: string, code_challenge: string, code_verifier: string) {
        if (!this.ready()) await this.openDatabase();

        const res = await this.insertRow({
            cmdr: cmdr,
            state,
            code_challenge,
            code_verifier,
        });

        return res;
    }

    public async updateAuth(state: string, auth_code: string) {
        if (!this.ready()) await this.openDatabase();

        const rawQuery = `UPDATE ${this.dbSchema.name} SET auth_code = @auth_code WHERE state = @state`;

        const query = await this.db.prepare(rawQuery);

        const bindValues = {
            '@auth_code': auth_code,
            '@state': state
        }

        await query.bind(bindValues);

        const res = await query.run();

        return res;
    }

    public async getByAuthCode(auth_code: string) {
        if (!this.ready()) await this.openDatabase();

        const rawQuery = `SELECT * FROM ${this.dbSchema.name} WHERE auth_code = @auth_code`;

        const query = await this.db.prepare(rawQuery);

        const bindValues = {
            '@auth_code': auth_code
        }

        await query.bind(bindValues);

        const res = await query.get();

        return res;
    }

    public async storeAccessToken(cmdr: string, access_token: string, token_type: string, refresh_token: string, expires_in: number) {
        if (!this.ready()) await this.openDatabase();

        const rawQuery = `UPDATE ${this.dbSchema.name} SET access_token = @access_token, token_type = @token_type, refresh_token = @refresh_token, expires_at = @expires_at WHERE cmdr = @cmdr`;

        const query = await this.db.prepare(rawQuery);

        const bindValues = {
            '@access_token': access_token,
            '@token_type': token_type,
            '@refresh_token': refresh_token,
            '@expires_at': +new Date(+new Date() + (expires_in * 1000)),
            '@cmdr': cmdr
        }

        await query.bind(bindValues);

        const res = await query.run();

        return res;
    }

    public async getAccessToken(cmdr: string) {
        if (!this.ready()) await this.openDatabase();

        const rawQuery = `SELECT access_token, token_type, expires_at, refresh_token FROM ${this.dbSchema.name} WHERE cmdr = @cmdr`;

        const query = await this.db.prepare(rawQuery);

        const bindValues = {
            '@cmdr': cmdr
        }

        await query.bind(bindValues);

        const res = await query.get();

        return res;
    }
}

export default SQLite;
