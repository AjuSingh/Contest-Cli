#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const store_1 = require("./store");
const contest_1 = require("./contest");
const time_1 = require("./utils/time");
const date_fns_1 = require("date-fns");
const program = new commander_1.Command();
console.log(figlet_1.default.textSync("Contest"));
program
    .version("1.0.0")
    .description("An Contest CLI for listing contests")
    .option("-login,--credential <value>", "Login with name and key")
    .option("-list,--ls [value]", "List of contest")
    .option("-host,--host <value>", "List of contest")
    .option("-sd,--startDate <value>", "Start date of contest")
    .option("-limit,--limit <value>", "Today contests")
    .option("-ed,--endDate <value>", "End date of contest")
    .option("-today,--today [values]", "Today contests")
    .option("-tmrw,--tommorow [values]", "tomorrow contests")
    .parse(process.argv);
const options = program.opts();
if (options.credential) {
    (0, store_1.setLoginCredentials)(options.credential);
}
else if (options.ls) {
    const params = { order_by: 'start', start__gte: new Date().toISOString() };
    if (options.host) {
        params['host__iregex'] = options.host;
    }
    if (options.startDate) {
        const { start } = (0, time_1.getStartAndEndOfDay)(new Date(options.startDate));
        params['start__gte'] = start;
    }
    if (options.endDate) {
        const { end } = (0, time_1.getStartAndEndOfDay)(new Date(options.endDate));
        params['end__lte'] = end;
    }
    if (options.today) {
        const { start, end } = (0, time_1.getStartAndEndOfDay)();
        params['start__gte'] = start;
        params['end__lte'] = end;
    }
    if (options.tommorow) {
        const { start, end } = (0, time_1.getStartAndEndOfDay)((0, date_fns_1.addDays)(new Date(), 1));
        params['start__gte'] = start;
        params['end__lte'] = end;
    }
    if (options.limit) {
        params['limit'] = options.limit;
    }
    (0, contest_1.contest)(params);
}
//# sourceMappingURL=index.js.map