import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 36, fullScreen = false }) => {
  const content = (
    <div className="spinner-container">
      <Loader2 className="spinner-icon animate-spin" size={size} />
      {message && <p className="spinner-text">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="spinner-fullscreen">{content}</div>;
  }

  return content;
};

export default LoadingSpinner;
