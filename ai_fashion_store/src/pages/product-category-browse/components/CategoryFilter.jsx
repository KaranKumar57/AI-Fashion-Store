import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  searchQuery,
  onSearchChange 
}) => {
  return (
    <div className="bg-card border-b border-border sticky top-16 lg:top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={selectedCategory === category?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category?.id)}
              iconName={category?.icon}
              iconPosition="left"
              iconSize={16}
              className="flex-shrink-0"
            >
              {category?.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;