import axios from 'axios';
import Session from '../utils/Session';
import * as HttpStatus from 'http-status-codes/index';

let axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000
});

export function getTokenHeader(type) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Session.fetch(type)}`
  };
}

axiosInstance.interceptors.response.use(response => response, (error => {
  if (error.response.status === HttpStatus.UNAUTHORIZED) {
    return axiosInstance.post('token', {}, {
      headers: getTokenHeader('refreshToken')
    }).then(response => {
      if (response.status === HttpStatus.OK) {
        let config = {...error.config};
        Session.push('accessToken', response.data['accessToken']);
        config.headers = getTokenHeader('accessToken');
        return axiosInstance.request(config).then(response => response).catch(error => error);
      }
    }).catch(error => error);
  }
  return Promise.reject(error);
}));

export default axiosInstance;
