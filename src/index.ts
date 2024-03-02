import { Command } from 'commander';
import figlet from 'figlet';
import { setLoginCredentials } from './store';
import { contest } from './contest';


const program = new Command();

console.log(figlet.textSync("Contest"));

program
    .version("1.0.0")
    .description("An Contest CLI for listing contests")
    .option("-login,--credential <value>", "Login with name and key")
    .option("-list,--ls [value]", "List of contest")
    .option("-h,--host <value>", "List of contest")
    .parse(process.argv);

const options = program.opts();
console.log(options);
if (options.credential) {
    setLoginCredentials(options.credential);
} else if (options.ls) {
    const params: params = { order: 'start' };
    if (options.host) {
        params['host__iregex'] = options.host;
    }
    const data = contest(params);
    const temp = [{ name: 'aju', time: new Date() }, { name: 'ravi', time: new Date() }];
}
