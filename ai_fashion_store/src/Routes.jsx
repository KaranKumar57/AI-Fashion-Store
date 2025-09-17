import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import CheckoutSuccess from './pages/checkout-success';
import HomepageLanding from './pages/homepage-landing';
import ProductCategoryBrowse from './pages/product-category-browse';
import AIOutfitRecommendations from './pages/ai-outfit-recommendations';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIOutfitRecommendations />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/homepage-landing" element={<HomepageLanding />} />
        <Route path="/product-category-browse" element={<ProductCategoryBrowse />} />
        <Route path="/ai-outfit-recommendations" element={<AIOutfitRecommendations />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
