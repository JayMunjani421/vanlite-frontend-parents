import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isLoggedIn = sessionStorage.getItem("studentlogin");
    if (!isLoggedIn) {
        alert("Please login first!");
        return <Navigate to="/studentlogin" />;
    }
    return <Outlet />;  // Renders nested routes
};

export default PrivateRoute;
