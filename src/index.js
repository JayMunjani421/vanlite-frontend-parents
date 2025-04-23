import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './views/components/ValidationRoute';
import Dashboard from './views/Dashboard';
import mystore from './store/mystore';
import "bootstrap/dist/css/bootstrap.min.css";
import AttendenceCalendar from './views/attendence/AttendenceCalendar';
import StudentLogin from './views/student/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={mystore}>
        <BrowserRouter>
            <Routes>
                {/* Public Route */}
                <Route path="/studentlogin" element={<StudentLogin />} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/attendencecalendar" element={<AttendenceCalendar />} />
                </Route>

                {/* Redirect any unknown routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);