import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext.jsx';
import tokoSepedaImg from '../assets/tokosepeda.jpg'; 
const Home = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleScroll = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

 
    const colors = {
        primary: '#10B981',      
        primaryDark: '#059669',  
        secondary: '#0EA5E9',    
        accent: '#8B5CF6',       
        light: '#F0F9FF',        
        text: '#1F2937',        
        textGray: '#6B7280',    
    };

    const buttonStyle = (variant = 'primary') => ({
        padding: '12px 28px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: '"Poppins", sans-serif',
        ...({
            primary: {
                background: colors.primary,
                color: 'white',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                ':hover': { background: colors.primaryDark, transform: 'translateY(-2px)' }
            },
            secondary: {
                background: colors.secondary,
                color: 'white',
                boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
                ':hover': { background: '#0284C7', transform: 'translateY(-2px)' }
            },
            outline: {
                background: 'transparent',
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
                ':hover': { background: `${colors.primary}15`, transform: 'translateY(-2px)' }
            }
        }[variant])
    });

    return (
        <div style={{ fontFamily: '"Poppins", "Inter", sans-serif' }}>
            {/* ==================== HERO SECTION ==================== */}
            <section 
                id="hero"
                style={{
                    minHeight: '80vh',
                    background: `linear-gradient(135deg, ${colors.light} 0%, #FFFFFF 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '60px 20px',
                    paddingTop: '120px',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s ease-out'
                }}
            >
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '60px',
                    alignItems: 'center'
                }}>
                    {/* Kiri - Gambar */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        animation: isVisible ? 'slideInLeft 0.8s ease-out' : 'none'
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '400px'
                        }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '1',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(16, 185, 129, 0.2)',
                                transition: 'all 0.4s ease',
                                cursor: 'pointer',
                                transform: 'scale(1)',
                                ':hover': {
                                    transform: 'scale(1.05) translateY(-10px)',
                                    boxShadow: '0 30px 80px rgba(16, 185, 129, 0.3)'
                                }
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05) translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 30px 80px rgba(16, 185, 129, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.2)';
                            }}>
                                <img 
                                    src={tokoSepedaImg} 
                                    alt="TokoSepeda"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x400?text=TokoSepeda';
                                    }}
                                />
                            </div>
                            {/* Floating Badge */}
                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                right: '20px',
                                background: colors.primary,
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '50px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                                animation: 'float 3s ease-in-out infinite'
                            }}>
                                ✓ Trusted Marketplace
                            </div>
                        </div>
                    </div>

                    {/* Kanan - Content */}
                    <div style={{
                        animation: isVisible ? 'slideInRight 0.8s ease-out' : 'none'
                    }}>
                        {/* Heading Utama */}
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: '800',
                            color: colors.text,
                            marginBottom: '20px',
                            lineHeight: '1.2'
                        }}>
                            Selamat Datang di <span style={{ color: colors.primary }}>TokoSepeda</span>
                        </h1>

                        {/* Subheading */}
                        <p style={{
                            fontSize: '1.1rem',
                            color: colors.textGray,
                            marginBottom: '30px',
                            lineHeight: '1.8',
                            maxWidth: '500px'
                        }}>
                            Marketplace sepeda terbaik untuk jual dan beli sepeda dengan mudah, cepat, dan aman. 
                            Bergabunglah dengan ribuan pembeli dan penjual sepeda di Indonesia.
                        </p>

                        {/* CTA Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            marginBottom: '40px',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={() => navigate('/login')}
                                style={buttonStyle('primary')}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = `0 6px 20px rgba(16, 185, 129, 0.4)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = `0 4px 15px rgba(16, 185, 129, 0.3)`;
                                }}
                            >
                                 Login
                            </button>

                            <button
                                onClick={() => navigate(isLoggedIn ? '/add-bike' : '/register')}
                                style={buttonStyle('secondary')}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = `0 6px 20px rgba(14, 165, 233, 0.4)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = `0 4px 15px rgba(14, 165, 233, 0.3)`;
                                }}
                            >
                                Daftarkan Sepedamu
                            </button>

                            <button
                                onClick={() => handleScroll('layanan')}
                                style={buttonStyle('outline')}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = `0 4px 15px rgba(16, 185, 129, 0.2)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                Jelajahi Produk
                            </button>
                        </div>

                        {/* Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '20px',
                            paddingTop: '20px',
                            borderTop: `1px solid ${colors.textGray}30`
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '800',
                                    color: colors.primary
                                }}>10K+</div>
                                <div style={{ color: colors.textGray, fontSize: '0.9rem' }}>
                                    Produk Aktif
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '800',
                                    color: colors.secondary
                                }}>5K+</div>
                                <div style={{ color: colors.textGray, fontSize: '0.9rem' }}>
                                    Penjual Terpercaya
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '800',
                                    color: colors.accent
                                }}>50K+</div>
                                <div style={{ color: colors.textGray, fontSize: '0.9rem' }}>
                                    Transaksi Aman
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== LAYANAN SECTION ==================== */}
            <section 
                id="layanan"
                style={{
                    padding: '80px 20px',
                    background: '#FFFFFF'
                }}
            >
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {/* Header */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '60px'
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            fontWeight: '800',
                            color: colors.text,
                            marginBottom: '15px'
                        }}>
                            Layanan Kami
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: colors.textGray,
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Kami menyediakan berbagai layanan untuk memudahkan Anda dalam jual dan beli sepeda
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {[
                            {
                                title: 'Jual Sepeda',
                                description: 'Pasarkan sepedamu dengan mudah kepada ribuan pembeli potensial. Proses yang cepat dan aman.'
                            },
                            {
                                title: 'Beli Sepeda',
                                description: 'Temukan berbagai pilihan sepeda berkualitas dari penjual terpercaya dengan harga kompetitif.'
                            },
                            {
                                title: 'Servis & Perawatan',
                                description: 'Layanan profesional untuk servis dan perawatan sepedamu dari teknisi berpengalaman.'
                            }
                        ].map((service, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: '#FFFFFF',
                                    padding: '40px',
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    transform: 'translateY(0)',
                                    ':hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 40px rgba(16, 185, 129, 0.15)'
                                    }
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = `0 12px 40px rgba(16, 185, 129, 0.15)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                                }}
                            >
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '20px'
                                }}>
                                    {service.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: '700',
                                    color: colors.text,
                                    marginBottom: '10px'
                                }}>
                                    {service.title}
                                </h3>
                                <p style={{
                                    color: colors.textGray,
                                    lineHeight: '1.6'
                                }}>
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== KEUNGGULAN SECTION ==================== */}
            <section 
                id="keunggulan"
                style={{
                    padding: '80px 20px',
                    background: colors.light
                }}
            >
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {/* Header */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '60px'
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                            fontWeight: '800',
                            color: colors.text,
                            marginBottom: '15px'
                        }}>
                            Kenapa Pilih TokoSepeda?
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: colors.textGray,
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Keunggulan platform kami yang membuat TokoSepeda pilihan terbaik Anda
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '40px'
                    }}>
                        {[
                            {
                                title: 'Transaksi Aman',
                                description: 'Sistem keamanan berlapis untuk melindungi setiap transaksi Anda'
                            },
                            {
                                title: 'Banyak Pilihan',
                                description: 'Ribuan produk sepeda berkualitas dari berbagai merek ternama'
                            },
                            {
                                title: 'Harga Kompetitif',
                                description: 'Harga terbaik dengan kualitas terjamin dan paling ekonomis'
                            },
                            {
                                title: 'Mudah Digunakan',
                                description: 'Interface yang user-friendly dan intuitif untuk semua kalangan'
                            },
                            {
                                title: 'Proses Cepat',
                                description: 'Transaksi dan pengiriman yang cepat tanpa penundaan'
                            },
                            {
                                title: 'Support 24/7',
                                description: 'Tim customer service siap membantu Anda kapan saja'
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    gap: '20px',
                                    alignItems: 'flex-start',
                                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                                }}
                            >
                                <div style={{
                                    fontSize: '2.5rem',
                                    flexShrink: 0
                                }}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        color: colors.text,
                                        marginBottom: '8px'
                                    }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{
                                        color: colors.textGray,
                                        lineHeight: '1.6'
                                    }}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA SECTION ==================== */}
            <section 
                style={{
                    padding: '80px 20px',
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        fontWeight: '800',
                        marginBottom: '20px',
                        lineHeight: '1.3'
                    }}>
                        Mulai Jual atau Beli Sepedamu Sekarang!
                    </h2>

                    <p style={{
                        fontSize: '1.1rem',
                        marginBottom: '40px',
                        lineHeight: '1.6',
                        opacity: 0.95
                    }}>
                        Bergabunglah dengan komunitas TokoSepeda dan rasakan pengalaman berbelanja yang berbeda. 
                        Aman, terpercaya, dan mudah!
                    </p>

                    <button
                        onClick={() => navigate(isLoggedIn ? '/bikes' : '/register')}
                        style={{
                            padding: '16px 40px',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            background: 'white',
                            color: colors.primary,
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                            transform: 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05) translateY(-2px)';
                            e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        Mulai Sekarang
                    </button>
                </div>
            </section>

            {/* ==================== CSS ANIMATIONS ==================== */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;600;700&display=swap');

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                html {
                    scroll-behavior: smooth;
                }

                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Poppins', 'Inter', sans-serif;
                }

                * {
                    box-sizing: border-box;
                }

                @media (max-width: 768px) {
                   
                    button {
                        padding: 10px 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;
