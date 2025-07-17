import {describe, expect, test, it, beforeAll} from 'bun:test'
import axios, {AxiosError} from 'axios';
import { userAuthDetails, websiteDetails } from './testUtils';

const BACKEND_URL  = 'http://localhost:3001/api/v1';
const USERNAME = () => `futo-${Math.random()}`;

describe("Website Create Endpoints", () => {
    let token: String;

    beforeAll(async () => {
        let data = await userAuthDetails();
        token = data.token;
    })

    test("Website cannot be created with invalid body", async () => {
        console.log(token);
        try {
            const response = await axios.post(`${BACKEND_URL}/website`, {
                ulr: "adfadsfasdf"
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })

            expect(true, "control should not reach here").toBe(false);
        } catch (e) {
            if(axios.isAxiosError(e)) {
                expect(e.status).toBe(403);
            }
            else {
                throw e;
            }
        }
    })

    test("Website cannot be created with invalid authorization", async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/website`, {
                url: "adfadsfasdf"
            }, {
                headers: {
                    Authorization: `adsfadsf`
                }
            })

            expect(true, "control should not reach here").toBe(false);
        } catch (e) {
            if(axios.isAxiosError(e)) {
                expect(e.status).toBe(401);
            }
            else {
                throw e;
            }
        }
    })
    
    test("Website can be created with valid credentials", async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/website`, {
                url: "www.google.com"
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })

            expect(response.status).toBe(200);
            expect(response.data.id).toBeDefined();
        } catch (e) {
            throw e;
        }
    })
})

describe("Website Status Get Endpoints", () => {
    let website_id: String;
    let token : String;

    beforeAll(async () => {
        let data = await websiteDetails();
        token = data.token;
        website_id = data.website_id;
    })

    test("Website can be obtained with valid credentials", async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/website/status/${website_id}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            expect(response.status).toBe(200);
            expect(response.data.website_response).toBeDefined();
        } catch (e) {
            throw e;
        }
    })


})

