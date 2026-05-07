import React from 'react';

const Button = ({ 
    text, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    disabled = false,
    style = {},
    className = ''
}) => {
    const baseStyle = {
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        opacity: disabled ? 0.6 : 1,
        ...style
    };

    const variantStyles = {
        primary: {
            background: '#DC2626',
            color: 'white',
            hover: '#991B1B'
        },
        secondary: {
            background: '#6B7280',
            color: 'white',
            hover: '#4B5563'
        },
        success: {
            background: '#10B981',
            color: 'white',
            hover: '#059669'
        },
        danger: {
            background: '#EF4444',
            color: 'white',
            hover: '#DC2626'
        },
        outline: {
            background: 'transparent',
            color: '#DC2626',
            border: '2px solid #DC2626',
            hover: { background: '#FEE2E2', color: '#DC2626' }
        }
    };

    const currentVariant = variantStyles[variant] || variantStyles.primary;

    const handleMouseOver = (e) => {
        if (!disabled) {
            e.target.style.background = currentVariant.hover || currentVariant.background;
            if (currentVariant.hover && typeof currentVariant.hover === 'object') {
                e.target.style.background = currentVariant.hover.background;
                e.target.style.color = currentVariant.hover.color;
            }
        }
    };

    const handleMouseOut = (e) => {
        e.target.style.background = currentVariant.background;
        if (currentVariant.color) e.target.style.color = currentVariant.color;
        if (currentVariant.border) e.target.style.border = currentVariant.border;
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={{
                ...baseStyle,
                background: currentVariant.background,
                color: currentVariant.color,
                border: currentVariant.border || 'none'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {text}
        </button>
    );
};

export default Button;
