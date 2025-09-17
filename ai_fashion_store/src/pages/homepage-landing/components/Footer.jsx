import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    shop: [
      { label: 'Men', path: '/product-category-browse?category=men' },
      { label: 'Women', path: '/product-category-browse?category=women' },
      { label: 'Kids', path: '/product-category-browse?category=kids' },
      { label: 'Accessories', path: '/product-category-browse?category=accessories' }
    ],
    features: [
      { label: 'AI Stylist', path: '/ai-outfit-recommendations' },
      { label: 'Trending Outfits', path: '/homepage-landing' },
      { label: 'Shopping Cart', path: '/shopping-cart' }
    ],
    support: [
      { label: 'Size Guide', path: '#' },
      { label: 'Returns', path: '#' },
      { label: 'Shipping Info', path: '#' },
      { label: 'Contact Us', path: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Pinterest', icon: 'Heart', url: '#' }
  ];

  const handleLinkClick = (path) => {
    if (path?.startsWith('#')) {
      return; // Handle external or anchor links
    }
    navigate(path);
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={20} color="white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI Fashion Store
                </span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Discover your perfect style with AI-powered fashion recommendations. 
                Shop the latest trends with personalized styling assistance.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    aria-label={social?.name}
                  >
                    <Icon 
                      name={social?.icon} 
                      size={18} 
                      className="text-muted-foreground group-hover:text-white transition-colors duration-200" 
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Shop</h3>
              <ul className="space-y-3">
                {footerLinks?.shop?.map((link) => (
                  <li key={link?.label}>
                    <button
                      onClick={() => handleLinkClick(link?.path)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-3">
                {footerLinks?.features?.map((link) => (
                  <li key={link?.label}>
                    <button
                      onClick={() => handleLinkClick(link?.path)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks?.support?.map((link) => (
                  <li key={link?.label}>
                    <button
                      onClick={() => handleLinkClick(link?.path)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                    >
                      {link?.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Stay Updated</h3>
              <p className="text-muted-foreground text-sm">Get the latest fashion trends and AI styling tips</p>
            </div>
            
            <div className="flex w-full md:w-auto max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-l-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>&copy; {currentYear} AI Fashion Store. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Built By →</span>
              <span className="font-semibold text-primary">Karan Kumar</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;