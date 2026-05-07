import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/index.jsx';
import Button from '../components/button.jsx';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Password tidak cocok!');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', { name, email, password });
            setSuccess('Registrasi berhasil! Silakan login.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
            console.error('Register error:', err);
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
                 Daftar
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

            {success && (
                <div style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                }}>
                    {success}
                </div>
            )}

            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        Nama
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="masukkan nama Anda"
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
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

                <div style={{ marginBottom: '1rem' }}>
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
                        placeholder="masukkan password"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        Konfirmasi Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="konfirmasi password"
                    />
                </div>

                <Button
                    text={loading ? "Sedang Mendaftar..." : "Daftar"}
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
                Sudah punya akun?{' '}
                <Link to="/login" style={{
                    color: '#DC2626',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    Login di sini
                </Link>
            </p>
        </div>
    );
};

export default Register;
