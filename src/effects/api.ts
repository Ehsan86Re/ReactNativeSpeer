import { API_TOKEN } from '@env';

export async function getUserAPI(userName: string) {
    try {
        const response = await fetch(`https://api.github.com/users/${userName}`, { 
            method: 'get',
            headers: new Headers({
                'Authorization': `Bearer ${API_TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }),
        });
        const json = await response.json();

        if (json && json.id) {
            return json
        } else {
            return "User Not Found"
        }
    } catch(e) {
        return "User Not Found"
    }
};
