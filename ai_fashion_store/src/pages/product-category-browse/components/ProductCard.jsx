import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e?.stopPropagation();
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart?.findIndex(item => item?.id === product?.id);
    
    if (existingItemIndex >= 0) {
      // Increase quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      existingCart?.push({
        ...product,
        quantity: 1,
        addedAt: new Date()?.toISOString()
      });
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    setIsAddingToCart(false);
    
    // Trigger a custom event to update cart count in header
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleWishlistToggle = (e) => {
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleProductClick = () => {
    // Navigate to product detail page (would be implemented)
    console.log('Navigate to product:', product?.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)]?.map((_, i) => (
          <Icon
            key={i}
            name="Star"
            size={12}
            className={i < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
        onClick={handleProductClick}
      >
        <div className="flex space-x-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {product?.isNew && (
              <span className="absolute top-1 left-1 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                New
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                  {product?.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{product?.brand}</p>
                {renderRating(product?.rating)}
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {product?.description}
                </p>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col items-end space-y-2 ml-4">
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className="h-8 w-8"
                  >
                    <Icon
                      name="Heart"
                      size={16}
                      className={isWishlisted ? 'text-error fill-current' : 'text-muted-foreground'}
                    />
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddToCart}
                    loading={isAddingToCart}
                    iconName="ShoppingBag"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {product?.originalPrice && (
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
        >
          <Icon
            name="Heart"
            size={16}
            className={isWishlisted ? 'text-error fill-current' : 'text-muted-foreground'}
          />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              handleProductClick();
            }}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            Quick View
          </Button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {product?.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product?.brand}</p>
        </div>

        {/* Rating */}
        <div className="mb-3">
          {renderRating(product?.rating)}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-foreground">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="default"
          fullWidth
          onClick={handleAddToCart}
          loading={isAddingToCart}
          iconName="ShoppingBag"
          iconPosition="left"
          iconSize={16}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;