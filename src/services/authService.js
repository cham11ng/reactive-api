import Session from '../utils/Session';
import axiosInstance from './axiosService';
import * as HttpStatus from 'http-status-codes';

export function login() {
  return axiosInstance.post('login', {
    email: 'sgr.raee@gmail.com',
    password: 'secret'
  }).then(response => {
    if (response.status === HttpStatus.CREATED) {
      Session.push('accessToken', response.data['accessToken']);
      Session.push('refreshToken', response.data['refreshToken']);
      return true;
    }
    return false;
  }).catch(error => error);
}
