import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as productService from '../services/productService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  PackageX,
  Trash2,
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contactRevealed, setContactRevealed] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await productService.getProductById(id);
        if (res && res.data) {
          setProduct(res.data);
        } else {
          setError('Product listing not found.');
        }
      } catch (err) {
        console.error('Fetch product details error:', err);
        setError(
          err.response?.status === 404
            ? 'Product listing not found or has been removed by the seller.'
            : 'Unable to load product details. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      setDeleting(true);
      await productService.deleteProduct(id);
      navigate('/', { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete listing.');
      setDeleting(false);
    }
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const fallbackImage =
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="empty-state" style={{ maxWidth: '600px', margin: '4rem auto' }}>
        <PackageX size={48} className="empty-icon" color="#EF4444" />
        <h2 className="empty-title">Product Not Found</h2>
        <p className="empty-text">
          {error || "We couldn't find the product listing you're looking for."}
        </p>
        <Link to="/" className="btn btn-primary" id="back-to-marketplace-btn">
          <ArrowLeft size={16} />
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isOwner =
    currentUser &&
    product.seller &&
    (currentUser._id === product.seller._id || currentUser._id === product.seller);

  const sellerName = product.seller?.name || 'Fellow Student';
  const sellerEmail = product.seller?.email || 'contact@campuscart.edu';
  const sellerCampus = product.seller?.campus || product.campus;

  return (
    <div style={{ paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="btn btn-secondary btn-sm" id="details-back-link">
          <ArrowLeft size={16} />
          Back to Marketplace
        </Link>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm"
            disabled={deleting}
            id="delete-listing-btn"
          >
            <Trash2 size={16} />
            {deleting ? 'Deleting...' : 'Delete My Listing'}
          </button>
        )}
      </div>

      <div className="details-container">
        {/* Product Image */}
        <div className="details-image-box">
          <img
            src={product.imageUrl || fallbackImage}
            alt={product.title}
            className="details-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </div>

        {/* Product Details & Actions */}
        <div className="details-info">
          <div className="details-badge-row">
            <span className="category-chip active" style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}>
              {product.category}
            </span>
            <span className="category-chip" style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem', background: '#F1F5F9' }}>
              Condition: <strong>{product.condition}</strong>
            </span>
            <span
              className="category-chip"
              style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.85rem',
                background: product.status === 'available' ? '#ECFDF5' : '#FEE2E2',
                color: product.status === 'available' ? '#047857' : '#B91C1C',
                borderColor: product.status === 'available' ? '#A7F3D0' : '#FECACA',
              }}
            >
              ● {product.status === 'available' ? 'Available' : 'Sold'}
            </span>
          </div>

          <h1 className="details-title">{product.title}</h1>
          <div className="details-price">{formatPrice(product.price)}</div>

          <div className="details-description-box">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Seller Information Card */}
          <div className="seller-card">
            <h4>Seller Information</h4>
            <div className="seller-details">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} color="#4F46E5" />
                <span>
                  Listed by: <strong>{sellerName}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#4F46E5" />
                <span>Campus: {sellerCampus}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} color="#4F46E5" />
                <span>Posted on: {formatDate(product.createdAt)}</span>
              </div>
            </div>

            {/* Contact Seller Action Box */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #C7D2FE' }}>
              {contactRevealed ? (
                <div
                  style={{
                    background: '#FFFFFF',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #A5B4FC',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={18} />
                    <span>Seller Contact Details</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#334155', marginBottom: '0.5rem' }}>
                    Connect with {sellerName} directly to arrange item pickup and payment:
                  </p>
                  <a
                    href={`mailto:${sellerEmail}?subject=Inquiry regarding ${product.title} on CampusCart`}
                    className="btn btn-primary btn-sm"
                  >
                    <Mail size={16} />
                    Email Seller: {sellerEmail}
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
                    } else {
                      setContactRevealed(true);
                    }
                  }}
                  className="btn btn-primary btn-block"
                  id="contact-seller-btn"
                >
                  <Mail size={18} />
                  Contact Seller
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} color="#10B981" />
            <span>CampusCart Verified Campus Listing — Safe on-campus meetups recommended.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
