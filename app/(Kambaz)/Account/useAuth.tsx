"use client";
import { useSelector } from "react-redux";

export const useAuth = () => {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    return {
        user: currentUser,
        isAuthenticated: !!currentUser,
        canEditCourse: currentUser ? ['FACULTY', 'ADMIN'].includes(currentUser.role) : false,
        isFaculty: currentUser?.role === 'FACULTY',
        isStudent: currentUser?.role === 'STUDENT',
        isAdmin: currentUser?.role === 'ADMIN',
    };
};