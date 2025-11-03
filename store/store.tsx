import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../app/(Kambaz)/Courses/reducer";
import modulesReducer from "../app/(Kambaz)/Courses/[cid]/Modules/reducer";
import accountReducer from "../app/(Kambaz)/Account/reducer";
import assignmentsReducer from "../app/(Kambaz)/Courses/[cid]/Assignments/reducer";
import enrollmentReducer from "../app/(Kambaz)/Account/enrollmentReducer";
const store = configureStore({
    reducer: { coursesReducer, modulesReducer, accountReducer, assignmentsReducer, enrollmentReducer },
});
export default store;