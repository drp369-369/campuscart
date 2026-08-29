import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  id,
  ...props
}) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const widthClass = fullWidth ? 'btn-block' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      id={id}
      className={`btn ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()}
      {...props}
    >
      {loading ? <span className="spinner-inline">Processing...</span> : children}
    </button>
  );
};

export default Button;
