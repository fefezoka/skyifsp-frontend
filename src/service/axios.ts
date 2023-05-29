import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3001',
});

export default api;
