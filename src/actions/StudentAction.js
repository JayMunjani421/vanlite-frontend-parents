import axios from "axios";
import { BASE_URL } from "../constants/constant";


export const getStudentData = (student_id) => {
    return (dispatch) => {
        dispatch({ type: "START" });
        axios.get(`${BASE_URL}student/viewsingledata/${student_id}`,)
            .then((response) => {
                if (response.status === 200) {
                    const json = response.data["Student_data"];
                    dispatch({ type: "STORE_STUDENT_SINGLE", "payload": { "data": json[0] } });
                    console.log("Data : ",response.data);
                }
            })
            .catch((error) => {
                dispatch({ type: "END" });
            });
    };
};

export const loginStudent = (params, navigate) => {
    return (dispatch) => {
        console.log("Login params:", params);
        axios.post(`${BASE_URL}student/loginstudent`, params)
            .then((response) => {
                console.log("Login response:", response);
                if (response.status == 200) {
                    var json = response.data;
                    if (json["status"] == true) {
                        var message = json["message"];
                        alert(message);
                        sessionStorage.setItem("studentlogin", true);
                        sessionStorage.setItem("token", json["access_token"]);
                        dispatch({ "type": "LOGIN", "payload": { "data": json["data"].student || [] } });
                        console.log(sessionStorage.getItem("token"));
                        navigate("/attendencecalendar");
                    } else {
                        var message = json["message"];
                        alert(message);
                    }
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
    };
};