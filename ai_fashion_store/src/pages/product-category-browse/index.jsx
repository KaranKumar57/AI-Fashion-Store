import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AIChatbot from '../../components/ui/AIChatbot';
import CategoryFilter from './components/CategoryFilter';
import SortControls from './components/SortControls';
import ProductGrid from './components/ProductGrid';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';

const ProductCategoryBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Classic Denim Jacket",
      brand: "Urban Style",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      category: "men",
      rating: 4.5,
      isNew: false,
      description: "Timeless denim jacket perfect for layering. Made from premium cotton denim with classic styling."
    },
    {
      id: 2,
      name: "Floral Summer Dress",
      brand: "Bloom & Co",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
      category: "women",
      rating: 4.8,
      isNew: true,
      description: "Beautiful floral print dress perfect for summer occasions. Lightweight and comfortable fabric."
    },
    {
      id: 3,
      name: "Leather Crossbody Bag",
      brand: "Luxe Leather",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "accessories",
      rating: 4.7,
      isNew: false,
      description: "Premium leather crossbody bag with adjustable strap. Perfect for everyday use."
    },
    {
      id: 4,
      name: "Kids Rainbow T-Shirt",
      brand: "Little Stars",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop",
      category: "kids",
      rating: 4.6,
      isNew: true,
      description: "Colorful rainbow design t-shirt for kids. Made from soft, breathable cotton."
    },
    {
      id: 5,
      name: "Casual Sneakers",
      brand: "ComfortWalk",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      category: "men",
      rating: 4.4,
      isNew: false,
      description: "Comfortable casual sneakers with premium cushioning. Perfect for everyday wear."
    },
    {
      id: 6,
      name: "Elegant Blazer",
      brand: "Professional Plus",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      category: "women",
      rating: 4.9,
      isNew: false,
      description: "Sophisticated blazer perfect for professional settings. Tailored fit with premium fabric."
    },
    {
      id: 7,
      name: "Designer Sunglasses",
      brand: "Shade Co",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      category: "accessories",
      rating: 4.3,
      isNew: true,
      description: "Stylish designer sunglasses with UV protection. Classic frame design."
    },
    {
      id: 8,
      name: "Kids Denim Overalls",
      brand: "Little Denim",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop",
      category: "kids",
      rating: 4.5,
      isNew: false,
      description: "Adorable denim overalls for kids. Adjustable straps and comfortable fit."
    },
    {
      id: 9,
      name: "Wool Sweater",
      brand: "Cozy Knits",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
      category: "men",
      rating: 4.6,
      isNew: true,
      description: "Warm wool sweater perfect for cold weather. Classic crew neck design."
    },
    {
      id: 10,
      name: "Silk Scarf",
      brand: "Elegant Touch",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
      category: "accessories",
      rating: 4.8,
      isNew: false,
      description: "Luxurious silk scarf with beautiful pattern. Versatile accessory for any outfit."
    },
    {
      id: 11,
      name: "Athletic Leggings",
      brand: "FitWear",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1506629905607-d9d36c2b3f5d?w=400&h=400&fit=crop",
      category: "women",
      rating: 4.7,
      isNew: true,
      description: "High-performance athletic leggings with moisture-wicking fabric. Perfect for workouts."
    },
    {
      id: 12,
      name: "Kids Sneakers",
      brand: "Active Kids",
      price: 54.99,
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=400&fit=crop",
      category: "kids",
      rating: 4.4,
      isNew: false,
      description: "Comfortable sneakers for active kids. Durable construction with fun colors."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: 'Grid3X3' },
    { id: 'men', name: "Men\'s Fashion", icon: 'User' },
    { id: 'women', name: "Women\'s Fashion", icon: 'Users' },
    { id: 'kids', name: 'Kids Fashion', icon: 'Baby' },
    { id: 'accessories', name: 'Accessories', icon: 'Watch' }
  ];

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams?.get('category') || 'all';
    const searchParam = searchParams?.get('search') || '';
    
    setSelectedCategory(categoryParam);
    setSearchQuery(searchParam);
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    const filterAndSortProducts = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filtered = [...mockProducts];

      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered?.filter(product => product?.category === selectedCategory);
      }

      // Filter by search query
      if (searchQuery?.trim()) {
        const query = searchQuery?.toLowerCase()?.trim();
        filtered = filtered?.filter(product =>
          product?.name?.toLowerCase()?.includes(query) ||
          product?.brand?.toLowerCase()?.includes(query) ||
          product?.description?.toLowerCase()?.includes(query)
        );
      }

      // Sort products
      filtered?.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a?.price - b?.price;
          case 'price-high':
            return b?.price - a?.price;
          case 'newest':
            return b?.isNew - a?.isNew;
          case 'rating':
            return b?.rating - a?.rating;
          case 'name':
            return a?.name?.localeCompare(b?.name);
          case 'popularity':
          default:
            return b?.rating - a?.rating; // Use rating as popularity proxy
        }
      });

      setFilteredProducts(filtered);
      setIsLoading(false);
    };

    filterAndSortProducts();
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const newParams = new URLSearchParams(searchParams);
    
    if (categoryId === 'all') {
      newParams?.delete('category');
    } else {
      newParams?.set('category', categoryId);
    }
    
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    
    if (query?.trim()) {
      newParams?.set('search', query?.trim());
    } else {
      newParams?.delete('search');
    }
    
    setSearchParams(newParams);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation 
          currentCategory={selectedCategory}
          searchQuery={searchQuery}
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Sort Controls */}
        <SortControls
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          totalProducts={filteredProducts?.length}
          isLoading={isLoading}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          viewMode={viewMode}
          isLoading={isLoading}
        />
      </main>
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default ProductCategoryBrowse;