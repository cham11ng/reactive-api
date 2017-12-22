import Session from '../utils/Session';
import axiosInstance from './axiosService';
import * as HttpStatus from 'http-status-codes';

export function login(info) {
  return axiosInstance.post('login', info).then(response => {
    if (response.status === HttpStatus.CREATED) {
      Session.push('isAuthenticated', true);
      Session.push('accessToken', response.data.data['accessToken']);
      Session.push('refreshToken', response.data.data['refreshToken']);
      return true;
    }
    return false;
  }).catch(error => error);
}

export function register(info) {
  return axiosInstance.post('register', info).then(response => {
    if (response.status === HttpStatus.CREATED) {
      Session.push('isAuthenticated', true);
      Session.push('accessToken', response.data.data['accessToken']);
      Session.push('refreshToken', response.data.data['refreshToken']);
      return true;
    }
    return false;
  }).catch(error => error);
}
