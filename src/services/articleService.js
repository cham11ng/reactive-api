import * as HttpStatus from 'http-status-codes/index';
import axiosInstance, { getTokenHeader } from './axiosService';

export function fetchAll() {
  return axiosInstance.get('posts', {
    headers: getTokenHeader('accessToken')
  }).then(response => response.status === HttpStatus.OK ? response.data : false).catch(error => error);
}

export function add(article) {
  return axiosInstance.post('posts', {
    title: article.title,
    body: article.body,
    tags: [],
    userId: 1
  }, {
    headers: getTokenHeader('accessToken')
  }).then(response => response.status === HttpStatus.CREATED ? response.data : false).catch(error => error);
}

export function edit(article) {
  return axiosInstance.put(`posts/${article.id}`, {
    title: article.title,
    body: article.body,
    tags: []
  }, {
    headers: getTokenHeader('accessToken')
  }).then(response => response.status === HttpStatus.OK ? response.data : false).catch(error => error);
}

export function remove(id) {
  return axiosInstance.delete(`posts/${id}`, {
    headers: getTokenHeader('accessToken')
  }).then(response => response.status === HttpStatus.NO_CONTENT).catch(error => error);
}
