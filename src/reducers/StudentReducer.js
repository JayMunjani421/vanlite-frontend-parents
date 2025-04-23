const initialState = {
    "Student_data": [],
    "loading": false,
    "single": null,
    "message": "",
    "islogin": "",
};

const StudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "START":
            return {
                ...state,
                "loading": true
            };
        case "END":
            return {
                ...state,
                "loading": false
            };
        case "STORE_STUDENT_DATA":
            return {
                ...state,
                "Student_data": action.payload.data,
                "loading": false
            };
        case "SHOW_STUDENT_MESSAGE":
            return {
                ...state,
                "message": action.payload.message,
            };
        case "STORE_STUDENT_SINGLE":
            return {
                ...state,
                "single": action.payload.data,
                "loading": false
            };
        case "LOGIN":
            return {
                ...state,
                "islogin": true,
                "Student_data": action.payload.data
            };
        case "LOGOUT":
            return {
                ...state,
                "islogin": false,
                "Student_data": null
            };
        default:
            return state;
    }
};

export default StudentReducer;