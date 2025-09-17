import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/product-category-browse');
  };

  const handleAIRecommendations = () => {
    navigate('/ai-outfit-recommendations');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-8 lg:p-12 text-center">
      <div className="max-w-md mx-auto space-y-6">
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
        </div>
        
        {/* Empty State Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Looks like you haven't added any items to your cart yet. Start exploring our amazing fashion collections!
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleStartShopping}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            size="lg"
          >
            <Icon name="Store" size={20} className="mr-2" />
            Start Shopping
          </Button>
          
          <Button
            variant="outline"
            onClick={handleAIRecommendations}
            className="w-full"
            size="lg"
          >
            <Icon name="Sparkles" size={20} className="mr-2" />
            Get AI Recommendations
          </Button>
        </div>
        
        {/* Popular Categories */}
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Popular categories:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Women', 'Men', 'Kids', 'Accessories']?.map((category) => (
              <button
                key={category}
                onClick={handleStartShopping}
                className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;