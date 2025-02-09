/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ image, name, price, description }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <p className="text-gray-700">{description}</p>
      <p className="text-lg font-semibold mt-2">${price}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded transition-transform transform hover:bg-blue-600 active:scale-95">

        Add to Cart
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductCard;
