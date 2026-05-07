import React, { createContext, useState, useEffect } from 'react';
import api from '../api/index.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);    
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedAccessToken = localStorage.getItem('accessToken');
        
        console.log('AuthContext init - storedUser:', storedUser, 'storedToken:', !!storedAccessToken);
        
        if (storedUser && storedAccessToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log('Parsed user:', parsedUser);
                setUser(parsedUser);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { accessToken, user: userData } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify({ 
                id: userData?.id, 
                email: userData?.email || email, 
                name: userData?.name || email,
                phone_number: userData?.phone_number || ''
            }));
            setUser({ 
                id: userData?.id, 
                email: userData?.email || email, 
                name: userData?.name || email,
                phone_number: userData?.phone_number || ''
            });
            setIsLoggedIn(true);
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const Logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, Logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth harus digunakan dalam AuthProvider');
    }
    return context;
};