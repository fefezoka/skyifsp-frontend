import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? `https://skyifsp-backend.vercel.app/`
      : 'http://localhost:3001/',
});

export default api;
