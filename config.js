// config.js
import dotenv from 'dotenv';

dotenv.config();

export const apiUrl = process.env.API_URL;
export const apiKey = process.env.API_KEY;
export const client_id = process.env.CLIENT_ID;