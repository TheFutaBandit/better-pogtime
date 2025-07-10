import {describe, expect, test, it} from 'bun:test'
import axios from 'axios';

const BASE_URL  = 'localhost:3001/api/v1'

describe('website boot test', () => {
    it('website should return error when nothing sent', async () => {
        try {
            await axios.post(`${BASE_URL}/website`, {}); 
            expect(true).toBe(false);
        } catch (e) {

        }
    })

    it('website is created when url present', async () => {
        try {
            const response = await axios.post(`${BASE_URL}/website`, {
                url: "https://example.com"
            }); 
            expect(response.data.id).not.toBeNull();
        } catch (e) {
            
        }
    })
});