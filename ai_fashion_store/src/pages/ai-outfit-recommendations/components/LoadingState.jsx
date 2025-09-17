import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = () => {
  return (
    <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Icon name="Sparkles" size={32} color="white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-primary/20 rounded-full animate-spin mx-auto"></div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            AI Stylist is Working Magic ✨
          </h3>
          <p className="text-muted-foreground">
            Analyzing trends, colors, and your preferences...
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <span>Analyzing fashion trends</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span>Matching colors and styles</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span>Curating perfect outfits</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Our AI considers over 1,000 style combinations to find your perfect match
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;