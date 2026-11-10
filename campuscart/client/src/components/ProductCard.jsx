import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, User, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    price,
    category,
    condition,
    imageUrl,
    campus,
    seller,
  } = product;

  const fallbackImage = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sellerName = typeof seller === 'object' && seller?.name ? seller.name : 'Student Seller';

  return (
    <div className="product-card" id={`product-card-${_id}`}>
      <div className="product-card-img-wrapper">
        <img
          src={imageUrl || fallbackImage}
          alt={title}
          className="product-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <span className="product-card-category">{category}</span>
        <span className="product-card-condition">{condition}</span>
        {product.status === 'sold' && (
          <span
            style={{
              position: 'absolute',
              bottom: '0.75rem',
              left: '0.75rem',
              backgroundColor: 'rgba(239, 68, 68, 0.95)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.65rem',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Sold
          </span>
        )}
      </div>

      <div className="product-card-body">
        <h3 className="product-card-title" title={title}>
          {title}
        </h3>
        <div className="product-card-price">{formatPrice(price)}</div>

        <div className="product-card-meta">
          <div className="meta-row">
            <User size={13} color="#94A3B8" />
            <span>{sellerName}</span>
          </div>
          <div className="meta-row">
            <MapPin size={13} color="#94A3B8" />
            <span>{campus}</span>
          </div>
        </div>

        <Link
          to={`/products/${_id}`}
          className="btn btn-secondary btn-sm product-card-btn"
          id={`view-details-${_id}`}
        >
          View Details
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
