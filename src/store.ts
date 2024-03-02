import * as fs from 'fs';
const configFilePath = './config.json';


export function setLoginCredentials(credential: string) {
    const index = credential.lastIndexOf('@');
    let name = '';
    let apiKey = '';
    if (index != -1) {
        const _name = credential.substring(0, index);
        const _key = credential.substring(index+1);
        name = _name;
        apiKey = _key;
    }
    if (!fs.existsSync(configFilePath)) {
        // If not, create an empty config object
        const initialConfig: Config = {};
        writeConfigFile(initialConfig);
      }
    
    setConfigKey('username', name);
    setConfigKey('api_key', apiKey)
    return;
}


function readConfigFile(): Config {
    try {
        const data = fs.readFileSync(configFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Handle errors, such as the file not existing
        console.error('Error reading config file:', error);
        return {};
    }
}

function writeConfigFile(config: Config): void {
    try {
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf-8');
    } catch (error) {
        // Handle errors, such as permission issues
        console.error('Error writing to config file:', error);
    }
}

export function setConfigKey(key: string, value: any): void {
    const config = readConfigFile();
    config[key] = value;
    writeConfigFile(config);
}

export function getConfigKey(key: string): any | undefined {
    const config = readConfigFile();
    return config[key];
}

export function getCredentials() {
    return { 'username': getConfigKey('username'), 'api_key': getConfigKey('api_key') }
}