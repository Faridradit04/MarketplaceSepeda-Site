import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/authContext.jsx';
import api from '../api/index.jsx';
import Button from '../components/button.jsx';

const UserProfile = () => {
    const { user, isLoggedIn } = useAuth();

    const [userData, setUserData] = useState(null);
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: ''
    });

    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn && user?.id) {
            loadUserData();
        } else if (isLoggedIn && !user?.id) {
            setLoading(false);
            setError('User ID tidak tersedia. Silakan login kembali.');
        }
    }, [isLoggedIn, user?.id]);

    // =========================
    // LOAD USER PROFILE
    // =========================
    const loadUserData = async () => {
        try {
            setLoading(true);
            setError('');

            console.log('Loading profile user ID:', user?.id);

            // GET PROFILE
            const response = await api.get(`/auth/profile/${user.id}`);

            console.log('PROFILE RESPONSE:', response.data);

            const profileData = response.data.data || response.data;

            setUserData(profileData);

            // SET FORM
            setFormData({
                name: profileData?.name || '',
                email: profileData?.email || '',
                phone_number: profileData?.phone_number || ''
            });

            // AMBIL BIKES DARI RELASI
            const userBikes = profileData?.bikes || [];

            console.log('USER BIKES:', userBikes);

            setBikes(userBikes);

        } catch (err) {

            console.error(
                'ERROR LOAD PROFILE:',
                err.response?.data || err.message
            );

            // FALLBACK
            if (user) {

                setUserData(user);

                setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone_number: user?.phone_number || ''
                });

                setBikes(user?.bikes || []);

            } else {

                setError(
                    'Gagal memuat profil: ' +
                    (err.response?.data?.message || err.message)
                );
            }

        } finally {
            setLoading(false);
        }
    };

    // =========================
    // HANDLE INPUT
    // =========================
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // =========================
    // UPDATE PROFILE
    // =========================
    const handleUpdateProfile = async () => {
        try {
            setUpdateLoading(true);
            setError('');

            const response = await api.put(
                `/auth/profile/${user.id}`,
                {
                    name: formData.name,
                    email: formData.email,
                    phone_number: formData.phone_number
                }
            );

            const updatedUser = response.data.data || response.data;

            setUserData(updatedUser);

            setIsEditing(false);

            alert('Profil berhasil diperbarui!');

        } catch (err) {

            console.error(
                'UPDATE PROFILE ERROR:',
                err.response?.data || err.message
            );

            setError(
                'Gagal memperbarui profil: ' +
                (err.response?.data?.message || err.message)
            );

        } finally {
            setUpdateLoading(false);
        }
    };

    // =========================
    // NOT LOGIN
    // =========================
    if (!isLoggedIn) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#FEE2E2',
                borderRadius: '0.75rem',
                color: '#DC2626'
            }}>
                <p style={{
                    fontSize: '1.1rem',
                    marginBottom: '1rem'
                }}>
                    Anda harus login untuk melihat profil!
                </p>

                <Button
                    text="Kembali ke Home"
                    onClick={() => window.location.href = '/'}
                    variant="primary"
                />
            </div>
        );
    }

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem'
            }}>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#6B7280'
                }}>
                    Memuat profil...
                </p>
            </div>
        );
    }

    return (
        <div>

            {/* TITLE */}
            <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '2rem',
                color: '#1F2937'
            }}>
                Profil Saya
            </h1>

            {/* ERROR */}
            {error && (
                <div style={{
                    background: '#FEE2E2',
                    color: '#DC2626',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '2rem'
                }}>
                    {error}
                </div>
            )}

            {/* PROFILE CARD */}
            <div style={{
                background: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem',
                maxWidth: '600px'
            }}>

                {!isEditing ? (
                    <>
                        <div style={{
                            marginBottom: '1.5rem'
                        }}>

                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#1F2937',
                                marginBottom: '0.5rem'
                            }}>
                                {userData?.name || 'User'}
                            </h2>

                            <p style={{
                                color: '#6B7280',
                                marginBottom: '0.5rem'
                            }}>
                                {userData?.email}
                            </p>

                            <p style={{
                                color: '#6B7280'
                            }}>
                                {userData?.phone_number || 'Nomor telepon tidak tersedia'}
                            </p>
                        </div>

                        <div style={{
                            borderTop: '1px solid #E5E7EB',
                            paddingTop: '1rem'
                        }}>
                            <p style={{
                                color: '#6B7280',
                                marginBottom: '0.5rem'
                            }}>
                                <strong>Status:</strong> Member Aktif ✅
                            </p>
                        </div>

                        <button
                            onClick={() => setIsEditing(true)}
                            style={{
                                marginTop: '1.5rem',
                                padding: '0.75rem 1.5rem',
                                background: '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Edit Profil
                        </button>
                    </>
                ) : (
                    <>
                        {/* NAME */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Nama</label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '0.5rem',
                                    marginTop: '0.5rem'
                                }}
                            />
                        </div>

                        {/* EMAIL */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '0.5rem',
                                    marginTop: '0.5rem'
                                }}
                            />
                        </div>

                        {/* PHONE */}
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Nomor Telepon</label>

                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                placeholder="08xxxxxxxxxx"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '0.5rem',
                                    marginTop: '0.5rem'
                                }}
                            />
                        </div>

                        {/* BUTTON */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={handleUpdateProfile}
                                disabled={updateLoading}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#10B981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {updateLoading ? 'Menyimpan...' : 'Simpan'}
                            </button>

                            <button
                                onClick={() => setIsEditing(false)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#EF4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Batal
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* STATISTICS */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
            }}>

                {/* TOTAL BIKE */}
                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>
                        {userData?.totalBikes || bikes.length || 0}
                    </p>

                    <p>Total Sepeda</p>
                </div>

                {/* TOTAL HARGA */}
                <div style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>
                        Rp {
                            bikes.reduce(
                                (sum, bike) => sum + (bike.price || 0),
                                0
                            ).toLocaleString('id-ID')
                        }
                    </p>

                    <p>Total Harga Inventori</p>
                </div>

                {/* RATA RATA */}
                <div style={{
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>
                        Rp {
                            Math.round(
                                bikes.reduce(
                                    (sum, bike) => sum + (bike.price || 0),
                                    0
                                ) / (bikes.length || 1)
                            ).toLocaleString('id-ID')
                        }
                    </p>

                    <p>Rata-rata Harga</p>
                </div>
            </div>

            {/* RECENT BIKES */}
            <div>

                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#1F2937'
                }}>
                    Sepeda Saya
                </h2>

                {bikes.length === 0 ? (
                    <div style={{
                        background: '#F3F4F6',
                        padding: '2rem',
                        borderRadius: '0.75rem',
                        textAlign: 'center',
                        color: '#6B7280'
                    }}>
                        Belum ada sepeda
                    </div>
                ) : (
                    <div style={{
                        overflowX: 'auto'
                    }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            background: 'white',
                            borderRadius: '0.75rem',
                            overflow: 'hidden'
                        }}>
                            <thead>
                                <tr style={{
                                    background: '#F3F4F6'
                                }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>
                                        Nama
                                    </th>

                                    <th style={{ padding: '1rem', textAlign: 'left' }}>
                                        Brand
                                    </th>

                                    <th style={{ padding: '1rem', textAlign: 'left' }}>
                                        Tipe
                                    </th>

                                    <th style={{ padding: '1rem', textAlign: 'right' }}>
                                        Harga
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {bikes.map((bike) => (
                                    <tr key={bike.id}>
                                        <td style={{ padding: '1rem' }}>
                                            {bike.name}
                                        </td>

                                        <td style={{ padding: '1rem' }}>
                                            {bike.brand}
                                        </td>

                                        <td style={{ padding: '1rem' }}>
                                            {bike.type}
                                        </td>

                                        <td style={{
                                            padding: '1rem',
                                            textAlign: 'right',
                                            color: '#DC2626',
                                            fontWeight: 'bold'
                                        }}>
                                            Rp {(bike.price || 0).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;