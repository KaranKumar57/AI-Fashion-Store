import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TrendingOutfitsCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const trendingOutfits = [
    {
      id: 1,
      title: "Casual Weekend Vibes",
      description: "Perfect for brunch dates and casual outings",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$89.99",
      originalPrice: "$120.00",
      items: ["Denim Jacket", "White Tee", "High-waist Jeans", "Sneakers"],
      badge: "Trending"
    },
    {
      id: 2,
      title: "Office Chic",
      description: "Professional yet stylish for the modern workplace",
      image: "https://images.pixabay.com/photo/2016/11/29/20/22/girl-1871104_1280.jpg?auto=compress&cs=tinysrgb&w=800",
      price: "$149.99",
      originalPrice: "$200.00",
      items: ["Blazer", "Silk Blouse", "Tailored Pants", "Heels"],
      badge: "Best Seller"
    },
    {
      id: 3,
      title: "Date Night Elegance",
      description: "Sophisticated look for special evenings",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      price: "$199.99",
      originalPrice: "$280.00",
      items: ["Little Black Dress", "Statement Jewelry", "Clutch", "Heels"],
      badge: "New"
    },
    {
      id: 4,
      title: "Street Style Cool",
      description: "Urban fashion with an edge",
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: "$119.99",
      originalPrice: "$160.00",
      items: ["Leather Jacket", "Graphic Tee", "Ripped Jeans", "Boots"],
      badge: "Hot"
    },
    {
      id: 5,
      title: "Summer Breeze",
      description: "Light and airy for warm weather",
      image: "https://images.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg?auto=compress&cs=tinysrgb&w=800",
      price: "$79.99",
      originalPrice: "$110.00",
      items: ["Flowy Dress", "Sandals", "Sun Hat", "Tote Bag"],
      badge: "Summer"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingOutfits?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingOutfits?.length) % trendingOutfits?.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleQuickAdd = (outfit) => {
    // Add outfit to cart logic would go here
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const outfitItem = {
      id: `outfit-${outfit?.id}`,
      name: outfit?.title,
      price: parseFloat(outfit?.price?.replace('$', '')),
      image: outfit?.image,
      type: 'outfit',
      items: outfit?.items,
      quantity: 1
    };
    
    const existingItem = cart?.find(item => item?.id === outfitItem?.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart?.push(outfitItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success feedback
    alert(`${outfit?.title} added to cart!`);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentSlide]);

  const getBadgeColor = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'trending': return 'bg-gradient-to-r from-pink-500 to-rose-500';
      case 'best seller': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'new': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'hot': return 'bg-gradient-to-r from-red-500 to-orange-500';
      case 'summer': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Trending Outfits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest fashion combinations curated by our AI stylist
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {trendingOutfits?.map((outfit) => (
                <div key={outfit?.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px]">
                    {/* Image Side */}
                    <div className="relative order-2 lg:order-1">
                      <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden group">
                        <Image
                          src={outfit?.image}
                          alt={outfit?.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Badge */}
                        <div className={`absolute top-4 left-4 ${getBadgeColor(outfit?.badge)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                          {outfit?.badge}
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-6 order-1 lg:order-2">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                          {outfit?.title}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {outfit?.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-primary">
                          {outfit?.price}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          {outfit?.originalPrice}
                        </span>
                        <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
                          Save {Math.round(((parseFloat(outfit?.originalPrice?.replace('$', '')) - parseFloat(outfit?.price?.replace('$', ''))) / parseFloat(outfit?.originalPrice?.replace('$', ''))) * 100)}%
                        </span>
                      </div>

                      {/* Items Included */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">This outfit includes:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {outfit?.items?.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Icon name="Check" size={16} className="text-success" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          variant="default"
                          size="lg"
                          onClick={() => handleQuickAdd(outfit)}
                          className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 flex-1"
                          iconName="ShoppingBag"
                          iconPosition="left"
                        >
                          Quick Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => navigate('/product-category-browse')}
                          iconName="Eye"
                          iconPosition="left"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/90 hover:bg-background border border-border rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/90 hover:bg-background border border-border rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {trendingOutfits?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-primary scale-125' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/ai-outfit-recommendations')}
            iconName="Sparkles"
            iconPosition="left"
          >
            Get Personalized Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingOutfitsCarousel;