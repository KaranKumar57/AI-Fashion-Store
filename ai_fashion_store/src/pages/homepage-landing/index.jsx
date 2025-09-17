import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import AIChatbot from '../../components/ui/AIChatbot';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import TrendingOutfitsCarousel from './components/TrendingOutfitsCarousel';
import Footer from './components/Footer';

const HomepageLanding = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement?.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    // Listen for theme changes
    const handleThemeChange = () => {
      const currentTheme = document.documentElement?.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };

    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer?.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Category Section */}
        <CategorySection />
        
        {/* Trending Outfits Carousel */}
        <TrendingOutfitsCarousel />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default HomepageLanding;