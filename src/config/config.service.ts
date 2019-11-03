import { Config } from './config.interfaces';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ConfigService {

    config: Config = {
        mongodb_uri: process.env.mongodb_uri,
        node_env: process.env.NODE_ENV,
        endpoints: ['app', 'app/*'],
        root_path: path.join(__dirname, '../', '/client', '/public'),
        expires_in: '1h',
        jwt_secret: 'randomstring',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        scope: ['email', 'profile']
    }

    get(field: string): any {
        const f = field.toLowerCase();
        return this.config[f];
    }

    set(field: string, value: any): void {
        const f = field.toLowerCase();
        this.config[f] = value;
    }

    createOptions() {
        return { 
            id: 'myId'
        }
    }

};

export default ConfigService;