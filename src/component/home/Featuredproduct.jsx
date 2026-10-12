import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../../utils/cart";
import bedImg1 from "../../assets/bedroom/bedroom1.jpg";
import livingroomImg1 from "../../assets/livingroom/livingroom1.jpg";
import dinigroomImg1 from "../../assets/diningroom/diningroom1.jpg";
import sofasetImg1 from "../../assets/sofaset/sofaset1.webp";

export const featuredProductsData = [
    {
      id: "f-1",
      name: "Modern Luxury Bedroom Set",
      originalPrice: "$700.00",
      price: "$550.00",
      discount: "-25%",
      image: bedImg1,
      description:
        "Transform your bedroom with a perfect blend of modern design, comfort, and functionality. Elegant finishes and thoughtful details create a calm and luxurious atmosphere. Designed to make your bedroom both stylish and inviting.",
    },
    {
      id: "f-2",
      name: "Luxury Modern Living Room",
      originalPrice: "$1200.00",
      price: "$1000.00",
      discount: "-15%",
      image: livingroomImg1,
      description:
        "Create a sophisticated living space with contemporary furniture designed for comfort and style. Premium finishes and elegant details add a refined touch to your home. Perfect for relaxing, entertaining guests, and enjoying everyday moments.",
    },
    {
      id: "f-3",
      name: "Elegant 6-Seater Dining Set",
      originalPrice: "$1800.00",
      price: "$1500.00",
      discount: "-16%",
      image: dinigroomImg1,
      description:
        "Bring family and friends together around a beautifully designed six-seater dining set. Its spacious design offers comfortable seating with a sophisticated modern appearance. Ideal for everyday meals, celebrations, and memorable gatherings.",
    },
    {
      id: "f-4",
      name: "Elegant L-Shaped Sofa Set",
      originalPrice: "$300.00",
      price: "$250.00",
      discount: "-16%",
      image: sofasetImg1,
      description:
        "Make the most of your living space with a stylish and spacious L-shaped sofa. Designed for generous seating, everyday comfort, and contemporary appeal. A perfect choice for modern homes that value both style and functionality.",
    },
  ];

function Featuredproduct() {

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    const numericPrice = parseFloat(product.price.toString().replace(/[^0-9.]/g, "")) || 0;
    const newItem = {
      id: product.id,
      title: product.name,
      price: numericPrice,
      quantity: 1,
      total: numericPrice,
      image: product.image,
    };

    addToCart(newItem);
    alert("Added to cart!");
  };

  return (
    <section>
      <div className="section-header">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text-heading">
          Featured Products
        </h2>
        <p className="text-text-secondary text-sm max-w-md sm:text-right">
          Discover thoughtfully designed furniture that combines luxury,
          comfort, and functionality. Perfect for creating a refined home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProductsData.map((product) => (
          <div key={product.id} className="flex flex-col group cursor-pointer">
            <Link
              to="/product-detail"
              state={{ product }}
              className="relative h-64 sm:h-80 bg-surface-muted rounded-xl mb-4 overflow-hidden block"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-surface-dark text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                {product.discount}
              </div>
            </Link>

            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <h3 className="text-text-heading font-medium text-lg mb-1 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted text-sm line-through">
                    {product.originalPrice}
                  </span>
                  <span className="text-text-h font-semibold">
                    {product.price}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="text-text hover:text-text-h transition-colors rounded-full border border-border-strong p-1 shrink-0 z-20 relative cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Featuredproduct;
