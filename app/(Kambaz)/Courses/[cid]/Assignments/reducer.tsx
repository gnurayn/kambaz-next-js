import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";

/* eslint-disable @typescript-eslint/no-explicit-any */
const initialState = {
    assignments: assignments,
};

const generateNextAssignmentId = (assignments: any[], courseId: string) => {

    const courseAssignments = assignments.filter(a => a.course === courseId);

    if (courseAssignments.length === 0) return "A101";

    const lastId = courseAssignments[courseAssignments.length - 1]._id;

    const match = lastId.match(/^(A\d+?)(\d+)$/);
    if (!match) return "A101";

    const prefix = match[1];
    const number = parseInt(match[2], 10);

    const nextNumber = number + 1;
    return `${prefix}${String(nextNumber).padStart(2, "0")}`;
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
            const newId = generateNextAssignmentId(state.assignments, assignment.course);
            const newAssignment = { ...assignment, _id: newId };
            state.assignments = [...state.assignments, newAssignment] as any;
        },

        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a
            ) as any;
        },

        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (assignment: any) => assignment._id !== assignmentId
            );
        },
    },
});
export const { addAssignment, updateAssignment, deleteAssignment } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;