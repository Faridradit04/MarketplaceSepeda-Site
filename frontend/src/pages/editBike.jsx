import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/authContext.jsx';
import api from '../api/index.jsx';
import Button from '../components/button.jsx';

const EditBike = () => {
    const { id } = useParams();
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
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    // Proteksi: hanya user yang login bisa mengakses halaman ini
    if (!isLoggedIn) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#FEE2E2',
                borderRadius: '0.75rem',
                color: '#DC2626'
            }}>
                <p>Anda harus login untuk mengubah sepeda!</p>
                <Button
                    text="Kembali ke Login"
                    onClick={() => navigate('/login')}
                    variant="primary"
                    style={{ marginTop: '1rem' }}
                />
            </div>
        );
    }

    useEffect(() => {
        loadBike();
    }, [id]);

    const loadBike = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/bikes/${id}`);
            const bike = response.data.data;
            setFormData({
                name: bike.name,
                brand: bike.brand,
                type: bike.type,
                price: bike.price,
                description: bike.description || '',
                image: bike.image || ''
            });
        } catch (err) {
            setError('Gagal memuat data sepeda');
            console.error('Error loading bike:', err);
        } finally {
            setLoading(false);
        }
    };

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
        setSubmitting(true);

        try {
            await api.put(`/bikes/${id}`, formData);
            setSuccess('Sepeda berhasil diperbarui!');
            setTimeout(() => navigate('/bikes'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal memperbarui sepeda');
            console.error('Error updating bike:', err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ fontSize: '1.2rem', color: '#6B7280' }}>Memuat data sepeda...</p>
            </div>
        );
    }

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
                 Ubah Sepeda
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
                    />
                </div>

                <div style={{
                    display: 'flex',
                    gap: '1rem'
                }}>
                    <Button
                        text={submitting ? "Menyimpan..." : " Simpan"}
                        type="submit"
                        disabled={submitting}
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

export default EditBike;
