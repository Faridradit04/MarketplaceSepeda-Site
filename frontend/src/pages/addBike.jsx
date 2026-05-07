import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext.jsx';
import api from '../api/index.jsx';
import Button from '../components/button.jsx';

const AddBike = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        type: '',
        price: '',
        description: '',
        image: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#FEE2E2',
                borderRadius: '0.75rem',
                color: '#DC2626'
            }}>
                <p>Anda harus login untuk menambah sepeda!</p>
                <Button
                    text="Kembali ke Login"
                    onClick={() => navigate('/login')}
                    variant="primary"
                    style={{ marginTop: '1rem' }}
                />
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await api.post('/bikes', formData);
            setSuccess('Sepeda berhasil ditambahkan!');
            setTimeout(() => navigate('/bikes'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menambah sepeda');
            console.error('Error adding bike:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
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
                color: '#1F2937'
            }}>
              Tambah Sepeda Baru
            </h1>

            {error && (
                <div style={{
                    background: '#FEE2E2',
                    color: '#DC2626',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
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
                    marginBottom: '1rem'
                }}>
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        Nama Sepeda *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Contoh: Mountain Bike Pro"
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600',
                            color: '#1F2937'
                        }}>
                            Brand *
                        </label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #D1D5DB',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                boxSizing: 'border-box'
                            }}
                            placeholder="Contoh: Trek"
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600',
                            color: '#1F2937'
                        }}>
                            Tipe *
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #D1D5DB',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                boxSizing: 'border-box'
                            }}
                        >
                            <option value="">Pilih Tipe</option>
                            <option value="Mountain Bike">Mountain Bike</option>
                            <option value="Road Bike">Road Bike</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="BMX">BMX</option>
                            <option value="City Bike">City Bike</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        Harga (Rp) *
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Contoh: 1500000"
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        Deskripsi
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            minHeight: '120px',
                            fontFamily: 'inherit'
                        }}
                        placeholder="Deskripsi detail sepeda..."
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#1F2937'
                    }}>
                        URL Gambar
                    </label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div style={{
                    display: 'flex',
                    gap: '1rem'
                }}>
                    <Button
                        text={loading ? "Menyimpan..." : "💾Simpan"}
                        type="submit"
                        disabled={loading}
                        variant="primary"
                        style={{ flex: 1 }}
                    />
                    <Button
                        text=" Batal"
                        onClick={() => navigate('/bikes')}
                        variant="secondary"
                        style={{ flex: 1 }}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddBike;
