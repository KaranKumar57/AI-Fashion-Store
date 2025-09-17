import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const SortControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  totalProducts,
  isLoading 
}) => {
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Results Count */}
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading products...</span>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
              </span>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="min-w-[180px]">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={onSortChange}
                placeholder="Sort by"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                iconName="Grid3X3"
                iconSize={16}
                className="px-2"
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                iconName="List"
                iconSize={16}
                className="px-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls;