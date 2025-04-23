import axios from "axios";
import { BASE_URL } from "../constants/constant";

export const getAttendenceDataForCalendar = (student_id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "START" });

            const response = await axios.post(`${BASE_URL}attendence/getattendencedataforcalendar/${student_id}`, {
                student_id                
            });

            if (response.status === 200 && response.data.status) {
                dispatch({
                    type: "STORE_ATTENDENCE_DATA_SINGLE",
                    payload: { student_id, data: response.data.Attendence_data }
                });
            }
        } catch (error) {
            console.error("Error fetching student attendance:", error);
        } finally {
            dispatch({ type: "END" });
        }
    };
};