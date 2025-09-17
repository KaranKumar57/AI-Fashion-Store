import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AIChatbot from '../../components/ui/AIChatbot';
import PreferenceForm from './components/PreferenceForm';
import OutfitRecommendations from './components/OutfitRecommendations';
import LoadingState from './components/LoadingState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIOutfitRecommendations = () => {
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'loading', 'recommendations'
  const [preferences, setPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handlePreferenceSubmit = (userPreferences) => {
    setPreferences(userPreferences);
    setIsLoading(true);
    setCurrentStep('loading');

    // Simulate AI processing time
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('recommendations');
    }, 3000);
  };

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = {
      id: item?.id,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      color: item?.color,
      quantity: 1,
      addedAt: new Date()?.toISOString()
    };

    // Check if item already exists in cart
    const existingItemIndex = existingCart?.findIndex(cartItem => cartItem?.id === item?.id);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart?.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success feedback (you could add a toast notification here)
    console.log(`Added ${item?.name} to cart`);
  };

  const handleAddCompleteOutfit = (outfit) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    outfit?.items?.forEach(item => {
      const cartItem = {
        id: item?.id,
        name: item?.name,
        price: item?.price,
        image: item?.image,
        color: item?.color,
        quantity: 1,
        addedAt: new Date()?.toISOString(),
        outfitId: outfit?.id
      };

      // Check if item already exists in cart
      const existingItemIndex = existingCart?.findIndex(cartItem => cartItem?.id === item?.id);
      
      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart?.push(cartItem);
      }
    });

    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Navigate to cart
    navigate('/shopping-cart');
  };

  const handleStartOver = () => {
    setCurrentStep('form');
    setPreferences(null);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Wand2" size={32} className="text-primary" />
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground">
                AI Outfit Recommendations
              </h1>
            </div>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Let our advanced AI stylist create personalized outfit recommendations based on your preferences, occasion, and style goals.
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-8">
            <button
              onClick={() => navigate('/homepage-landing')}
              className="hover:text-primary transition-colors duration-200"
            >
              Home
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">AI Recommendations</span>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className={`flex items-center space-x-2 ${
              currentStep === 'form' ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'form' 
                  ? 'border-primary bg-primary text-white' :'border-muted-foreground/30'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Preferences</span>
            </div>
            
            <div className={`w-12 h-0.5 ${
              currentStep !== 'form' ? 'bg-primary' : 'bg-muted-foreground/30'
            }`} />
            
            <div className={`flex items-center space-x-2 ${
              currentStep === 'loading' ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'loading' ?'border-primary bg-primary text-white' 
                  : currentStep === 'recommendations' ?'border-primary bg-primary text-white' :'border-muted-foreground/30'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">AI Analysis</span>
            </div>
            
            <div className={`w-12 h-0.5 ${
              currentStep === 'recommendations' ? 'bg-primary' : 'bg-muted-foreground/30'
            }`} />
            
            <div className={`flex items-center space-x-2 ${
              currentStep === 'recommendations' ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'recommendations' ?'border-primary bg-primary text-white' :'border-muted-foreground/30'
              }`}>
                3
              </div>
              <span className="text-sm font-medium">Recommendations</span>
            </div>
          </div>

          {/* Content Based on Current Step */}
          {currentStep === 'form' && (
            <PreferenceForm
              onSubmit={handlePreferenceSubmit}
              isLoading={isLoading}
            />
          )}

          {currentStep === 'loading' && (
            <LoadingState />
          )}

          {currentStep === 'recommendations' && preferences && (
            <div className="space-y-6">
              <OutfitRecommendations
                preferences={preferences}
                onAddToCart={handleAddToCart}
                onAddCompleteOutfit={handleAddCompleteOutfit}
              />
              
              {/* Start Over Button */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={handleStartOver}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Try Different Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Why Choose AI Styling?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI considers thousands of style combinations, current trends, and your personal preferences to create the perfect outfit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Brain" size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Analysis</h3>
              <p className="text-muted-foreground text-sm">
                AI analyzes your preferences, body type, and occasion to suggest the most flattering outfits.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Trend Awareness</h3>
              <p className="text-muted-foreground text-sm">
                Stay current with the latest fashion trends while maintaining your personal style.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Time Saving</h3>
              <p className="text-muted-foreground text-sm">
                Get instant outfit recommendations without spending hours browsing through options.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={16} color="white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Fashion Store
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built By → Karan Kumar • © {new Date()?.getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default AIOutfitRecommendations;