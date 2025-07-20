import {describe, expect, test, it, beforeAll} from 'bun:test'
import axios, {AxiosError} from 'axios';
import { userAuthDetails, websiteDetails } from './testUtils';
import { BACKEND_URL } from './config';

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
                url: "https://www.google.com"
            }, {
                headers: {
                    Authorization: `${token}`
                }
            })

            expect(response.status).toBe(200);
            expect(response.data.id).toBeDefined();
        } catch (e) {
            throw e;
            // console.log(token);
        }
    })
})

describe("Website Status Get Endpoints", () => {
    let website_id: String;
    let token : String;
    let otherUserToken: String;

    beforeAll(async () => {
        let data = await websiteDetails();
        token = data.token;
        website_id = data.website_id;

        let otherUserData = await userAuthDetails(); // Assuming this creates a new user and returns their token
        otherUserToken = otherUserData.token;
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
            console.log(response.data.website_response);
        } catch (e) {
            throw e;
        }
    })

    test("Website cannot be obtained with unauthorized credentials", async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/website/status/${website_id}`, {
                headers: {
                    Authorization: 'adsfasdfasdf'
                }
            });
            expect(false, "control should not be reaching here").toBe(true);
        } catch (e) {
            if(axios.isAxiosError(e)) {
                expect(e.status).toBe(401);
            }
            else throw e;
        }
    })

    test("Website cannot be obtained with invalid website id", async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/website/status/${'adfadfadsf'}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            expect(false, "control should not be reaching here").toBe(true);
        } catch (e) {
            if(axios.isAxiosError(e)) {
                expect(e.status).toBe(403);
            }
            else throw e;
        }
    })

    test("One user cannot get the website of another user", async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/website/status/${website_id}`, {
                headers: {
                    Authorization: `${otherUserToken}`
                }
            });
            expect(false, "control should not be reaching here").toBe(true);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                expect(e.response?.status).toBe(403); // Forbidden
            } else {
                throw e;
            }
        }
    });
})

