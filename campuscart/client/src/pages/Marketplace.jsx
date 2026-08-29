import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import * as productService from '../services/productService';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { Sparkles, PlusCircle, AlertTriangle, PackageOpen, ArrowDown } from 'lucide-react';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getProducts({
        category: currentCategory,
        search: currentSearch,
      });

      if (data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to load listings:', err);
      setError('Unable to load listings right now. Please verify your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentCategory, currentSearch]);

  const handleCategorySelect = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (!term || !term.trim()) {
      params.delete('search');
    } else {
      params.set('search', term.trim());
    }
    setSearchParams(params);
  };

  const scrollToGrid = () => {
    const gridElem = document.getElementById('browse-section');
    if (gridElem) {
      gridElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="marketplace-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} color="#F59E0B" />
            <span>CampusCart — Buy Smart. Sell Easy.</span>
          </div>
          <h1 className="hero-title">Your Campus Marketplace</h1>
          <p className="hero-subtitle">
            Buy and sell useful college essentials within your student community.
            Textbooks, calculators, electronics, lab equipment, and more.
          </p>

          <div style={{ maxWidth: '540px', marginBottom: '1.75rem' }}>
            <SearchBar onSearch={handleSearch} initialValue={currentSearch} />
          </div>

          <div className="hero-actions">
            <button onClick={scrollToGrid} className="btn btn-secondary btn-lg" id="browse-items-cta">
              <ArrowDown size={18} />
              Browse Items
            </button>
            <Link to="/sell" className="btn btn-primary btn-lg" id="hero-sell-cta">
              <PlusCircle size={18} />
              Sell an Item
            </Link>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryFilter
        selectedCategory={currentCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Product Listings Section */}
      <section id="browse-section" style={{ scrollMarginTop: '80px' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              {currentSearch ? `Search results for "${currentSearch}"` : 'Available Listings'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '0.2rem' }}>
              Showing {products.length} {products.length === 1 ? 'item' : 'items'} in your campus network
            </p>
          </div>

          {(currentSearch || currentCategory !== 'All') && (
            <button
              onClick={() => setSearchParams({})}
              className="btn btn-secondary btn-sm"
              id="reset-filters-btn"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ padding: '3rem 0' }}>
            <LoadingSpinner message="Fetching college listings..." />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="alert-box alert-error" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
            <button onClick={fetchProducts} className="btn btn-secondary btn-sm">
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <PackageOpen size={48} className="empty-icon" />
            <h3 className="empty-title">No listings found</h3>
            <p className="empty-text">
              {currentSearch || currentCategory !== 'All'
                ? 'No items matched your current search and category criteria. Try adjusting your keywords or browse all categories.'
                : 'There are no active listings on CampusCart yet. Be the first student to post an item!'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              {(currentSearch || currentCategory !== 'All') && (
                <button
                  onClick={() => setSearchParams({})}
                  className="btn btn-secondary"
                >
                  Clear Filters
                </button>
              )}
              <Link to="/sell" className="btn btn-primary">
                <PlusCircle size={16} />
                Post First Listing
              </Link>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="product-grid" id="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Marketplace;
