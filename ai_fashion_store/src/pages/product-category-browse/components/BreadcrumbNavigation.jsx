import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = ({ currentCategory, searchQuery }) => {
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: 'Home', path: '/homepage-landing' },
    { label: 'Shop', path: '/product-category-browse' }
  ];

  if (currentCategory && currentCategory !== 'all') {
    const categoryNames = {
      'men': 'Men\'s Fashion',
      'women': 'Women\'s Fashion', 
      'kids': 'Kids Fashion',
      'accessories': 'Accessories'
    };
    breadcrumbs?.push({ 
      label: categoryNames?.[currentCategory] || currentCategory, 
      path: `/product-category-browse?category=${currentCategory}` 
    });
  }

  if (searchQuery) {
    breadcrumbs?.push({ 
      label: `Search: "${searchQuery}"`, 
      path: null 
    });
  }

  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs?.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              )}
              {crumb?.path ? (
                <button
                  onClick={() => navigate(crumb?.path)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {crumb?.label}
                </button>
              ) : (
                <span className="text-foreground font-medium">{crumb?.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;