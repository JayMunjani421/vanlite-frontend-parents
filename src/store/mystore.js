import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import StudentReducer from "../reducers/StudentReducer";
import AttendenceReducer from "../reducers/AttendenceReducer";


const rootReducer = combineReducers({
    "student": StudentReducer,
    "attendence": AttendenceReducer,
});

const mystore = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default mystore;
