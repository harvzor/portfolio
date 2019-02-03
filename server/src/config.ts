interface IConfig {
    ip: string;
    port: number;
    type: string;
    dev: boolean
}

const config = function(): IConfig {
    const conf = require('../config.json');

    return conf;
}();

export default config;
