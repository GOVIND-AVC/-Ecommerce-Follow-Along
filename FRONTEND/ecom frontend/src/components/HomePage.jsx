/* eslint-disable no-unused-vars */
import React from 'react';
import ProductCard from './ProductCard';
import products from '../data/products';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-450 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
