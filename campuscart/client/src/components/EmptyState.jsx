import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  title = 'No Items Found',
  description = 'There are no active items available for this selection.',
  actionLabel,
  actionLink,
  onAction,
  icon: Icon = PackageOpen,
}) => {
  return (
    <div className="empty-state">
      <Icon size={48} className="empty-icon" />
      <h3 className="empty-title">{title}</h3>
      <p className="empty-text">{description}</p>
      {actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionLabel || 'Get Started'}
        </Link>
      )}
      {onAction && !actionLink && (
        <button onClick={onAction} className="btn btn-primary">
          {actionLabel || 'Action'}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
