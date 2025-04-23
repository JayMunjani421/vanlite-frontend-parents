// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Container, Card, Button, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction"; // Import action
// import { getStudentDataByBus } from "../../actions/StudentAction";
// import { jwtDecode } from "jwt-decode";

// const localizer = momentLocalizer(moment);

// const AttendenceCalendar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const attendenceData = useSelector((state) => state.attendence.Attendence_data);

//     const token = sessionStorage.getItem("token");

//     let studentId = null;
//     if (token) {
//         const decoded = jwtDecode(token);
//         studentId = decoded.student_id;
//     }

//     const [events, setEvents] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [selectedAttendance, setSelectedAttendance] = useState([]);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         if (studentId) {
//             dispatch(getAttendenceDataForCalendar(studentId));
//             dispatch(getStudentDataByBus(studentId));
//         }
//     }, [dispatch, studentId]);

//     useEffect(() => {
//         if (attendenceData && attendenceData.length > 0) {
//             // Format and sort data
//             const formattedEvents = attendenceData
//                 .sort((a, b) => moment(a.attendence_time, "hh:mm:ss A") - moment(b.attendence_time, "hh:mm:ss A"))
//                 .map((entry) => {
//                     const arrowSymbol = entry.destination === "Home To School" ? "➡" : "⬅"; // Symbols
//                     return {
//                         title: `${arrowSymbol} ${entry.attendence_time} ${entry.type}`,
//                         start: moment(entry.attendence_date, "DD-MM-YYYY").toDate(),
//                         end: moment(entry.attendence_date, "DD-MM-YYYY").toDate(),
//                         type: entry.type,
//                         fullDate: entry.attendence_date, // Store date for filtering
//                         rawData: entry, // Store full entry
//                     };
//                 });

//             setEvents(formattedEvents);
//         }
//     }, [attendenceData]);

//     // Handle clicking on a date box
//     const handleDateClick = (date) => {
//         const formattedDate = moment(date).format("DD-MM-YYYY"); // Format selected date
//         const filteredAttendance = attendenceData.filter((entry) => entry.attendence_date === formattedDate);

//         setSelectedDate(formattedDate);
//         setSelectedAttendance(filteredAttendance);
//         setShowModal(true);
//     };

//     // Close modal
//     const handleClose = () => setShowModal(false);

//     // Function to get background color based on type
//     const getBackgroundColor = (type) => {
//         if (type === "IN") return "yellow";
//         if (type === "OUT") return "green";
//         if (type === "ABSENT") return "red";
//         return "white";
//     };

//     // Custom event component for better display
//     const CustomEvent = ({ event }) => {
//         return (
//             <div style={{
//                 ...customEventStyle,
//                 backgroundColor: getBackgroundColor(event.type),
//                 border: "1px solid black",
//                 marginBottom: "5px",
//             }}>
//                 {event.title.split("\n").map((line, index) => (
//                     <div key={index}>{line}</div>
//                 ))}
//             </div>
//         );
//     };

//     // Styles
//     const styles = {
//         calendarContainer: {
//             height: "1200px",
//             marginTop: "20px",
//         },
//     };

//     const customEventStyle = {
//         color: "black",
//         padding: "6px",
//         borderRadius: "6px",
//         fontSize: "11.5px",
//         fontWeight: "bold",
//         whiteSpace: "pre-wrap",
//         wordWrap: "break-word",
//         textAlign: "center",
//     };

//     const handleLogout = () => {
//         sessionStorage.removeItem("attendanceStatus");
//         sessionStorage.removeItem("studentlogin");
//         sessionStorage.removeItem("token");
//         dispatch({ type: "LOGOUT" });
//         alert("Logout Successfully...");
//         navigate("/studentlogin");
//     };

//     const logoutTooltip = (props) => <Tooltip {...props}>Logout</Tooltip>;

//     return (
//         <main id="main" className="main">
//             <Container className="py-5">
//                 <Card className="p-4 shadow">
//                     {/* Title with Legend */}
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                         {/* Header with Student Name and ID */}
//                         <h3 className="text-center">

//                             Student Attendence Calendar
//                         </h3>

//                         {/* Legend Section */}
//                         <div style={{
//                             backgroundColor: "lightgrey",
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "flex-start",
//                             border: "2px solid black",
//                             padding: "8px",
//                             borderRadius: "5px",
//                             fontSize: "14px",
//                             fontWeight: "bold"
//                         }}>
//                             <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
//                                 <span style={{ border: "2px solid black", padding: "5px", marginRight: "8px", backgroundColor: "white" }}>➡</span>
//                                 Home To School
//                             </div>
//                             <div style={{ display: "flex", alignItems: "center" }}>
//                                 <span style={{ border: "2px solid black", padding: "5px", marginRight: "8px", backgroundColor: "white" }}>⬅</span>
//                                 School To Home
//                             </div>
//                         </div>
//                     </div>

