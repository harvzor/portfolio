import logger from './logger';

import fs = require('fs');
import dotenv = require('dotenv');

class IConfig {
    PORT?: number;
    TYPE?: ConfigType;
    DEV?: boolean;
    ALLOW_ROBOTS?: boolean;
}

enum ConfigType {
    iis = "iis",
    node = "node"
}

class Config implements IConfig {
    /**
     * The port the application should run on.
     */
    PORT: number;
    /**
     * Choose the run type.
     */
    TYPE: ConfigType;
    /**
     * If the application is in development mode.
     */
    DEV: boolean;
    /**
     * If robots should crawl the website.
     */
    ALLOW_ROBOTS: boolean;
    constructor() {
        const conf = JSON.parse(fs.readFileSync('./config.json', 'utf8')) as IConfig;

        const envs = fs.existsSync('./.env')
            ? dotenv.parse(fs.readFileSync('./.env', 'utf8')) as any
            : {};

        this.PORT = parseInt(envs.PORT || conf.PORT);
        this.TYPE = envs.TYPE || conf.TYPE;
        this.DEV =  String(envs.DEV || conf.DEV).toLowerCase() === "true";
        this.ALLOW_ROBOTS =  String(envs.ALLOW_ROBOTS || conf.ALLOW_ROBOTS).toLowerCase() === "true";

        logger.info(this.PORT, this.TYPE, this.DEV, typeof(this.DEV) );
    }
}

const config = new Config();

global.config = config;

logger.info('ahh', JSON.stringify(global.config));

export { ConfigType, config };
export default config;
