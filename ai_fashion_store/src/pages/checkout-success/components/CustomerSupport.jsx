import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerSupport = () => {
  const supportOptions = [
    {
      title: "Order Tracking",
      description: "Track your package in real-time",
      icon: "Truck",
      action: "Track Order",
      color: "text-primary"
    },
    {
      title: "Customer Service",
      description: "Get help from our support team",
      icon: "Headphones",
      action: "Contact Support",
      color: "text-accent"
    },
    {
      title: "Return Policy",
      description: "Easy 30-day returns & exchanges",
      icon: "RotateCcw",
      action: "View Policy",
      color: "text-success"
    },
    {
      title: "Size Guide",
      description: "Find your perfect fit",
      icon: "Ruler",
      action: "Size Guide",
      color: "text-warning"
    }
  ];

  const handleSupportAction = (action) => {
    // Mock support actions
    console.log(`Support action: ${action}`);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
        Need Help?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {supportOptions?.map((option, index) => (
          <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-background ${option?.color}`}>
                <Icon name={option?.icon} size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm mb-1">{option?.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{option?.description}</p>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleSupportAction(option?.action)}
                  className="text-xs p-0 h-auto font-medium hover:bg-transparent"
                >
                  {option?.action} →
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={18} color="white" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground text-sm mb-1">AI Stylist Available 24/7</h4>
            <p className="text-xs text-muted-foreground">
              Have styling questions? Our AI assistant is here to help!
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Sparkles"
            iconPosition="left"
          >
            Chat Now
          </Button>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Mail" size={16} />
            <span>support@aifashionstore.com</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Phone" size={16} />
            <span>1-800-FASHION</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;