import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AIChatbot from '../../components/ui/AIChatbot';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import SavedForLater from './components/SavedForLater';
import EmptyCart from './components/EmptyCart';
import Icon from '../../components/AppIcon';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [promoDiscount, setPromoDiscount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Premium Cotton Blend Hoodie",
      brand: "Urban Style Co.",
      price: 89.99,
      originalPrice: 109.99,
      quantity: 2,
      size: "M",
      color: "Navy Blue",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "High-Waisted Denim Jeans",
      brand: "Denim Dreams",
      price: 79.99,
      originalPrice: null,
      quantity: 1,
      size: "28",
      color: "Dark Wash",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Silk Blend Blouse",
      brand: "Elegant Essentials",
      price: 124.99,
      originalPrice: 149.99,
      quantity: 1,
      size: "S",
      color: "Cream",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop"
    }
  ];

  const mockSavedItems = [
    {
      id: 4,
      name: "Leather Ankle Boots",
      brand: "Classic Footwear",
      price: 159.99,
      originalPrice: 199.99,
      size: "8",
      color: "Black",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Cashmere Scarf",
      brand: "Luxury Accessories",
      price: 89.99,
      originalPrice: null,
      color: "Burgundy",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const savedForLater = JSON.parse(localStorage.getItem('savedForLater') || '[]');
      
      if (savedCart?.length > 0) {
        setCartItems(savedCart);
      } else {
        // Use mock data for demonstration
        setCartItems(mockCartItems);
        localStorage.setItem('cart', JSON.stringify(mockCartItems));
      }
      
      if (savedForLater?.length > 0) {
        setSavedItems(savedForLater);
      } else {
        setSavedItems(mockSavedItems);
        localStorage.setItem('savedForLater', JSON.stringify(mockSavedItems));
      }
      
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems?.map(item =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems?.filter(item => item?.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const saveForLater = (itemId) => {
    const itemToSave = cartItems?.find(item => item?.id === itemId);
    if (itemToSave) {
      const updatedCart = cartItems?.filter(item => item?.id !== itemId);
      const updatedSaved = [...savedItems, { ...itemToSave, quantity: 1 }];
      
      setCartItems(updatedCart);
      setSavedItems(updatedSaved);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.setItem('savedForLater', JSON.stringify(updatedSaved));
    }
  };

  const moveToCart = (item) => {
    const updatedSaved = savedItems?.filter(savedItem => savedItem?.id !== item?.id);
    const updatedCart = [...cartItems, { ...item, quantity: 1 }];
    
    setSavedItems(updatedSaved);
    setCartItems(updatedCart);
    localStorage.setItem('savedForLater', JSON.stringify(updatedSaved));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromSaved = (itemId) => {
    const updatedSaved = savedItems?.filter(item => item?.id !== itemId);
    setSavedItems(updatedSaved);
    localStorage.setItem('savedForLater', JSON.stringify(updatedSaved));
  };

  const applyPromoCode = (discount) => {
    setPromoDiscount(discount);
  };

  const handleProceedToCheckout = () => {
    // Store order summary for checkout
    const orderData = {
      items: cartItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: calculateShipping(),
      discount: promoDiscount,
      total: calculateTotal()
    };
    localStorage.setItem('checkoutOrder', JSON.stringify(orderData));
    navigate('/checkout-success');
  };

  const handleContinueShopping = () => {
    navigate('/product-category-browse');
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 75 ? 0 : 9.99; // Free shipping over $75
  };

  const calculateTotal = () => {
    let total = calculateSubtotal() + calculateTax() + calculateShipping();
    
    if (promoDiscount) {
      if (promoDiscount?.type === 'percentage') {
        total -= (calculateSubtotal() * promoDiscount?.discount) / 100;
      } else {
        total -= promoDiscount?.discount;
      }
    }
    
    return Math.max(0, total);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Shopping Cart - AI Fashion Store</title>
          <meta name="description" content="Review and manage your fashion items in your shopping cart" />
        </Helmet>
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading your cart...</p>
              </div>
            </div>
          </div>
        </div>
        <AIChatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shopping Cart ({cartItems?.length}) - AI Fashion Store</title>
        <meta name="description" content="Review and manage your fashion items in your shopping cart" />
      </Helmet>
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="ShoppingCart" size={28} className="text-primary" />
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Shopping Cart
              </h1>
            </div>
            <p className="text-muted-foreground">
              {cartItems?.length > 0 
                ? `${cartItems?.length} item${cartItems?.length !== 1 ? 's' : ''} in your cart`
                : 'Your cart is currently empty'
              }
            </p>
          </div>

          {cartItems?.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems?.map((item) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    onSaveForLater={saveForLater}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={calculateSubtotal()}
                  tax={calculateTax()}
                  shipping={calculateShipping()}
                  total={calculateTotal()}
                  onApplyPromoCode={applyPromoCode}
                  onProceedToCheckout={handleProceedToCheckout}
                  onContinueShopping={handleContinueShopping}
                />
              </div>
            </div>
          )}

          {/* Saved for Later */}
          {savedItems?.length > 0 && (
            <div className="mt-12">
              <SavedForLater
                savedItems={savedItems}
                onMoveToCart={moveToCart}
                onRemoveFromSaved={removeFromSaved}
              />
            </div>
          )}

          {/* Trust Signals */}
          {cartItems?.length > 0 && (
            <div className="mt-12 bg-card border border-border rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={24} className="text-success" />
                  </div>
                  <h3 className="font-semibold text-foreground">Secure Checkout</h3>
                  <p className="text-sm text-muted-foreground">SSL encrypted payment</p>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Truck" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over $75</p>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Icon name="RotateCcw" size={24} className="text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Easy Returns</h3>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <AIChatbot />
    </div>
  );
};

export default ShoppingCart;