"use client"
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

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

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithToken.get(`${HTTP_SERVER}/api/courses/${courseId}/quizzes`);
    return response.data;
};

export const findQuizById = async (quizId: string) => {
    const response = await axiosWithToken.get(`${HTTP_SERVER}/api/quizzes/${quizId}`);
    return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
    const response = await axiosWithToken.post(`${HTTP_SERVER}/api/courses/${courseId}/quizzes`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithToken.delete(`${HTTP_SERVER}/api/quizzes/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quizId: string, updates: any) => {
    const response = await axiosWithToken.put(`${HTTP_SERVER}/api/quizzes/${quizId}`, updates);
    return response.data;
};

export const submitQuizAttempt = async (quizId: string, answers: Record<number, string>) => {
    const response = await axiosWithToken.post(`${HTTP_SERVER}/api/quizzes/${quizId}/attempts`, { answers });
    return response.data;
};

export const getLatestAttempt = async (quizId: string) => {
    try {
        const response = await axiosWithToken.get(`${HTTP_SERVER}/api/quizzes/${quizId}/attempts/latest`);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
};

export const getStudentAttempts = async (quizId: string) => {
    const response = await axiosWithToken.get(`${HTTP_SERVER}/api/quizzes/${quizId}/attempts`);
    return response.data;
};