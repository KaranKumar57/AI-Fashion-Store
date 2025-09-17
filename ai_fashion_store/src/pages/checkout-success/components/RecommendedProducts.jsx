import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedProducts = () => {
  const navigate = useNavigate();

  const recommendedItems = [
    {
      id: 1,
      name: "Classic White Sneakers",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      badge: "Trending"
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 3,
      name: "Silk Scarf",
      price: 34.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
      badge: "New"
    },
    {
      id: 4,
      name: "Leather Handbag",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      badge: "Limited"
    }
  ];

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = {
      id: item?.id,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      size: 'M',
      color: 'Default',
      quantity: 1
    };
    
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleContinueShopping = () => {
    navigate('/product-category-browse');
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Sparkles" size={20} className="mr-2 text-primary" />
          You Might Also Like
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleContinueShopping}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {recommendedItems?.map((item) => (
          <div key={item?.id} className="group relative bg-background rounded-lg overflow-hidden border border-border hover:shadow-md transition-all duration-200">
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item?.badge === 'Trending' ? 'bg-accent text-accent-foreground' :
                  item?.badge === 'Best Seller' ? 'bg-success text-success-foreground' :
                  item?.badge === 'New' ? 'bg-primary text-primary-foreground' :
                  'bg-warning text-warning-foreground'
                }`}>
                  {item?.badge}
                </span>
              </div>
            </div>
            
            <div className="p-3">
              <h4 className="font-medium text-foreground text-sm mb-2 line-clamp-2">{item?.name}</h4>
              <div className="flex items-center space-x-2 mb-3">
                <span className="font-bold text-primary">${item?.price}</span>
                {item?.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">${item?.originalPrice}</span>
                )}
              </div>
              
              <Button
                size="sm"
                fullWidth
                onClick={() => handleAddToCart(item)}
                iconName="Plus"
                iconPosition="left"
                className="text-xs"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          ✨ Our AI stylist picked these items based on your recent purchase
        </p>
        <Button 
          variant="outline" 
          onClick={handleContinueShopping}
          iconName="ShoppingBag"
          iconPosition="left"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default RecommendedProducts;