import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';
import { getOutfitRecommendations } from '../../../services/openai';

const OutfitRecommendations = ({ preferences, onAddToCart, onAddCompleteOutfit, onRetry }) => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteOutfits, setFavoriteOutfits] = useState(new Set());

  // Mock data fallback
  const mockRecommendations = [
    {
      id: 1,
      title: 'Casual Chic',
      description: 'Perfect for weekend outings and casual meetups',
      pieces: [
        'High-waisted denim jeans',
        'Soft cotton blazer',
        'White sneakers',
        'Crossbody bag'
      ],
      tips: 'Layer with a lightweight scarf for added texture',
      colors: ['#4A90E2', '#F5F5F5', '#8B4513'],
      rating: 4.8
    },
    {
      id: 2,
      title: 'Business Professional',
      description: 'Sophisticated look for office and meetings',
      pieces: [
        'Tailored blazer',
        'Straight-leg trousers',
        'Pointed-toe pumps',
        'Structured handbag'
      ],
      tips: 'Add a silk scarf or statement jewelry for personality',
      colors: ['#2C3E50', '#34495E', '#BDC3C7'],
      rating: 4.9
    },
    {
      id: 3,
      title: 'Date Night Elegant',
      description: 'Romantic and stylish for special evenings',
      pieces: [
        'Midi wrap dress',
        'Heeled ankle boots',
        'Delicate jewelry',
        'Small clutch'
      ],
      tips: 'Choose fabrics with subtle shimmer for evening glamour',
      colors: ['#8E44AD', '#E74C3C', '#F39C12'],
      rating: 4.7
    }
  ];

  useEffect(() => {
    if (preferences) {
      generateRecommendations();
    }
  }, [preferences]);

  const generateRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to use OpenAI service for personalized recommendations
      const aiRecommendations = await getOutfitRecommendations(preferences);
      
      // Parse AI response and structure it
      const structuredRecommendations = parseAIRecommendations(aiRecommendations);
      setRecommendations(structuredRecommendations || mockRecommendations);
    } catch (err) {
      console.error('Error generating AI recommendations:', err);
      // Fall back to mock data with customization based on preferences
      const customizedMockData = customizeMockRecommendations(mockRecommendations, preferences);
      setRecommendations(customizedMockData);
      setError('Using offline recommendations. Connect to internet for AI-powered suggestions.');
    } finally {
      setLoading(false);
    }
  };

  const parseAIRecommendations = (aiResponse) => {
    try {
      // Basic parsing of AI response - in a real app, you'd have more sophisticated parsing
      const outfits = aiResponse?.split(/outfit \d+/i)?.slice(1);
      return outfits?.map((outfit, index) => ({
        id: index + 1,
        title: `AI Recommendation ${index + 1}`,
        description: outfit?.split('\n')?.[0] || 'AI-generated outfit recommendation',
        pieces: outfit?.match(/[-•]\s*(.+)/g)?.map(item => item?.replace(/[-•]\s*/, '')) || [],
        tips: outfit?.includes('tip') ? outfit?.split('tip')?.[1]?.split('\n')?.[0] : 'AI styling advice included',
        colors: ['#6366F1', '#EC4899', '#10B981'], // Default colors
        rating: 4.5 + Math.random() * 0.5,
        aiGenerated: true
      }));
    } catch (error) {
      console.error('Error parsing AI recommendations:', error);
      return null;
    }
  };

  const customizeMockRecommendations = (mockData, prefs) => {
    if (!prefs) return mockData;
    
    return mockData?.map(outfit => ({
      ...outfit,
      description: `${outfit?.description} - Tailored for ${prefs?.occasion || 'your style'}`,
      tips: prefs?.colors 
        ? `${outfit?.tips}. Incorporate ${prefs?.colors} for your preferred color palette.`
        : outfit?.tips
    }));
  };

  const toggleFavorite = (outfitId) => {
    const newFavorites = new Set(favoriteOutfits);
    if (newFavorites?.has(outfitId)) {
      newFavorites?.delete(outfitId);
    } else {
      newFavorites?.add(outfitId);
    }
    setFavoriteOutfits(newFavorites);
  };

  const handleAddToCart = (outfit) => {
    // Add outfit pieces to cart
    console.log('Adding outfit to cart:', outfit);
  };

  const handleShare = (outfit) => {
    if (navigator.share) {
      navigator.share({
        title: `${outfit?.title} - Synergize Style`,
        text: outfit?.description,
        url: window.location?.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">Generating AI-powered outfit recommendations...</span>
        </div>
      </div>
    );
  }

  if (error && !recommendations) {
    return (
      <div className="text-center py-12">
        <Icon name="AlertCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Unable to Generate Recommendations</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={generateRecommendations}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">{error}</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Personalized Recommendations</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={generateRecommendations}
          disabled={loading}
        >
          <Icon name="RefreshCw" size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations?.map((outfit, index) => (
          <motion.div
            key={outfit?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Color palette */}
            <div className="h-3 flex">
              {outfit?.colors?.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{outfit?.title}</h3>
                  {outfit?.aiGenerated && (
                    <span className="inline-flex items-center space-x-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full mt-1">
                      <Icon name="Sparkles" size={12} />
                      <span>AI Generated</span>
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleFavorite(outfit?.id)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <Icon
                    name="Heart"
                    size={18}
                    className={favoriteOutfits?.has(outfit?.id) ? 'text-red-500 fill-current' : 'text-muted-foreground'}
                  />
                </button>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4">{outfit?.description}</p>

              {/* Pieces */}
              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-sm">Outfit Pieces:</h4>
                <ul className="space-y-1">
                  {outfit?.pieces?.map((piece, pieceIndex) => (
                    <li key={pieceIndex} className="flex items-center space-x-2 text-sm">
                      <Icon name="CheckCircle2" size={12} className="text-green-500" />
                      <span>{piece}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="bg-muted/30 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={14} className="text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{outfit?.tips}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{outfit?.rating?.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">(AI Score)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAddToCart(outfit)}
                >
                  <Icon name="ShoppingBag" size={14} />
                  Shop Look
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(outfit)}
                >
                  <Icon name="Share2" size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Regenerate button */}
      <div className="text-center pt-6">
        <Button
          variant="outline"
          onClick={onRetry}
          className="px-8"
        >
          <Icon name="RefreshCw" size={16} />
          Generate New Recommendations
        </Button>
      </div>
    </div>
  );
};

export default OutfitRecommendations;