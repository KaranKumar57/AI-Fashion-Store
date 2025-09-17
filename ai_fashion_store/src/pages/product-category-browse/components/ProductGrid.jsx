import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, viewMode, isLoading }) => {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className={`grid gap-6 ${
          viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {[...Array(8)]?.map((_, index) => (
            <div key={index} className="animate-pulse">
              {viewMode === 'list' ? (
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex space-x-4">
                    <div className="w-24 h-24 bg-muted-foreground/20 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                      <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
                      <div className="h-3 bg-muted-foreground/20 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted rounded-xl overflow-hidden">
                  <div className="aspect-square bg-muted-foreground/20"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
                    <div className="h-6 bg-muted-foreground/20 rounded w-1/3"></div>
                    <div className="h-8 bg-muted-foreground/20 rounded"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h8a2 2 0 012 2v4M6 13h12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className={`grid gap-6 ${
        viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {products?.map((product) => (
          <ProductCard 
            key={product?.id} 
            product={product} 
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;