import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { featuredProductsData } from '../home/Featuredproduct'
import { popularProductsData } from '../home/Popularproducts'
import { similarProductsData } from '../product/Similarproduct'

function Categories() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const currentProducts = [...featuredProductsData, ...popularProductsData, ...similarProductsData];
  const itemsPerPage = 12

  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category')

  const matchCategory = (product, category) => {
    if (!category) return true;
    const searchString = `${product.name} ${product.description || ''} ${product.image}`.toLowerCase();
    if (category === 'bedroom' && (searchString.includes('bed') || searchString.includes('bedroom'))) return true;
    if (category === 'livingroom' && (searchString.includes('living room') || searchString.includes('livingroom') || searchString.includes('living'))) return true;
    if (category === 'diningroom' && (searchString.includes('dining') || searchString.includes('diningroom'))) return true;
    if (category === 'sofaset' && searchString.includes('sofa')) return true;
    return false;
  }

  const filteredProducts = currentProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = matchCategory(p, activeCategory);
    return matchesSearch && matchesCat;
  });
  
  const totalFilteredPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalFilteredPages))
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

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

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'bedroom': return 'Bedroom Furniture'
      case 'livingroom': return 'Living Room Furniture'
      case 'diningroom': return 'Dining Room Furniture'
      case 'sofaset': return 'Sofa Sets'
      default: return 'All Categories'
    }
  }

  return (
    <div className="flex-1 w-full font-sans min-w-0">
      <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text-heading mb-4 sm:mb-6 capitalize">
        {getCategoryTitle()}
      </h2>

      <div className="relative w-full mb-6 sm:mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
             setSearchQuery(e.target.value);
             setCurrentPage(1);
          }}
          placeholder="Search An Item"
          className="w-full border border-border-strong rounded-full py-3 px-6 pr-12 text-sm sm:text-[15px] text-text bg-bg placeholder:text-placeholder focus:outline-none focus:ring-1 focus:ring-border-strong"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-control rounded-full text-white">
          <Search size={16} />
        </button>
      </div>

      <div className="mb-6 sm:mb-8">
        <h4 className="font-heading font-bold text-text-heading text-sm sm:text-[15px] mb-1">
          Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} item(s)
        </h4>
        <p className="text-text-muted text-sm">
          Browse our curated selection of fine furniture pieces.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
        {displayedProducts.map((product) => (
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

            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <h3 className="font-heading text-text-heading font-medium text-base sm:text-lg mb-1 truncate">
                  {product.name}
                </h3>
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

      <div className="flex flex-col items-center gap-4 sm:gap-6 pb-8">
        <span className="text-text-secondary text-sm text-center">
          Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} item(s)
        </span>
        <div className="w-full max-w-64 h-px bg-border-strong"></div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-[14px] font-medium transition-colors border ${currentPage === 1 ? 'text-text-muted border-border cursor-not-allowed' : 'text-text-heading border-border-strong hover:bg-code-bg'}`}
          >
            Previous
          </button>

          {[...Array(totalFilteredPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-[14px] font-medium transition-colors ${currentPage === i + 1 ? 'bg-btn text-white' : 'text-text-heading hover:bg-code-bg'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalFilteredPages || totalFilteredPages === 0}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-[14px] font-medium transition-colors border ${currentPage === totalFilteredPages || totalFilteredPages === 0 ? 'text-text-muted border-border cursor-not-allowed' : 'text-text-heading border-border-strong hover:bg-code-bg'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Categories