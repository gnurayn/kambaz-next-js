"use client"
import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

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

export const fetchAllCourses = async () => {
    const { data } = await axiosWithToken.get(COURSES_API);
    return data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithToken.get(`${USERS_API}/current/courses`);
    return data;
};

export const createCourse = async (course: any) => {
    const { data } = await axiosWithToken.post(`${USERS_API}/current/courses`, course);
    return data;
};

export const deleteCourse = async (id: string) => {
    const { data } = await axiosWithToken.delete(`${COURSES_API}/${id}`);
    return data;
};

export const updateCourse = async (course: any) => {
    const { data } = await axiosWithToken.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithToken.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axiosWithToken.post(`${COURSES_API}/${courseId}/modules`, module);
    return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
    const response = await axiosWithToken.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
    return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
    const { data } = await axiosWithToken.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
    return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axiosWithToken.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
    const response = await axiosWithToken.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
}

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axiosWithToken.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};

export const updateAssignment = async (assignment: any) => {
    const { data } = await axiosWithToken.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
    const { data } = await axiosWithToken.get(`${USERS_API}/${userId}/enrollments`);
    return data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithToken.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithToken.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
    const response = await axiosWithToken.get(`${COURSES_API}/${courseId}/users`);
    return response.data;
};