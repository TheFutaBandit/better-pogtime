import axios from "axios";
import { BACKEND_URL } from './config';

const USERNAME = () => `futo-${Math.random()}`;

export async function userAuthDetails() : Promise<{
    token: String
}> {
    const user = USERNAME();

    await axios.post(`${BACKEND_URL}/auth/sign-up`, {
        username: user,
        password: "correct-password"
    });

    const response = await axios.post(`${BACKEND_URL}/auth/sign-in`, {
        username: user,
        password: "correct-password"
    });

    return {
        token: response.data.token
    };
}

export async function websiteDetails() : Promise<{
    website_id: String,
    token: String
}> {
    let data = await userAuthDetails();
    let token = data.token;

    const website_response = await axios.post(`${BACKEND_URL}/website`, {
        url: "https://www.google.com"
    }, {
        headers: {
            Authorization: `${token}`
        }
    })

    return {
        website_id: website_response.data.id,
        token
    };
}