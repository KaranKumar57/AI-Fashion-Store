import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  total, 
  onApplyPromoCode, 
  onProceedToCheckout,
  onContinueShopping 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handleApplyPromoCode = async () => {
    if (!promoCode?.trim()) return;
    
    setIsApplyingPromo(true);
    
    // Simulate API call
    setTimeout(() => {
      const validCodes = {
        'SAVE10': { discount: 10, type: 'percentage' },
        'WELCOME20': { discount: 20, type: 'percentage' },
        'FREESHIP': { discount: shipping, type: 'fixed' }
      };
      
      const code = validCodes?.[promoCode?.toUpperCase()];
      if (code) {
        setPromoApplied({
          code: promoCode?.toUpperCase(),
          ...code
        });
        onApplyPromoCode(code);
      } else {
        setPromoApplied({ error: 'Invalid promo code' });
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleRemovePromo = () => {
    setPromoApplied(null);
    setPromoCode('');
    onApplyPromoCode(null);
  };

  const getDiscountAmount = () => {
    if (!promoApplied || promoApplied?.error) return 0;
    
    if (promoApplied?.type === 'percentage') {
      return (subtotal * promoApplied?.discount) / 100;
    }
    return promoApplied?.discount;
  };

  const finalTotal = total - getDiscountAmount();

  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
      <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            disabled={promoApplied && !promoApplied?.error}
            className="flex-1"
          />
          {promoApplied && !promoApplied?.error ? (
            <Button
              variant="outline"
              onClick={handleRemovePromo}
              className="px-3"
            >
              <Icon name="X" size={16} />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleApplyPromoCode}
              disabled={!promoCode?.trim() || isApplyingPromo}
              loading={isApplyingPromo}
            >
              Apply
            </Button>
          )}
        </div>
        
        {promoApplied && (
          <div className={`text-sm ${promoApplied?.error ? 'text-destructive' : 'text-success'}`}>
            {promoApplied?.error || `✓ ${promoApplied?.code} applied successfully!`}
          </div>
        )}
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal?.toFixed(2)}</span>
        </div>
        
        {promoApplied && !promoApplied?.error && (
          <div className="flex justify-between text-success">
            <span>Discount ({promoApplied?.code})</span>
            <span>-${getDiscountAmount()?.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Tax</span>
          <span>${tax?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : `$${shipping?.toFixed(2)}`}</span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-bold text-foreground">
            <span>Total</span>
            <span>${finalTotal?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Shipping Calculator */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Truck" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Shipping Info</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Free shipping on orders over $75. Estimated delivery: 3-5 business days.
        </p>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onProceedToCheckout}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          size="lg"
        >
          <Icon name="CreditCard" size={20} className="mr-2" />
          Proceed to Checkout
        </Button>
        
        <Button
          variant="outline"
          onClick={onContinueShopping}
          className="w-full"
          size="lg"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Continue Shopping
        </Button>
      </div>
      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Icon name="Shield" size={16} />
        <span>Secure SSL Checkout</span>
      </div>
    </div>
  );
};

export default OrderSummary;