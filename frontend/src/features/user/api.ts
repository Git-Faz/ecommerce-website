import api from '@/app/axios';

export const loadProfile = () => api.get('/user-profile');