import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ orderData }) => {
  const { items, subtotal, shipping, tax, total } = orderData;

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Package" size={20} className="mr-2 text-primary" />
        Order Summary
      </h3>
      <div className="space-y-4 mb-6">
        {items?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-background">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground text-sm">{item?.name}</h4>
              <p className="text-muted-foreground text-xs">Size: {item?.size} | Color: {item?.color}</p>
              <p className="text-muted-foreground text-xs">Qty: {item?.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">${item?.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">${shipping}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${tax}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-semibold">
          <span className="text-foreground">Total</span>
          <span className="text-primary text-lg">${total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;