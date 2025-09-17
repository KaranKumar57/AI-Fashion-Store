import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AIChatbot from '../../components/ui/AIChatbot';
import OrderConfirmation from './components/OrderConfirmation';
import OrderSummary from './components/OrderSummary';
import RecommendedProducts from './components/RecommendedProducts';
import SocialShare from './components/SocialShare';
import CustomerSupport from './components/CustomerSupport';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  // Mock order data
  const mockOrderData = {
    orderNumber: "FS2025091601",
    estimatedDelivery: "Sep 20-22, 2025",
    shippingAddress: {
      name: "Sarah Johnson",
      street: "123 Fashion Avenue",
      city: "New York",
      state: "NY",
      zip: "10001"
    },
    items: [
      {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        size: "M",
        color: "White",
        quantity: 2
      },
      {
        id: 2,
        name: "High-Waisted Jeans",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        size: "28",
        color: "Dark Blue",
        quantity: 1
      },
      {
        id: 3,
        name: "Leather Ankle Boots",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
        size: "8",
        color: "Brown",
        quantity: 1
      }
    ],
    subtotal: 289.96,
    shipping: 9.99,
    tax: 23.99,
    total: 323.94
  };

  useEffect(() => {
    // Clear cart after successful checkout
    localStorage.removeItem('cart');
    setOrderData(mockOrderData);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleContinueShopping = () => {
    navigate('/product-category-browse');
  };

  const handleGoHome = () => {
    navigate('/homepage-landing');
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Confetti Background */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50"></div>
            <div className="relative py-16 px-8">
              <OrderConfirmation
                orderNumber={orderData?.orderNumber}
                estimatedDelivery={orderData?.estimatedDelivery}
                shippingAddress={orderData?.shippingAddress}
              />
            </div>
          </div>

          {/* Order Details and Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <OrderSummary orderData={orderData} />
            </div>
            <div className="space-y-6">
              <CustomerSupport />
            </div>
          </div>

          {/* Social Sharing */}
          <div className="mb-12">
            <SocialShare />
          </div>

          {/* Recommended Products */}
          <div className="mb-12">
            <RecommendedProducts />
          </div>

          {/* Action Buttons */}
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">What's Next?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Your order is being prepared with care. You'll receive tracking information via email once it ships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleGoHome}
                iconName="Home"
                iconPosition="left"
                className="sm:w-auto"
              >
                Back to Home
              </Button>
              <Button
                variant="default"
                onClick={handleContinueShopping}
                iconName="ShoppingBag"
                iconPosition="left"
                className="sm:w-auto"
              >
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="mt-8 bg-muted/30 rounded-xl p-6 border border-border">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-success" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Email Confirmation Sent</p>
                <p className="text-sm text-muted-foreground">
                  Check your inbox for order details and tracking information
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={16} color="white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Fashion Store
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Thank you for choosing AI Fashion Store for your style journey!
            </p>
            <p className="text-xs text-muted-foreground">
              Built By → Karan Kumar | © {new Date()?.getFullYear()} AI Fashion Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default CheckoutSuccess;