import React, { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { addToCart } from '../../utils/cart'

function WishlistComponent() {
  const [wishlistItems, setWishlistItems] = useState([])

  const getWishlistKey = () => (localStorage.getItem('token') || localStorage.getItem('isLoggedIn')) ? 'userWishlistItems' : 'guestWishlistItems';

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(getWishlistKey())) || []
    setWishlistItems(items)
  }, [])

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    const numericPrice = parseFloat(product.price.toString().replace(/[^0-9.]/g, '')) || 0;
    const newItem = {
      id: product.id,
      title: product.name,
      price: numericPrice,
      quantity: 1,
      total: numericPrice,
      image: product.image
    };
    
    addToCart(newItem);
    alert('Added to cart!');
  };

  const removeFromWishlist = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    const newWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(newWishlist);
    localStorage.setItem(getWishlistKey(), JSON.stringify(newWishlist));
  };

  return (
    <div className="w-full text-text-heading font-sans mt-6 md:mt-10 mb-16">
      <h2 className="text-2xl sm:text-[28px] font-semibold text-surface-dark mb-6 sm:mb-8">
        Your Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <div className="text-text-secondary">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="flex flex-col group cursor-pointer relative">
              <Link to="/product-detail" state={{ product }} className="relative h-64 sm:h-80 bg-surface-muted rounded-xl mb-4 overflow-hidden block">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-surface-dark text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                  {product.discount}
                </div>
              </Link>
              
              <button 
                onClick={(e) => removeFromWishlist(product.id, e)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-danger rounded-full px-[10px] py-[5px] z-10 transition-colors"
                title="Remove from wishlist"
              >
                ✕
              </button>
              
              <div className="flex justify-between items-start">
                <div className="min-w-0">
                  <h3 className="text-text-heading font-medium text-lg mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-sm line-through">{product.originalPrice}</span>
                    <span className="text-text-h font-semibold">{product.price}</span>
                  </div>
                </div>
                <button onClick={(e) => handleAddToCart(product, e)} className="text-text hover:text-text-h transition-colors rounded-full border border-border-strong p-1 shrink-0 z-20 relative">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WishlistComponent
