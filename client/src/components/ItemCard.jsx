// client/src/components/ItemCard.jsx

import { Link } from 'react-router-dom';

/**
 * A reusable card component to display a single item.
 * Includes the hover-to-scale animation and theme-consistent styling.
 */
export default function ItemCard({ item }) {
  // Helper to format the price, you can adjust as needed
  const formatPrice = (price) => {
    if (typeof price !== 'number') {
      return 'Price not set';
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <Link 
      to={`/item/${item._id}`} // Link to a future item details page
      className='group block bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'
    >
      {/* Item Image */}
      <img 
        src={(item.imageUrls && item.imageUrls[0]) || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEbmNxhl6aFUDwBtyelBzun4EnBJLblVb56w&s'}
        alt={item.name}
        className='w-full h-48 object-cover'
      />
      
      {/* Item Details */}
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-200 truncate'>
          {item.name}
        </h3>
        <p className='text-sm text-gray-600 mt-1'>{item.category}</p>
        <p className='text-lg font-bold text-gray-800 mt-2'>
          {formatPrice(item.price)}
        </p>
      </div>
    </Link>
  );
}