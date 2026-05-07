import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';

const MainLayout = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <Navbar />
            
            <main style={{
                flex: 1,
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                padding: '2rem'
            }}>
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default MainLayout;