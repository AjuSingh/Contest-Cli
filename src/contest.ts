import axios from "axios";
import { getCredentials } from "./store";
import Table from 'cli-table3';

const endpoint = 'https://clist.by/api/v4/contest/';


export const contest = async (data: params) => {
    try {
        const { username, api_key } = getCredentials()
        const url = new URL(endpoint);
        url.searchParams.set('username', username);
        url.searchParams.set('api_key', api_key);

        for (let [key, value] of Object.entries(data)) {
            url.searchParams.set(key, value);
        }
        const response = await axios.get(url.toString());
        const result: ContestResponse = response.data;

        if (result) {
            displayContestsTable(result.objects);
        }
    } catch (err: any) {
        console.log('Please check your credentials!');

    }
}


function displayContestsTable(contests: ContestObject[]): void {
    const keys = ['event', 'href', 'start', 'end'];
    const table = new Table({ head: keys });
    const arr = contests.slice(0, 10);
    arr.forEach((contest) => {
        const { event, href, start, end } = contest;
        table.push([event, href, start, end]);
    })
    console.log(table.toString());
}
