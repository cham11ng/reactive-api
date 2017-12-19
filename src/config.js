import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import Session from './utils/Session';

let axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000
});

export function getTokenHeader(type) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Session.fetch(type)}`
    }
  };
}

// Add a request interceptor
axiosInstance.interceptors.request.use(config => config, (error => Promise.reject(error)));

// Add a response interceptor
axiosInstance.interceptors.response.use(response => response, (error => {
  if (error.response.status === HttpStatus.UNAUTHORIZED) {
    axiosInstance.post('token', {}, getTokenHeader('refreshToken')).then(response => {
      if (response.status === HttpStatus.OK) {
        Session.push('accessToken', response.data['accessToken']);
      }
    }).catch(error => error);
  }
  return Promise.reject(error);
}));

export default axiosInstance;
