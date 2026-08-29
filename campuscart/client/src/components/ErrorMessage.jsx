import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'An unexpected error occurred.', onRetry }) => {
  return (
    <div className="alert-box alert-error" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <AlertCircle size={18} />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-secondary btn-sm"
          style={{ background: '#FFF', borderColor: '#FECACA' }}
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
