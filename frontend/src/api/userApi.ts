import api from './axios';

export const loadProfile = () => api.get('/user-profile');