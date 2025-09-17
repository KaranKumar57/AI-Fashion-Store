import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SavedForLater = ({ savedItems, onMoveToCart, onRemoveFromSaved }) => {
  if (!savedItems || savedItems?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Icon name="Heart" size={20} />
        Saved for Later ({savedItems?.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedItems?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
            <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-foreground text-sm line-clamp-2">
                {item?.name}
              </h3>
              <p className="text-xs text-muted-foreground">{item?.brand}</p>
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">${item?.price?.toFixed(2)}</span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${item?.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Product Options */}
              {(item?.size || item?.color) && (
                <div className="text-xs text-muted-foreground space-y-1">
                  {item?.size && <div>Size: {item?.size}</div>}
                  {item?.color && <div>Color: {item?.color}</div>}
                </div>
              )}
              
              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMoveToCart(item)}
                  className="flex-1 text-xs"
                >
                  <Icon name="ShoppingCart" size={14} className="mr-1" />
                  Move to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFromSaved(item?.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;