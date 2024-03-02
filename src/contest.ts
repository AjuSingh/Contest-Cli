import axios from "axios";
import { getCredentials } from "./store";
import chalk from "chalk";

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
        console.log(url.toString());
        const response = await axios.get(url.toString());
        const result: ContestObject[] = response.data;
        if (result) {
            displayContestsTable(result);
        }
    } catch (err: any) {
        console.log('Please check your credentials!');

    }
}


function displayContestsTable(contests: ContestObject[]): void {
    console.log(contests);
    // console.table(contests,['event','start','end','href'])
}
