import axios from 'axios';
import { ALPHA_VANTAGE_API_KEY } from '../config/env';

const client = axios.create({
  baseURL: 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo',
  timeout: 15000,
});

client.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    apikey: ALPHA_VANTAGE_API_KEY,
  };
  return config;
});

export default client;
