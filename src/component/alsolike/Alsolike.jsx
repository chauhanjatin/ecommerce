import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { similarProductsData } from "../product/Similarproduct";
import { addToCart } from "../../utils/cart";

function Alsolike() {
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

  return (
    <div className="w-full mt-12 md:mt-24 mb-10 md:mb-20">
      <h2 className="text-2xl sm:text-[28px] font-semibold text-surface-dark mb-6 sm:mb-8">
        You May Also Like
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProductsData.map((product) => (
          <div key={product.id} className="flex flex-col group cursor-pointer">
            <Link to="/product-detail" state={{ product }} className="relative aspect-[4/5] bg-surface-muted rounded-xl mb-4 overflow-hidden block">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-surface-dark text-white text-[11px] font-semibold px-2.5 py-1 rounded-full z-10">
                {product.discount}
              </div>
            </Link>
            <div className="flex justify-between items-start mt-1">
              <div className="min-w-0">
                <h3 className="text-text-heading text-[15px] mb-1 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted text-[13px] line-through">
                    {product.originalPrice}
                  </span>
                  <span className="text-text-h text-[13px] font-semibold">
                    {product.price}
                  </span>
                </div>
              </div>
              <button onClick={(e) => handleAddToCart(product, e)} className="text-text hover:text-text-h transition-colors rounded-full border border-border-strong p-0.5 mt-1 shrink-0 z-20 relative cursor-pointer">
                <Plus size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alsolike;
