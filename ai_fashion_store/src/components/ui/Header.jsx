import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Shop',
      path: '/product-category-browse',
      icon: 'Store',
      tooltip: 'Browse our fashion collections'
    },
    {
      label: 'AI Stylist',
      path: '/ai-outfit-recommendations',
      icon: 'Sparkles',
      tooltip: 'Get personalized outfit recommendations'
    },
    {
      label: 'Cart',
      path: '/shopping-cart',
      icon: 'ShoppingBag',
      tooltip: 'View your shopping cart'
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement?.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(savedCart?.length);
  }, [location]);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement?.setAttribute('data-theme', newTheme);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/homepage-landing');
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/product-category-browse?search=${encodeURIComponent(searchQuery?.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="w-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} color="white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Synergize Style
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted ${
                  isActiveRoute(item?.path)
                    ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.label === 'Cart' && cartCount > 0 && (
                  <span className="ml-1 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Search & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-64 pr-10"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Search" size={20} />
                </Button>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Cart Icon with Badge */}
            <button
              onClick={() => handleNavigation('/shopping-cart')}
              className="relative p-2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="ShoppingBag" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-4 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="py-4 space-y-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="px-2 pb-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </form>

              {/* Mobile Navigation Items */}
              {navigationItems?.slice(0, 2)?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}

              {/* Mobile Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-foreground hover:bg-muted transition-all duration-200"
              >
                <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
                <span className="font-medium">
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;