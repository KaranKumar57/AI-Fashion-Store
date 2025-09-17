import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/product-category-browse');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-sky-300/30 to-blue-400/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-indigo-300/30 to-purple-400/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-300/20 to-sky-400/20 rounded-full blur-lg animate-bounce"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered Fashion
            </span>
            <br />
            <span className="text-foreground">
              at Your Fingertips
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover your perfect style with our intelligent fashion assistant. 
            Get personalized outfit recommendations tailored just for you.
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Button
              variant="default"
              size="xl"
              onClick={handleStartShopping}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold px-12 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Shopping
            </Button>
          </div>
          
          {/* Features Preview */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="font-semibold text-foreground">AI Stylist</h3>
              <p className="text-sm text-muted-foreground">Personalized recommendations</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-xl">👗</span>
              </div>
              <h3 className="font-semibold text-foreground">Trending Styles</h3>
              <p className="text-sm text-muted-foreground">Latest fashion trends</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-xl">✨</span>
              </div>
              <h3 className="font-semibold text-foreground">Smart Shopping</h3>
              <p className="text-sm text-muted-foreground">Effortless experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;