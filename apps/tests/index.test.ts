import {describe, expect, test, it} from 'bun:test'
import axios, {AxiosError} from 'axios';

const BACKEND_URL  = 'http://localhost:3001/api/v1';
const USERNAME = () => `futo-${Math.random()}`;

describe("Auth Endpoints", () => {
    test("user shouldn't be able to sign up with incorrect body", async () => {
        console.log(USERNAME());
        console.log(USERNAME());
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/sign-up`, {
                usrname: USERNAME(),
                password: "futo"
            })

            expect(false, "control shouldn't be reaching here - user shouldn't be able to sign up with incorrect body").toBe(true);
        } catch (e) {
            expect(true);
        }
    });

    test("user shouldn't be able to sign up twice with the same username", async () => {
        const user1 = USERNAME();
        const user2 = user1;
        try {
            const response1 = await axios.post(`${BACKEND_URL}/auth/sign-up`, {
                username: user1,
                password: "futo"
            })

            const response2 = await axios.post(`${BACKEND_URL}/auth/sign-up`, {
                username: user2,
                password: "futo"
            })

            expect(false, "control shouldn't be reaching here - user shouldn't be able to sign up with incorrect body").toBe(true);
        } catch (e) {
            expect(true);
        }
    });

    test("user should be able to sign up with correct credentials", async () => {
        const user1 = USERNAME();

        try {
            const response1 = await axios.post(`${BACKEND_URL}/auth/sign-up`, {
                username: user1,
                password: "futo"
            })

            expect(response1.status).toBe(200);
            expect(response1.data.id).toBeDefined();
        } catch (e) {
            expect(false, "control shouldn't be reaching here - user should be able to sign up with correct credentials").toBe(true);
        }
    });
})

describe("Auth Sign-In Endpoints", () => {

    test("user shouldn't be able to sign in with incorrect body", async () => {
        const user = USERNAME();
        try {
            await axios.post(`${BACKEND_URL}/auth/sign-in`, {
                usrname: "someuser" + user, // Typo in key
                password: "futo"
            });

            expect(false).toBe(true); // Should not reach here
        } catch (e) {
            if (axios.isAxiosError(e)) {
                expect(e.response?.status).toBe(403);
                expect(e.response?.data.message).toBe("Invalid Input");
            } else {
                throw e;
            }
        }
    });

    test("user shouldn't be able to sign in with a non-existent username", async () => {
        const user = USERNAME();
        
        try {
            await axios.post(`${BACKEND_URL}/auth/sign-in`, {
                username: "non-existent-user" + user,
                password: "somepassword"
            });

            expect(false).toBe(true); // Should not reach here
        } catch (e) {
            if (axios.isAxiosError(e)) {
                expect(e.response?.status).toBe(403);
                expect(e.response?.data.message).toBe("username not valid");
            } else {
                throw e;
            }
        }
    });

    test("user shouldn't be able to sign in with incorrect password", async () => {
        const user = USERNAME();

        // First sign up the user
        await axios.post(`${BACKEND_URL}/auth/sign-up`, {
            username: user,
            password: "correct-password"
        });

        try {
            await axios.post(`${BACKEND_URL}/auth/sign-in`, {
                username: user,
                password: "wrong-password"
            });

            expect(false).toBe(true); // Should not reach here
        } catch (e) {
            if (axios.isAxiosError(e)) {
                expect(e.response?.status).toBe(403);
                expect(e.response?.data.message).toBe("invalid password");
            } else {
                throw e;
            }
        }
    });

    test("user should be able to sign in with correct credentials", async () => {
        const user = USERNAME();

        // First sign up the user
        await axios.post(`${BACKEND_URL}/auth/sign-up`, {
            username: user,
            password: "correct-password"
        });

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/sign-in`, {
                username: user,
                password: "correct-password"
            });

            expect(response.status).toBe(200);
            expect(response.data.token).toBeDefined();
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error("Unexpected error:", e.response?.data);
                expect(false).toBe(true); // Should not fail on valid input
            } else {
                throw e;
            }
        }
    });

});

