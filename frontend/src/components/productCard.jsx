import React from 'react';
import Button from './button.jsx';

const ProductCard = ({
    bike,
    onEdit,
    onDelete,
    isLoggedIn,
    isOwner
}) => {

    // AMBIL NOMOR DARI RELASI USER
    const phone = bike.user?.phone_number;

    // FORMAT NOMOR INDONESIA
    const formattedPhone = phone
        ? (
            phone.startsWith("0")
                ? "62" + phone.slice(1)
                : phone
        )
        : null;

    // PESAN WHATSAPP
    const message =
        `Halo, saya tertarik dengan sepeda "${bike.name}" dengan harga Rp ${bike.price}`;

    // LINK WHATSAPP
    const whatsappUrl = formattedPhone
        ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
        : null;

    return (

        <div
            style={{
                background: 'white',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: '0.3s'
            }}

            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow =
                    '0 12px 16px rgba(0, 0, 0, 0.2)';
            }}

            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                    '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
        >

            {/* IMAGE */}
            <div
                style={{
                    background: '#F3F4F6',
                    height: '220px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >

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

                    <div
                        style={{
                            fontSize: '4rem',
                            color: '#D1D5DB'
                        }}
                    >
                        🚲
                    </div>

                )}

            </div>

            {/* CONTENT */}
            <div style={{ padding: '1rem' }}>

                {/* NAME */}
                <h3
                    style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: '#1F2937',
                        marginBottom: '0.5rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {bike.name}
                </h3>

                {/* DESCRIPTION */}
                <p
                    style={{
                        fontSize: '0.9rem',
                        color: '#6B7280',
                        marginBottom: '1rem',
                        minHeight: '45px',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {bike.description || 'Sepeda berkualitas tinggi'}
                </p>

                {/* BRAND & TYPE */}
                {(bike.brand || bike.type) && (

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                    >

                        {bike.brand && (
                            <span
                                style={{
                                    background: '#EFF6FF',
                                    color: '#2563EB',
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}
                            >
                                {bike.brand}
                            </span>
                        )}

                        {bike.type && (
                            <span
                                style={{
                                    background: '#ECFDF5',
                                    color: '#059669',
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}
                            >
                                {bike.type}
                            </span>
                        )}

                    </div>

                )}

                {/* SELLER */}
                <div
                    style={{
                        marginBottom: '1rem',
                        fontSize: '0.85rem',
                        color: '#6B7280'
                    }}
                >
                    Penjual:
                    <strong style={{ color: '#111827' }}>
                        {' '}
                        {bike.user?.name || 'Unknown'}
                    </strong>
                </div>

                {/* PRICE */}
                <div
                    style={{
                        fontSize: '1.4rem',
                        fontWeight: 'bold',
                        color: '#DC2626',
                        marginBottom: '1rem'
                    }}
                >
                    Rp {(bike.price || 0).toLocaleString('id-ID')}
                </div>

                {/* BUTTONS */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}
                >

                    {/* WHATSAPP */}
                    {whatsappUrl ? (

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none'
                            }}
                        >

                            <Button
                                text="Hubungi Penjual"
                                variant="success"
                                style={{
                                    width: '100%'
                                }}
                            />

                        </a>

                    ) : (

                        <Button
                            text="Nomor Tidak Tersedia"
                            variant="secondary"
                            style={{
                                width: '100%'
                            }}
                        />

                    )}

                    {/* OWNER ONLY */}
                    {isLoggedIn && isOwner && (

                        <>
                            <Button
                                text="Edit"
                                onClick={() =>
                                    onEdit && onEdit(bike)
                                }
                                variant="secondary"
                                style={{
                                    width: '100%'
                                }}
                            />

                            <Button
                                text="Hapus"
                                onClick={() =>
                                    onDelete && onDelete(bike.id)
                                }
                                variant="danger"
                                style={{
                                    width: '100%'
                                }}
                            />
                        </>

                    )}

                </div>

            </div>
        </div>
    );
};

export default ProductCard;