import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../auth/authContext.jsx';
import MainLayout from '../layout/MainLayout.jsx';

// Pages
import Home from '../pages/home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import BikeList from '../pages/bikeDetail.jsx';
import BikeDetailPage from '../pages/BikeDetailPage.jsx';
import AddBike from '../pages/addBike.jsx';
import EditBike from '../pages/editBike.jsx';
import UserProfile from '../pages/userProfile.jsx';

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Routes dengan MainLayout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/bikes" element={<BikeList />} />
                        <Route path="/bikes/:id" element={<BikeDetailPage />} />
                        <Route path="/add-bike" element={<AddBike />} />
                        <Route path="/edit-bike/:id" element={<EditBike />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