//                     {/* Calendar Component */}
//                     <div style={styles.calendarContainer}>
//                         <Calendar
//                             localizer={localizer}
//                             events={events}
//                             startAccessor="start"
//                             endAccessor="end"
//                             views={["month"]}
//                             defaultView="month"
//                             selectable={true} // Enable date selection
//                             onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)} // Open popup when clicking on a date
//                             onSelectEvent={(event) => handleDateClick(event.start)}
//                             components={{ event: CustomEvent }} // Use custom event component
//                         />
//                     </div>
//                 </Card>
//             </Container>

//             {/* Popup Modal for Attendance Details */}
//             <Modal show={showModal} onHide={handleClose} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Attendance Details ({selectedDate})</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedAttendance.length > 0 ? (
//                         selectedAttendance.map((record, index) => (
//                             <p key={index}>
//                                 {record.destination} - {record.attendence_time} - {record.type}
//                             </p>
//                         ))
//                     ) : (
//                         <p>No attendance records for this date.</p>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//             {/* Floating Back Button */}
//             {/* <OverlayTrigger placement="top" overlay={logoutTooltip}>
//                 <Button
//                     style={{
//                         position: "fixed",   // Keep it fixed on the screen
//                         bottom: "20px",      // Position it 20px from the bottom of the screen
//                         right: "20px",       // Position it 20px from the right of the screen
//                         width: "60px",       // Set the width of the button
//                         height: "60px",      // Set the height of the button
//                         borderRadius: "50%", // Circular button
//                         color: "white",      // White text color
//                         border: "none",      // Remove button border
//                         boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
//                         fontSize: "1.5rem",  // Font size
//                         display: "flex",     // Flexbox for centering content
//                         justifyContent: "center", // Center content horizontally
//                         alignItems: "center", // Center content vertically
//                         cursor: "pointer",   // Pointer cursor on hover
//                         backgroundColor: "#dc3545", // Red background color
//                         zIndex: 9999,        // Ensure the button stays on top of other elements
//                     }}
//                     onClick={handleLogout}
//                 >
//                     <i className="bi bi-box-arrow-right"></i>
//                 </Button>
//             </OverlayTrigger> */}
//             <OverlayTrigger placement="top" overlay={logoutTooltip}>
//                 <Button
//                     style={{
//                         position: "fixed",   // Keep it fixed on the screen
//                         bottom: "20px",      // Position it 20px from the bottom of the screen
//                         right: "20px",       // Position it 20px from the right of the screen
//                         width: "60px",       // Set the width of the button
//                         height: "60px",      // Set the height of the button
//                         borderRadius: "50%", // Circular button
//                         color: "white",      // White text color
//                         border: "none",      // Remove button border
//                         boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
//                         fontSize: "1.5rem",  // Font size
//                         display: "flex",     // Flexbox for centering content
//                         justifyContent: "center", // Center content horizontally
//                         alignItems: "center", // Center content vertically
//                         cursor: "pointer",   // Pointer cursor on hover
//                         backgroundColor: "#dc3545", // Red background color
//                         zIndex: 9999,        // Ensure it stays on top of other elements
//                     }}
//                     onClick={handleLogout}
//                 >
//                     <i className="bi bi-box-arrow-right"></i>
//                 </Button>
//             </OverlayTrigger>




//             {/* CSS Fix for Transparent Events */}
//             <style>
//                 {`
//                 .rbc-event {
//                     background-color: transparent !important;
//                     border: none !important;
//                 }
//                 .rbc-selected {
//                     background-color: transparent !important;
//                 }
//                 `}
//             </style>
//         </main >
//     );
// };

// export default AttendenceCalendar;


import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Card, Button, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAttendenceDataForCalendar } from "../../actions/AttendenceAction"; // Import action
import { getStudentData } from "../../actions/StudentAction";
import { jwtDecode } from "jwt-decode";

const localizer = momentLocalizer(moment);

