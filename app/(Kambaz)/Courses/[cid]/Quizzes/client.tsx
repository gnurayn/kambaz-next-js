import axios from "axios";

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

export const createQuizForCourse = async (courseId: string, quiz: any) => {
    const response = await axiosWithToken.post(`${HTTP_SERVER}/api/courses/${courseId}/quizzes`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithToken.delete(`${HTTP_SERVER}/api/quizzes/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axiosWithToken.put(`${HTTP_SERVER}/api/quizzes/${quiz._id}`, quiz);
    return response.data;
};