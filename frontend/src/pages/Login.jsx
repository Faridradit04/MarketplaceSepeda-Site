import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/authContext.jsx';
import Button from '../components/button.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/bikes');
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal. Silakan coba lagi.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '2rem auto',
            padding: '2rem',
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                textAlign: 'center',
                color: '#1F2937'
            }}>
                 Login
            </h1>

            {error && (
                <div style={{
                    background: '#FEE2E2',
                    color: '#DC2626',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="masukkan email Anda"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="masukkan password Anda"
                    />
                </div>

                <Button
                    text={loading ? "Sedang Login..." : "Login"}
                    type="submit"
                    disabled={loading}
                    variant="primary"
                    style={{ width: '100%', marginBottom: '1rem' }}
                />
            </form>

            <p style={{
                textAlign: 'center',
                color: '#6B7280',
                marginBottom: '0.5rem'
            }}>
                Belum punya akun?{' '}
                <Link to="/register" style={{
                    color: '#DC2626',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    Daftar di sini
                </Link>
            </p>
        </div>
    );
};

export default Login;
