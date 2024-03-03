"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentials = exports.getConfigKey = exports.setConfigKey = exports.setLoginCredentials = void 0;
const fs = __importStar(require("fs"));
const configFilePath = './config.json';
function setLoginCredentials(credential) {
    const index = credential.lastIndexOf('@');
    let name = '';
    let apiKey = '';
    if (index != -1) {
        const _name = credential.substring(0, index);
        const _key = credential.substring(index + 1);
        name = _name;
        apiKey = _key;
    }
    if (!fs.existsSync(configFilePath)) {
        // If not, create an empty config object
        const initialConfig = {};
        writeConfigFile(initialConfig);
    }
    setConfigKey('username', name);
    setConfigKey('api_key', apiKey);
    return;
}
exports.setLoginCredentials = setLoginCredentials;
function readConfigFile() {
    try {
        const data = fs.readFileSync(configFilePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        // Handle errors, such as the file not existing
        console.error('Error reading config file:', error);
        return {};
    }
}
function writeConfigFile(config) {
    try {
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf-8');
    }
    catch (error) {
        // Handle errors, such as permission issues
        console.error('Error writing to config file:', error);
    }
}
function setConfigKey(key, value) {
    const config = readConfigFile();
    config[key] = value;
    writeConfigFile(config);
}
exports.setConfigKey = setConfigKey;
function getConfigKey(key) {
    const config = readConfigFile();
    return config[key];
}
exports.getConfigKey = getConfigKey;
function getCredentials() {
    return { 'username': getConfigKey('username'), 'api_key': getConfigKey('api_key') };
}
exports.getCredentials = getCredentials;
//# sourceMappingURL=store.js.map