import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'men',
      name: 'Men',
      description: 'Stylish clothing for modern men',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'women',
      name: 'Women',
      description: 'Elegant fashion for every occasion',
      image: 'https://images.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      id: 'kids',
      name: 'Kids',
      description: 'Comfortable & fun styles for children',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Complete your look with perfect accessories',
      image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/product-category-browse?category=${categoryId}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections designed for every style and occasion
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories?.map((category) => (
            <div
              key={category?.id}
              onClick={() => handleCategoryClick(category?.id)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="morphic-card bg-card overflow-hidden h-80 relative">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category?.image}
                    alt={`${category?.name} fashion category`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category?.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {category?.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {category?.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:text-secondary transition-colors duration-200">
                    <span>Shop Now</span>
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-muted-foreground mb-4">
            Can't decide? Let our AI help you find the perfect style
          </p>
          <button
            onClick={() => navigate('/ai-outfit-recommendations')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <span className="mr-2">🤖</span>
            Get AI Recommendations
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;