import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/authContext.jsx';

const Navbar = () => {

    const { isLoggedIn, Logout } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {

        await Logout();

        navigate('/');
    };

    const isMenuActive = (path) => {

        if (path === '/') {
            return location.pathname === '/';
        }

        return location.pathname.includes(path);
    };

    return (

        <nav
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                padding: '1rem 2rem',
                background: '#F5F5F5',

                // FONT
                fontFamily: "'Poppins', 'Inter', sans-serif"
            }}
        >

            {/* CONTAINER */}
            <div
                style={{
                    maxWidth: '1300px',
                    margin: '0 auto',

                    background: 'white',
                    borderRadius: '20px',

                    padding: '1rem 2rem',

                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    boxShadow:
                        '0 10px 30px rgba(0,0,0,0.08)',

                    border: '1px solid #ECECEC'
                }}
            >

                {/* LEFT */}
                <div>

                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            color: 'black',
                            letterSpacing: '-0.5px',

                            fontFamily:
                                "'Poppins', 'Inter', sans-serif"
                        }}
                    >
                        MarkBike
                    </Link>

                </div>

                {/* CENTER MENU */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',

                        background: '#FAFAFA',

                        padding: '0.5rem',

                        borderRadius: '20px'
                    }}
                >

                    {/* HOME */}
                    <Link
                        to="/"

                        style={{
                            textDecoration: 'none',

                            padding: '0.8rem 1.5rem',

                            borderRadius: '14px',

                            fontWeight: '600',

                            transition: '0.3s',

                            background:
                                isMenuActive('/')
                                    ? '#b9f593'
                                    : 'transparent',

                            color: 'black',

                            boxShadow:
                                isMenuActive('/')
                                    ? '0 4px 10px rgba(185,245,147,0.5)'
                                    : 'none',

                            fontFamily:
                                "'Poppins', 'Inter', sans-serif"
                        }}
                    >
                        Home
                    </Link>

                    {/* MARKETPLACE */}
                    <Link
                        to="/bikes"

                        style={{
                            textDecoration: 'none',

                            padding: '0.8rem 1.5rem',

                            borderRadius: '14px',

                            fontWeight: '600',

                            transition: '0.3s',

                            background:
                                isMenuActive('/bikes')
                                    ? '#b9f593'
                                    : 'transparent',

                            color: 'black',

                            boxShadow:
                                isMenuActive('/bikes')
                                    ? '0 4px 10px rgba(185,245,147,0.5)'
                                    : 'none',

                            fontFamily:
                                "'Poppins', 'Inter', sans-serif"
                        }}
                    >
                        Marketplace
                    </Link>

                </div>

                {/* RIGHT */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >

                    {isLoggedIn ? (

                        <>

                            {/* PROFILE */}
                            <Link
                                to="/profile"

                                style={{
                                    textDecoration: 'none',

                                    padding: '0.8rem 1.5rem',

                                    borderRadius: '14px',

                                    fontWeight: '600',

                                    color: 'black',

                                    transition: '0.3s',

                                    background:
                                        location.pathname === '/profile'
                                            ? '#b9f593'
                                            : '#F3F4F6',

                                    fontFamily:
                                        "'Poppins', 'Inter', sans-serif"
                                }}
                            >
                                Profile
                            </Link>

                            {/* LOGOUT */}
                            <button
                                onClick={handleLogout}

                                style={{
                                    border: 'none',

                                    padding: '0.8rem 1.5rem',

                                    borderRadius: '14px',

                                    fontWeight: '600',

                                    cursor: 'pointer',

                                    background: 'black',

                                    color: 'white',

                                    transition: '0.3s',

                                    fontFamily:
                                        "'Poppins', 'Inter', sans-serif"
                                }}

                                onMouseOver={(e) => {
                                    e.target.style.opacity = '0.85';
                                }}

                                onMouseOut={(e) => {
                                    e.target.style.opacity = '1';
                                }}
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            {/* LOGIN */}
                            <Link
                                to="/login"

                                style={{
                                    textDecoration: 'none',

                                    padding: '0.8rem 1.5rem',

                                    borderRadius: '14px',

                                    fontWeight: '600',

                                    color: 'black',

                                    background: '#F3F4F6',

                                    transition: '0.3s',

                                    fontFamily:
                                        "'Poppins', 'Inter', sans-serif"
                                }}
                            >
                                Login
                            </Link>

                            {/* SIGNUP */}
                            <Link
                                to="/register"

                                style={{
                                    textDecoration: 'none',

                                    padding: '0.8rem 1.5rem',

                                    borderRadius: '14px',

                                    fontWeight: '700',

                                    color: 'black',

                                    background: '#b9f593',

                                    boxShadow:
                                        '0 4px 10px rgba(185,245,147,0.5)',

                                    transition: '0.3s',

                                    fontFamily:
                                        "'Poppins', 'Inter', sans-serif"
                                }}
                            >
                                Sign Up
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;