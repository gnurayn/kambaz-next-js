import { createSlice } from "@reduxjs/toolkit";

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
            // Remove the line that loads from enrollmentsData.json
            // The enrollments will be loaded via API in fetchEnrollments
        },

        enrollCourse: (state, { payload: courseId }: { payload: string }) => {

            if (!state.enrolledCourses.includes(courseId)) {
                state.enrolledCourses.push(courseId);
            }
        },

        unenrollCourse: (state, { payload: courseId }: { payload: string }) => {

            state.enrolledCourses = state.enrolledCourses.filter((c) => c !== courseId);

        },
    },
});

export const { setUser, enrollCourse, unenrollCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;