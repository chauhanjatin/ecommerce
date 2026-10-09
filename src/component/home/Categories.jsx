import React from "react";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <section>
      <div className="text-center mb-8 md:mb-10 px-2">
        <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-text-heading mb-3">
          View Our Range Of Categories
        </h2>
        <p className="text-text-secondary text-sm max-w-2xl mx-auto">
          Explore our curated furniture collections, crafted to bring style,
          comfort, and elegance <br /> to every space.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:min-h-[400px] lg:min-h-categories">
        <Link to="/categories?category=bedroom">
          <div className="relative bg-surface-muted rounded-xl overflow-hidden cursor-pointer group min-h-[220px] md:min-h-0 md:h-full">
            <img
              src="https://i.pinimg.com/originals/df/d6/ef/dfd6efcc7f778d4f470195e526bb5cf1.jpg"
              alt="Bedroom"
              className="w-full h-full min-h-[220px] md:min-h-0 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-base sm:text-lg font-medium z-10">
              Bedroom Furniture
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
          </div>
        </Link>

        <div className="flex flex-col gap-4 sm:gap-6 md:h-full">
          <Link to="/categories?category=livingroom" className="relative bg-surface-muted rounded-xl overflow-hidden cursor-pointer group flex-1 min-h-[180px] md:min-h-0 flex flex-col">
            <img
              src="https://www.luxebook.in/wp-content/uploads/2019/08/Image-3-1024x717.jpg"
              alt="Living Room"
              className="w-full h-full min-h-[180px] md:min-h-0 object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
            />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-base sm:text-lg font-medium z-10">
              Living Room Furniture
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
          </Link>
          <Link to="/categories?category=diningroom" className="relative bg-surface-muted rounded-xl overflow-hidden cursor-pointer group flex-1 min-h-[180px] md:min-h-0 flex flex-col">
            <img
              src="https://ikiru.in/cdn/shop/files/buy-dining-furniture-set-anish-dining-table-with-6-wayane-chair-without-arms-by-orange-tree-on-ikiru-online-store-1.jpg?v=1739208434"
              alt="Dining Room"
              className="w-full h-full min-h-[180px] md:min-h-0 object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
            />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-base sm:text-lg font-medium z-10">
              Dinning Room Furniture
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
          </Link>
        </div>

        <Link to="/categories?category=sofaset">
          <div className="relative bg-surface-muted rounded-xl overflow-hidden cursor-pointer group min-h-[220px] md:min-h-0 md:h-full">
            <img
              src="https://www.betterhomeindia.com/wp-content/uploads/2026/01/Chinstown-sofaset.jpg"
              alt="Sofa Sets"
              className="w-full h-full min-h-[220px] md:min-h-0 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-base sm:text-lg font-medium z-10">
              Sofa Sets
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Categories;
