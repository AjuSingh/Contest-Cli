"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contest = void 0;
const axios_1 = __importDefault(require("axios"));
const store_1 = require("./store");
const cli_table3_1 = __importDefault(require("cli-table3"));
const endpoint = 'https://clist.by/api/v4/contest/';
const contest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, api_key } = (0, store_1.getCredentials)();
        const url = new URL(endpoint);
        url.searchParams.set('username', username);
        url.searchParams.set('api_key', api_key);
        for (let [key, value] of Object.entries(data)) {
            url.searchParams.set(key, value);
        }
        const response = yield axios_1.default.get(url.toString());
        const result = response.data;
        if (result) {
            displayContestsTable(result.objects);
        }
    }
    catch (err) {
        console.log('Please check your credentials!');
    }
});
exports.contest = contest;
function displayContestsTable(contests) {
    const keys = ['event', 'href', 'start', 'end'];
    const table = new cli_table3_1.default({ head: keys });
    const arr = contests.slice(0, 10);
    arr.forEach((contest) => {
        const { event, href, start, end } = contest;
        table.push([event, href, start, end]);
    });
    console.log(table.toString());
}
//# sourceMappingURL=contest.js.map