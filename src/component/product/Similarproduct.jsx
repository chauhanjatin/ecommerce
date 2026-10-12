import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../../utils/cart";
import img1 from "../../assets/bedroom/bedroom4.png";
import img1_2 from "../../assets/bedroom/bedroom4(2).jpg";
import img1_3 from "../../assets/bedroom/bedroom4(3).jpg";
import img2 from "../../assets/diningroom/diningroom4.png";
import img2_2 from "../../assets/diningroom/diningroom4(2).jpg";
import img2_3 from "../../assets/diningroom/diningroom4(3).jpg";
import img3 from "../../assets/livingroom/livingroom4.webp";
import img3_2 from "../../assets/livingroom/livingroom4(2).jpg";
import img3_3 from "../../assets/livingroom/livingroom4(3).jpg";
import img4 from "../../assets/sofaset/sofaset4.jpg";
import img4_2 from "../../assets/sofaset/sofaset4(2).jpg";
import img4_3 from "../../assets/sofaset/sofaset4(3).jpg";

export const similarProductsData = [
  {
    id: "sim-1",
    name: "Elegant Minimalist Bedroom Furniture",
    originalPrice: "$40.00",
    price: "$25.00",
    discount: "-37%",
    image: img1,
    galleryImages: [img1, img1_2, img1_3],
    description: "Create a peaceful bedroom with minimalist furniture featuring clean lines and refined details. Its simple design brings functionality and elegance without overwhelming your space. Perfect for contemporary bedrooms that value comfort and understated style."
  },
  {
    id: "sim-2",
    name: "Contemporary Wooden Dining Collection",
    originalPrice: "$90.00",
    price: "$75.00",
    discount: "-16%",
    image: img2,
    galleryImages: [img2, img2_2, img2_3],
    description: "Enhance your dining area with contemporary wooden furniture crafted for modern homes. Natural textures and clean silhouettes create a warm yet sophisticated look. Designed to combine everyday durability, comfort, and timeless elegance."
  },
  {
    id: "sim-3",
    name: "Elegant Modern Living Room Furniture",
    originalPrice: "$200.00",
    price: "$175.00",
    discount: "-12%",
    image: img3,
    galleryImages: [img3, img3_2, img3_3],
    description: "Refresh your living room with furniture that blends contemporary design with everyday comfort. Elegant finishes and stylish silhouettes create a sophisticated and welcoming atmosphere. Perfect for modern interiors designed around relaxation and entertaining."
  },
  {
    id: "sim-4",
    name: "Modern Fabric Sofa Collection",
    originalPrice: "$450.00",
    price: "$400.00",
    discount: "-11%",
    image: img4,
    galleryImages: [img4, img4_2, img4_3],
    description: "Add softness and contemporary style to your living room with our modern fabric sofa collection. Comfortable upholstery and refined designs create an inviting space for everyday relaxation. Choose from stylish silhouettes that complement a variety of modern interiors."
  }
];

function Similarproduct() {
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
    <div className="w-full py-10 md:py-20 font-sans">
      <h2 className="font-heading text-xl sm:text-2xl font-semibold text-text-heading mb-6 sm:mb-10">
        Similar Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProductsData.map((product) => (
          <div key={product.id} className="flex flex-col group cursor-pointer">
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

            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <h3 className="font-heading text-text-heading font-medium text-[17px] mb-1 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted text-sm line-through">
                    {product.originalPrice}
                  </span>
                  <span className="text-text-h text-[15px] font-semibold">
                    {product.price}
                  </span>
                </div>
              </div>
              <button onClick={(e) => handleAddToCart(product, e)} className="text-text hover:text-text-h transition-colors rounded-full border border-border-strong p-1 shrink-0 z-20 relative cursor-pointer">
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Similarproduct;
