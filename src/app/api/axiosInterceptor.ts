
'use client'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { logout } from '../services/auth-service';

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/json',
  }
});

axiosInterceptorInstance.interceptors.request.use(
  async (config) => {

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    const session: any = await getSession();

    const accessToken = getCookie('access_token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error?.response?.status === 401) {
      toast.error('Not Authorized')
      logout()
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;