const AttendenceCalendar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { single } = useSelector(state => state.student);
    const attendenceData = useSelector((state) => state.attendence.Attendence_data);
    // const studentData = useSelector((single) => single.student.Student_data); // Accessing student data

    const token = sessionStorage.getItem("token");

    let studentId = null;
    if (token) {
        const decoded = jwtDecode(token);
        studentId = decoded.student_id;
    }

    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAttendance, setSelectedAttendance] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (studentId) {
            dispatch(getAttendenceDataForCalendar(studentId));
            dispatch(getStudentData(studentId));
        }
    }, [dispatch, studentId]);

    useEffect(() => {
        if (attendenceData && attendenceData.length > 0) {
            // Format and sort data
            const formattedEvents = attendenceData
                .sort((a, b) => moment(a.attendence_time, "hh:mm:ss A") - moment(b.attendence_time, "hh:mm:ss A"))
                .map((entry) => {
                    const arrowSymbol = entry.destination === "Home To School" ? "➡" : "⬅"; // Symbols
                    return {
                        title: `${arrowSymbol} ${entry.attendence_time} ${entry.type}`,
                        start: moment(entry.attendence_date, "DD-MM-YYYY").toDate(),
                        end: moment(entry.attendence_date, "DD-MM-YYYY").toDate(),
                        type: entry.type,
                        fullDate: entry.attendence_date, // Store date for filtering
                        rawData: entry, // Store full entry
                    };
                });

            setEvents(formattedEvents);
        }
    }, [attendenceData]);

    // Handle clicking on a date box
    const handleDateClick = (date) => {
        const formattedDate = moment(date).format("DD-MM-YYYY"); // Format selected date
        const filteredAttendance = attendenceData.filter((entry) => entry.attendence_date === formattedDate);

        setSelectedDate(formattedDate);
        setSelectedAttendance(filteredAttendance);
        setShowModal(true);
    };

    // Close modal
    const handleClose = () => setShowModal(false);

    // Function to get background color based on type
    const getBackgroundColor = (type) => {
        if (type === "IN") return "yellow";
        if (type === "OUT") return "green";
        if (type === "ABSENT") return "red";
        return "white";
    };

    // Custom event component for better display
    const CustomEvent = ({ event }) => {
        return (
            <div style={{
                ...customEventStyle,
                backgroundColor: getBackgroundColor(event.type),
                border: "1px solid black",
                marginBottom: "5px",
            }}>
                {event.title.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
        );
    };

    // Styles
    const styles = {
        calendarContainer: {
            height: "1200px",
            marginTop: "20px",
        },
    };

    const customEventStyle = {
        color: "black",
        padding: "6px",
        borderRadius: "6px",
        fontSize: "11.5px",
        fontWeight: "bold",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        textAlign: "center",
    };

    const handleLogout = () => {
        sessionStorage.removeItem("attendanceStatus");
        sessionStorage.removeItem("studentlogin");
        sessionStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        alert("Logout Successfully...");
        navigate("/studentlogin");
    };

    const logoutTooltip = (props) => <Tooltip {...props}>Logout</Tooltip>;

    return (
        <main id="main" className="main">
            <Container className="py-5">
                <Card className="p-4 shadow">
                    {/* Title with Legend */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* Header with Student Name and ID */}
                        {/* <h3 className="text-center">
                            {studentData[0]?.student_name || "No name available"}
                        </h3> */}
                        <h3 className="text-center">
                            {single.student_name}
                        </h3>


                        {/* Legend Section */}
                        <div style={{
                            backgroundColor: "lightgrey",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            border: "2px solid black",
                            padding: "8px",
                            borderRadius: "5px",
                            fontSize: "14px",
                            fontWeight: "bold"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                <span style={{ border: "2px solid black", padding: "5px", marginRight: "8px", backgroundColor: "white" }}>➡</span>
                                Home To School
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span style={{ border: "2px solid black", padding: "5px", marginRight: "8px", backgroundColor: "white" }}>⬅</span>
                                School To Home
                            </div>
                        </div>
                    </div>

                    {/* Calendar Component */}
                    <div style={styles.calendarContainer}>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            views={["month"]}
                            defaultView="month"
                            selectable={true} // Enable date selection
                            onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)} // Open popup when clicking on a date
                            onSelectEvent={(event) => handleDateClick(event.start)}
                            components={{ event: CustomEvent }} // Use custom event component
                        />
                    </div>
                </Card>
            </Container>

            {/* Popup Modal for Attendance Details */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Attendance Details ({selectedDate})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAttendance.length > 0 ? (
                        selectedAttendance.map((record, index) => (
                            <p key={index}>
                                {record.destination} - {record.attendence_time} - {record.type}
                            </p>
                        ))
                    ) : (
                        <p>No attendance records for this date.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <OverlayTrigger placement="top" overlay={logoutTooltip}>
                <Button
                    style={{
                        position: "fixed",   // Keep it fixed on the screen
                        bottom: "20px",      // Position it 20px from the bottom of the screen
                        right: "20px",       // Position it 20px from the right of the screen
                        width: "60px",       // Set the width of the button
                        height: "60px",      // Set the height of the button
                        borderRadius: "50%", // Circular button
                        color: "white",      // White text color
                        border: "none",      // Remove button border
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
                        fontSize: "1.5rem",  // Font size
                        display: "flex",     // Flexbox for centering content
                        justifyContent: "center", // Center content horizontally
                        alignItems: "center", // Center content vertically
                        cursor: "pointer",   // Pointer cursor on hover
                        backgroundColor: "#dc3545", // Red background color
                        zIndex: 9999,        // Ensure it stays on top of other elements
                    }}
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right"></i>
                </Button>
            </OverlayTrigger>

            {/* CSS Fix for Transparent Events */}
            <style>
                {`
                .rbc-event {
                    background-color: transparent !important;
                    border: none !important;
                }
                .rbc-selected {
                    background-color: transparent !important;
                }
                `}
            </style>
        </main>
    );
};

export default AttendenceCalendar;
