import React from 'react'
import { Plus, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import img1 from '../../assets/diningroom/diningroom2.webp'
import img1_2 from '../../assets/diningroom/diningroom2(2).jpg'
import img1_3 from '../../assets/diningroom/diningroom2(3).jpg'
import img2 from '../../assets/bedroom/bedroom3.jpg'
import img2_2 from '../../assets/bedroom/bedroom3(2).jpg'
import img2_3 from '../../assets/bedroom/bedroom3(3).jpg'
import img3 from '../../assets/sofaset/sofaset3.webp'
import img3_2 from '../../assets/sofaset/sofaset3(2).jpg'
import img3_3 from '../../assets/sofaset/sofaset3(3).jpg'
import img4 from '../../assets/livingroom/livingroom3.jpg'
import img4_2 from '../../assets/livingroom/livingroom3(2).jpg'
import img4_3 from '../../assets/livingroom/livingroom3(3).jpg'
import img5 from '../../assets/diningroom/diningroom3.jpg'
import img5_2 from '../../assets/diningroom/diningroom3(2).jpg'
import img5_3 from '../../assets/diningroom/diningroom3(3).jpg'
import img6 from '../../assets/livingroom/livingroom2.webp'
import img6_2 from '../../assets/livingroom/livingroom2(2).jpg'
import img6_3 from '../../assets/livingroom/livingroom2(3).jpg'
import img7 from '../../assets/sofaset/sofaset2.jpg'
import img7_2 from '../../assets/sofaset/sofaset2(2).jpg'
import img7_3 from '../../assets/sofaset/sofaset2(3).jpg'
import img8 from '../../assets/bedroom/bedroom2.webp'
import img8_2 from '../../assets/bedroom/bedroom2(2).jpg'
import img8_3 from '../../assets/bedroom/bedroom2(3).jpg'
export const popularProductsData = [
    {
      id: "pop-1",
      name: "Traditional Minimalist Dining Table Set",
      originalPrice: "$450.00",
      price: "$350.00",
      discount: "-22%",
      image: img1,
      galleryImages: [img1, img1_2, img1_3],
      description: "Add timeless charm to your dining area with a clean and minimalist traditional design. Simple lines and refined craftsmanship create an elegant yet welcoming atmosphere. Perfect for homes that appreciate understated beauty and practical functionality."
    },
    {
      id: "pop-2",
      name: "Premium King Size Bedroom Set",
      originalPrice: "$850.00",
      price: "$650.00",
      discount: "-23%",
      image: img2,
      galleryImages: [img2, img2_2, img2_3],
      description: "Enjoy spacious comfort with a premium king-size bedroom collection designed for modern living. Elegant craftsmanship and sophisticated finishes bring luxury to your personal space. Create a relaxing bedroom retreat with furniture made for comfort and style."
    },
    {
      id: "pop-3",
      name: "Luxury 3-Seater Sofa Set",
      originalPrice: "$1500.00",
      price: "$1250.00",
      discount: "-16%",
      image: img3,
      galleryImages: [img3, img3_2, img3_3],
      description: "Experience comfortable seating with a beautifully crafted three-seater sofa designed for modern interiors. Premium upholstery and elegant detailing provide a sophisticated look and feel. Perfect for creating a cozy and stylish living room."
    },
    {
      id: "pop-4",
      name: "Luxury Contemporary Living Space",
      originalPrice: "$250.00",
      price: "$210.00",
      discount: "-16%",
      image: img4,
      galleryImages: [img4, img4_2, img4_3],
      description: "Create an inviting home with contemporary furniture that combines comfort, elegance, and functionality. Modern silhouettes and premium finishes bring a sophisticated character to every room. Designed for homeowners who appreciate timeless style with a modern touch."
    },
    {
      id: "pop-5",
      name: "Premium Dining Room Furniture",
      originalPrice: "$600.00",
      price: "$409.00",
      discount: "-18%",
      image: img5,
      galleryImages: [img5, img5_2, img5_3],
      description: "Elevate your dining area with premium furniture designed for lasting style and everyday comfort. Beautiful finishes and thoughtful designs create a polished and welcoming dining environment. Perfect for family meals, gatherings, and special occasions."
    },
    {
      id: "pop-6",
      name: "Minimalist Living Room Collection",
      originalPrice: "$1200.00",
      price: "$990.00",
      discount: "-17%",
      image: img6,
      galleryImages: [img6, img6_2, img6_3],
      description: "Embrace clean lines and effortless elegance with our minimalist living room collection. Thoughtfully designed pieces provide comfort while keeping your space open and uncluttered. Ideal for contemporary interiors focused on simplicity and functionality."
    },
    {
      id: "pop-7",
      name: "Sheesham Wood Sofa Set",
      originalPrice: "$4300.00",
      price: "$2909.00",
      discount: "-13%",
      image: img7,
      galleryImages: [img7, img7_2, img7_3],
      description: "Bring natural warmth and timeless character to your living room with a Sheesham wood sofa set. Strong wooden construction and beautiful natural grain create a premium appearance. A perfect combination of traditional craftsmanship, durability, and modern comfort."
    },
    {
      id: "pop-8",
      name: "Classic Wooden Bedroom Suite",
      originalPrice: "$350.00",
      price: "$300.00",
      discount: "-14%",
      image: img8,
      galleryImages: [img8, img8_2, img8_3],
      description: "Add timeless elegance to your bedroom with a beautifully crafted classic wooden suite. Rich wooden textures and traditional detailing create a warm and sophisticated atmosphere. Designed for lasting appeal, comfort, and everyday functionality."
    }
  ];

function Popularproducts() {
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    e.preventDefault();
    const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    const newItem = {
      id: product.id,
      title: product.name,
      price: numericPrice,
      quantity: 1,
      total: numericPrice,
      image: product.image
    };
    
    const existingItemIndex = currentCart.findIndex(item => item.id === newItem.id);
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
      currentCart[existingItemIndex].total = currentCart[existingItemIndex].quantity * currentCart[existingItemIndex].price;
    } else {
      currentCart.push(newItem);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(currentCart));
    alert('Added to cart!');
  };

  return (
    <section>
      <div className="section-header"> 
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text-heading mb-2">Most Popular Products</h2>
          <p className="text-text-secondary text-sm max-w-md">
          Discover our most-loved furniture pieces, chosen for their comfort and quality. Find popular designs that effortlessly bring elegance and functionality to every room.
          </p>
        </div>
        <Link to="/products" className="flex items-center justify-center gap-2 bg-btn hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors w-full sm:w-auto shrink-0">
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {popularProductsData.map((product) => (
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
                <h3 className="text-text-heading font-medium text-lg mb-1 truncate">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted text-sm line-through">{product.originalPrice}</span>
                  <span className="text-text-h font-semibold">{product.price}</span>
                </div>
              </div>
              <button onClick={(e) => handleAddToCart(product, e)} className="text-text hover:text-text-h transition-colors rounded-full border border-border-strong p-1 shrink-0 z-20 relative cursor-pointer">
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Popularproducts