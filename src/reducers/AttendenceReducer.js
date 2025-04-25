const initialState = {
    "Attendence_data": [],
    "loading": false,
    "single": null,
    "message": "",
    "islogin": "",
};

const AttendenceReducer = (state = initialState, action) => {
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
        case "STORE_ATTENDENCE_DATA_SINGLE":
        return {
            ...state,
            Attendence_data: action.payload.data
        };
        default:
            return state;
    }
};

export default AttendenceReducer;