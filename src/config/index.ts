require('dotenv').config();
export const byBit = {
  apiKey: process.env.BYBIT_API_KEY || '',
  baseURL: process.env.BYBIT_BASE_URL || '',
  secret: process.env.BYBIT_SECRET || ''
};
