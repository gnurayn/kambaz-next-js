import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentReducer from "./Account/enrollmentReducer";
const store = configureStore({
    reducer: { coursesReducer, modulesReducer, accountReducer, assignmentsReducer, enrollmentReducer },
});
export default store;