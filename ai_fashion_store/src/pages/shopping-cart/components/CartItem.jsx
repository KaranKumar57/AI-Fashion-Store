import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item?.id, newQuantity);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item?.id);
      setIsRemoving(false);
      setShowRemoveConfirm(false);
    }, 300);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item?.id);
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-4 lg:p-6 transition-all duration-300 ${
      isRemoving ? 'opacity-50 scale-95' : 'hover:shadow-md'
    }`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-24 h-32 lg:h-24 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground text-base lg:text-lg">
                {item?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item?.brand}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-foreground">
                ${item?.price?.toFixed(2)}
              </p>
              {item?.originalPrice && item?.originalPrice > item?.price && (
                <p className="text-sm text-muted-foreground line-through">
                  ${item?.originalPrice?.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Product Options */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {item?.size && (
              <span>Size: <span className="font-medium text-foreground">{item?.size}</span></span>
            )}
            {item?.color && (
              <span>Color: <span className="font-medium text-foreground">{item?.color}</span></span>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-2">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Qty:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1}
                  className="h-8 w-8 rounded-r-none"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="px-3 py-1 text-sm font-medium bg-background border-x border-border min-w-[3rem] text-center">
                  {item?.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  className="h-8 w-8 rounded-l-none"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveForLater}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Heart" size={16} className="mr-1" />
                Save for Later
              </Button>
              
              {showRemoveConfirm ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemove}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowRemoveConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRemoveConfirm(true)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} className="mr-1" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;