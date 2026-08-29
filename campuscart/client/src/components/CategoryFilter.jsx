import React from 'react';

export const CATEGORIES = [
  'All',
  'Books',
  'Electronics',
  'Calculators',
  'Lab Equipment',
  'Furniture',
  'Stationery',
  'Other',
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="categories-section">
      <div className="section-header">
        <h2 className="section-title">Explore by Category</h2>
        <span style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Filtered by: <strong>{selectedCategory}</strong>
        </span>
      </div>
      <div className="category-chips" role="tablist" aria-label="Product categories">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`category-chip ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
              id={`category-chip-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
