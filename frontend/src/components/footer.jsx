import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            background: '#1a1a1a',
            color: '#ffffff',
            padding: '3rem 2rem',
            marginTop: '4rem',
            fontFamily: "'Poppins', 'Inter', sans-serif"
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                maxWidth: '1200px',
                margin: '0 auto',
                gap: '4rem',
                flexWrap: 'wrap'
            }}>
               
                {/* Bagian Tengah - About Me */}
                <div style={{ flex: '2', minWidth: '300px' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>About Us</h3>
                    <p style={{ 
                        lineHeight: '1.6', 
                        color: '#cccccc',
                        marginBottom: '1rem',
                        fontSize: '0.95rem'
                    }}>
                        Selamat datang di Bike Shop kami! Kami menyediakan sepeda berkualitas tinggi dengan harga terjangkau. 
                        Platform ini dirancang untuk memberikan pengalaman belanja online yang mudah dan menyenangkan. 
                        Nikmati koleksi lengkap sepeda kami dan temukan pilihan yang sempurna untuk Anda.
                    </p>
                </div>

                {/* Bagian Kanan - Developer Info */}
                <div style={{ flex: '1', minWidth: '300px', textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' , textAlign:'center'}}>Developer</h3>
                    <p style={{ marginBottom: '0.5rem', color: '#cccccc' }}>
                        <strong>Farid Radityo</strong>
                    </p>
                    <p style={{ marginBottom: '1rem', color: '#999999' }}>
                        <a href="mailto:faridradityo486@gmail.com" style={{
                            color: '#E4405F',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }} onMouseOver={(e) => e.target.style.color = '#ff6b7a'} onMouseOut={(e) => e.target.style.color = '#E4405F'}>
                            faridradityo486@gmail.com
                        </a>
                    </p>
                   
                </div>
            </div>

            {/* Divider */}
            <div style={{
                borderTop: '1px solid #333333',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                textAlign: 'center',
                color: '#666666',
                fontSize: '0.85rem'
            }}>
                <p style={{ color: '#666666', fontSize: '0.85rem' }}>
                        © 2026 Bike Shop. All rights reserved.
                    </p>
            </div>
        </footer>
    );
};

export default Footer;
