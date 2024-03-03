import { Command } from 'commander';
import figlet from 'figlet';
import { setLoginCredentials } from './store';
import { contest } from './contest';
import { getStartAndEndOfDay } from './utils/time';
import { addDays } from 'date-fns';


const program = new Command();

console.log(figlet.textSync("Contest"));

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
    setLoginCredentials(options.credential);
} else if (options.ls) {
    const params: params = { order_by: 'start', start__gte: new Date().toISOString() };
    if (options.host) {
        params['host__iregex'] = options.host;
    }
    if (options.startDate) {
        const { start } = getStartAndEndOfDay(new Date(options.startDate));
        params['start__gte'] = start;
    }
    if (options.endDate) {
        const { end } = getStartAndEndOfDay(new Date(options.endDate));
        params['end__lte'] = end;
    }
    if (options.today) {
        const { start, end } = getStartAndEndOfDay();
        params['start__gte'] = start;
        params['end__lte'] = end;
    }

    if (options.tommorow) {
        const { start, end } = getStartAndEndOfDay(addDays(new Date(), 1));
        
        params['start__gte'] = start;
        params['end__lte'] = end;
    }

    if (options.limit) {
        params['limit'] = options.limit;
    }

    contest(params);
}
