import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext.jsx';
import api from '../api/index.jsx';
import ProductCard from '../components/productCard.jsx';
import Button from '../components/button.jsx';

const BikeList = () => {

    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // CATEGORY FILTER
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const navigate = useNavigate();

    const { isLoggedIn, user } = useAuth();

    useEffect(() => {
        loadBikes();
    }, []);

    const loadBikes = async () => {

        try {

            setLoading(true);

            const response = await api.get('/bikes?limit=1000');

            setBikes(response.data.data || []);

        } catch (err) {

            setError('Gagal memuat data sepeda');

            console.error('Error loading bikes:', err);

        } finally {

            setLoading(false);
        }
    };

    // DELETE
    const handleDelete = async (bikeId) => {

        if (confirm('Yakin ingin menghapus sepeda ini?')) {

            try {

                await api.delete(`/bikes/${bikeId}`);

                setBikes(
                    bikes.filter(bike => bike.id !== bikeId)
                );

                alert('Sepeda berhasil dihapus');

            } catch (err) {

                alert('Gagal menghapus sepeda');

                console.error(err);
            }
        }
    };

    // CATEGORY
    const categories = [
        'Semua',
        ...new Set(
            bikes
                .map(bike => bike.type)
                .filter(Boolean)
        )
    ];

    // FILTER
    const filteredBikes = bikes.filter((bike) => {

        const matchSearch =
            bike.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
            ||
            bike.brand
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchCategory =
            selectedCategory === 'Semua'
            ||
            bike.type === selectedCategory;

        return matchSearch && matchCategory;
    });

    // LOADING
    if (loading) {

        return (

            <div
                style={{
                    textAlign: 'center',
                    padding: '2rem',
                    fontFamily: "'Poppins', 'Inter', sans-serif"
                }}
            >
                Memuat data sepeda...
            </div>

        );
    }

    return (

        <div
            style={{
                fontFamily: "'Poppins', 'Inter', sans-serif"
            }}
        >

            {/* HEADER */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >

                <h1
                    style={{
                        fontSize: '2.2rem',
                        fontWeight: '700',
                        color: '#111827',
                        margin: 0
                    }}
                >
                    Daftar Sepeda
                </h1>

                {isLoggedIn && (

                    <Button
                        text="Jual Sepeda"
                        onClick={() => navigate('/add-bike')}
                        variant="success"
                    />

                )}

            </div>

            {/* SEARCH */}
            <div
                style={{
                    marginBottom: '2rem'
                }}
            >

                <input
                    type="text"
                    placeholder="Cari sepeda..."
                    value={searchTerm}

                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }

                    style={{
                        width: '100%',
                        padding: '1rem 1.2rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        boxSizing: 'border-box',
                        outline: 'none',

                        fontFamily:
                            "'Poppins', 'Inter', sans-serif",

                        transition: '0.3s',

                        boxShadow:
                            '0 4px 10px rgba(0,0,0,0.03)'
                    }}
                />

            </div>

            {/* ERROR */}
            {error && (

                <div
                    style={{
                        background: '#FEE2E2',
                        color: '#DC2626',
                        padding: '1rem',
                        borderRadius: '1rem',
                        marginBottom: '2rem',
                        fontWeight: '500'
                    }}
                >
                    {error}
                </div>

            )}

            {/* MAIN LAYOUT */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '260px 1fr',
                    gap: '2rem',
                    alignItems: 'start'
                }}
            >

                {/* SIDEBAR */}
                <div
                    style={{
                        background: 'white',
                        borderRadius: '1.5rem',
                        padding: '1.5rem',

                        boxShadow:
                            '0 10px 30px rgba(0,0,0,0.06)',

                        border:
                            '1px solid #F3F4F6',

                        position: 'sticky',
                        top: '1rem'
                    }}
                >

                    <h2
                        style={{
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            marginBottom: '1.5rem',
                            color: '#111827'
                        }}
                    >
                        Category
                    </h2>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem'
                        }}
                    >

                        {categories.map((category, index) => (

                            <button
                                key={index}

                                onClick={() =>
                                    setSelectedCategory(category)
                                }

                                style={{
                                    padding: '1rem',

                                    border: 'none',

                                    borderRadius: '1rem',

                                    cursor: 'pointer',

                                    transition: '0.3s',

                                    textAlign: 'left',

                                    fontWeight: '600',

                                    fontSize: '0.95rem',

                                    fontFamily:
                                        "'Poppins', 'Inter', sans-serif",

                                    background:
                                        selectedCategory === category
                                            ? '#b9f593'
                                            : '#F9FAFB',

                                    color:
                                        selectedCategory === category
                                            ? '#111827'
                                            : '#374151',

                                    boxShadow:
                                        selectedCategory === category
                                            ? '0 6px 14px rgba(185,245,147,0.45)'
                                            : 'none'
                                }}

                                onMouseOver={(e) => {

                                    if (
                                        selectedCategory !== category
                                    ) {

                                        e.target.style.background =
                                            '#F3F4F6';
                                    }
                                }}

                                onMouseOut={(e) => {

                                    if (
                                        selectedCategory !== category
                                    ) {

                                        e.target.style.background =
                                            '#F9FAFB';
                                    }
                                }}
                            >
                                 {category}
                            </button>

                        ))}

                    </div>

                </div>

                {/* CONTENT */}
                <div>

                    {/* TOTAL */}
                    <p
                        style={{
                            color: '#6B7280',
                            marginBottom: '1.5rem',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}
                    >
                        Total sepeda:
                        <strong>
                            {' '}
                            {filteredBikes.length}
                        </strong>
                    </p>

                    {/* EMPTY */}
                    {filteredBikes.length === 0 ? (

                        <div
                            style={{
                                textAlign: 'center',
                                padding: '4rem',
                                background: '#F9FAFB',
                                borderRadius: '1.5rem',
                                color: '#6B7280',
                                fontSize: '1.1rem',

                                boxShadow:
                                    '0 8px 20px rgba(0,0,0,0.04)'
                            }}
                        >
                            Tidak ada sepeda ditemukan
                        </div>

                    ) : (

                        <div
                            style={{
                                display: 'grid',

                                gridTemplateColumns:
                                    'repeat(auto-fill, minmax(280px, 1fr))',

                                gap: '2rem'
                            }}
                        >

                            {filteredBikes.map((bike) => (

                                <ProductCard
                                    key={bike.id}
                                    bike={bike}

                                    onEdit={(b) =>
                                        navigate(`/edit-bike/${b.id}`)
                                    }

                                    onDelete={handleDelete}

                                    isLoggedIn={isLoggedIn}

                                    isOwner={
                                        user?.id === bike.userId
                                    }
                                />

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default BikeList;