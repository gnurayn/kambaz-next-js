import { createSlice } from "@reduxjs/toolkit";
import enrollmentsData from "../Database/enrollments.json";

interface EnrollmentState {
    enrolledCourses: string[];
    userId?: string;
}

const initialState: EnrollmentState = {
    enrolledCourses: [],
    userId: undefined,
};

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
        setUser: (state, { payload: userId }: { payload: string }) => {
            state.userId = userId;

            state.enrolledCourses = enrollmentsData
                .filter((e) => e.user === userId)
                .map((e) => e.course);
        },

        enrollCourse: (state, { payload: courseId }: { payload: string }) => {
            if (state.userId && !state.enrolledCourses.includes(courseId)) {
                state.enrolledCourses.push(courseId);

                enrollmentsData.push({
                    _id: String(enrollmentsData.length + 1),
                    user: state.userId,
                    course: courseId,
                });
            }
        },

        unenrollCourse: (state, { payload: courseId }: { payload: string }) => {
            if (state.userId) {
                state.enrolledCourses = state.enrolledCourses.filter((c) => c !== courseId);

                const index = enrollmentsData.findIndex(
                    (e) => e.user === state.userId && e.course === courseId
                );
                if (index !== -1) enrollmentsData.splice(index, 1);
            }
        },
    },
});

export const { setUser, enrollCourse, unenrollCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
