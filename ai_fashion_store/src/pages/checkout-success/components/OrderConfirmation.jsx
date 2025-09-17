import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderConfirmation = ({ orderNumber, estimatedDelivery, shippingAddress }) => {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="CheckCircle" size={40} color="white" />
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
        Order Confirmed! 🎉
      </h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
        Thank you for your purchase! Your order has been successfully placed and is being processed.
      </p>
      <div className="bg-card rounded-xl p-6 border border-border max-w-md mx-auto mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-mono font-semibold text-primary">#{orderNumber}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Estimated Delivery</span>
            <span className="font-semibold text-foreground">{estimatedDelivery}</span>
          </div>
          
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">Shipping to:</p>
            <p className="text-sm font-medium text-foreground">
              {shippingAddress?.name}<br />
              {shippingAddress?.street}<br />
              {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zip}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" iconName="Mail" iconPosition="left">
          Email Confirmation Sent
        </Button>
        <Button variant="default" iconName="Truck" iconPosition="left">
          Track Your Order
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;