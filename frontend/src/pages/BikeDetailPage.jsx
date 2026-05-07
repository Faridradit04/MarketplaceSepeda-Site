import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext.jsx';
import api from '../api/index.jsx';
import Button from '../components/button.jsx';

const BikeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuth();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadBikeDetail();
    }, [id]);

    const loadBikeDetail = async () => {
        try {
            setLoading(true);
            setError('');
            console.log(`Loading bike detail for ID: ${id}`);
            
            // API call dengan JOIN ke user data
            const response = await api.get(`/bikes/${id}`);
            console.log('Bike detail response:', response.data);
            
            const bikeData = response.data.data;
            setBike(bikeData);
        } catch (err) {
            console.error('Error loading bike:', err);
            setError('Gagal memuat detail sepeda');
        } finally {
            setLoading(false);
        }
    };

    const handleContactSeller = () => {
        if (!bike?.User?.phone_number) {
            alert('Nomor telepon penjual tidak tersedia');
            return;
        }

        // Format phone number untuk WhatsApp
        let phone = bike.User.phone_number;
        const formattedPhone = phone.startsWith("0") ? "62" + phone.slice(1) : phone;
        const message = `Halo, saya tertarik dengan sepeda "${bike.name}" dengan harga Rp ${bike.price?.toLocaleString('id-ID')}. Apakah masih tersedia?`;
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    };

    const handleDelete = async () => {
        if (!isLoggedIn || bike?.userId !== user?.id) {
            alert('Anda hanya bisa menghapus sepeda milik Anda');
            return;
        }

        if (confirm('Yakin ingin menghapus sepeda ini?')) {
            try {
                await api.delete(`/bikes/${id}`);
                alert('Sepeda berhasil dihapus');
                navigate('/bikes');
            } catch (err) {
                alert('Gagal menghapus sepeda');
                console.error('Error:', err);
            }
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <p style={{ fontSize: '1.2rem', color: '#6B7280' }}>Memuat detail sepeda...</p>
            </div>
        );
    }

    if (error || !bike) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{
                    background: '#FEE2E2',
                    color: '#DC2626',
                    padding: '2rem',
                    borderRadius: '0.75rem',
                    maxWidth: '500px',
                    margin: '0 auto'
                }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                        {error || 'Sepeda tidak ditemukan'}
                    </p>
                    <Button
                        text="Kembali ke Daftar"
                        onClick={() => navigate('/bikes')}
                        variant="primary"
                    />
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate('/bikes')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#3B82F6',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        textDecoration: 'underline',
                        marginBottom: '1rem'
                    }}
                >
                    ← Kembali ke Daftar
                </button>
            </div>

            {/* Main Content */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '3rem'
            }}>
                {/* Image Section */}
                <div style={{
                    background: '#F3F4F6',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    height: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {bike.image ? (
                        <img
                            src={bike.image}
                            alt={bike.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <div style={{ fontSize: '5rem', color: '#D1D5DB' }}>
                            🚲
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#1F2937',
                        marginBottom: '1rem'
                    }}>
                        {bike.name}
                    </h1>

                    {/* Price */}
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#DC2626',
                        marginBottom: '2rem'
                    }}>
                        Rp {bike.price?.toLocaleString('id-ID') || '0'}
                    </div>

                    {/* Info Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        {bike.brand && (
                            <div style={{
                                background: '#F3F4F6',
                                padding: '1rem',
                                borderRadius: '0.5rem'
                            }}>
                                <p style={{ color: '#6B7280', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                    Brand
                                </p>
                                <p style={{ color: '#1F2937', fontWeight: '600' }}>
                                    {bike.brand}
                                </p>
                            </div>
                        )}
                        {bike.type && (
                            <div style={{
                                background: '#F3F4F6',
                                padding: '1rem',
                                borderRadius: '0.5rem'
                            }}>
                                <p style={{ color: '#6B7280', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                    Tipe
                                </p>
                                <p style={{ color: '#1F2937', fontWeight: '600' }}>
                                    {bike.type}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {bike.description && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#1F2937',
                                marginBottom: '0.75rem'
                            }}>
                                Deskripsi
                            </h3>
                            <p style={{
                                color: '#6B7280',
                                lineHeight: '1.6',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {bike.description}
                            </p>
                        </div>
                    )}

                    {/* Seller Info */}
                    {bike.User && (
                        <div style={{
                            background: '#F0F9FF',
                            border: '1px solid #E0F2FE',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            marginBottom: '2rem'
                        }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#1F2937',
                                marginBottom: '0.75rem'
                            }}>
                                Informasi Penjual
                            </h3>
                            <p style={{ color: '#6B7280', marginBottom: '0.5rem' }}>
                                <strong>Nama:</strong> {bike.User.name}
                            </p>
                            <p style={{ color: '#6B7280' }}>
                                <strong>Email:</strong> {bike.User.email}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flexDirection: 'column'
                    }}>
                        {/* Contact Seller Button */}
                        <button
                            onClick={handleContactSeller}
                            style={{
                                background: '#10B981',
                                color: 'white',
                                padding: '1rem 2rem',
                                fontSize: '1.05rem',
                                fontWeight: '600',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = '#059669';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = '#10B981';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                             Hubungi Penjual via WhatsApp
                        </button>

                        {/* Edit Button (only for owner) */}
                        {isLoggedIn && bike.userId === user?.id && (
                            <Button
                                text="Edit Sepeda"
                                onClick={() => navigate(`/edit-bike/${bike.id}`)}
                                variant="secondary"
                                style={{ width: '100%' }}
                            />
                        )}

                        {/* Delete Button (only for owner) */}
                        {isLoggedIn && bike.userId === user?.id && (
                            <Button
                                text="Hapus Sepeda"
                                onClick={handleDelete}
                                variant="danger"
                                style={{ width: '100%' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BikeDetailPage;
