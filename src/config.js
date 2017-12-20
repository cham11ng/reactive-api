import axios from 'axios';
import Session from './utils/Session';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000
});

export function getTokenHeader(type) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Session.fetch(type)}`
  };
}
