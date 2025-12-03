"use client"
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

const axiosWithToken = axios.create();

axiosWithToken.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const findAllUsers = async () => {
    const response = await axiosWithToken.get(USERS_API);
    return response.data;
};

export const signin = async (credentials: any) => {
    const response = await axios.post(`${USERS_API}/signin`, credentials);
    return response.data;
};

export const signup = async (user: any) => {
    const response = await axios.post(`${USERS_API}/signup`, user);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axiosWithToken.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithToken.get(`${USERS_API}/profile`);
    return response.data;
};

export const signout = async () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    }
    return { message: "Signed out" };
};

export const findUsersByRole = async (role: string) => {
    const response = await axiosWithToken.get(`${USERS_API}?role=${role}`);
    return response.data;
};

export const findUsersByPartialName = async (name: string) => {
    const response = await axiosWithToken.get(`${USERS_API}?name=${name}`);
    return response.data;
};

export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await axiosWithToken.delete(`${USERS_API}/${userId}`);
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await axiosWithToken.post(`${USERS_API}`, user);
    return response.data;
};