import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  error,
  required = false,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span style={{ color: 'var(--accent-rose)' }}>*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`form-input ${error ? 'input-error' : ''} ${className}`.trim()}
        required={required}
        {...props}
      />
      {helperText && !error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {helperText}
        </span>
      )}
      {error && (
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
