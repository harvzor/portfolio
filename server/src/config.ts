enum ConfigType {
    iis = "iis",
    node = "node"
}

interface IConfig {
    ip: string;
    port: number;
    type: ConfigType;
    dev: boolean
}

const config = function(): IConfig {
    const conf = require('../config.json');

    return conf;
}();

export { ConfigType, config };
export default config;
