import React, { useState } from 'react'
import Header from '../component/navbar/Header'
import Footer from '../component/footer/footer'
import Filter from '../component/filter/Filter'
import Productpage from '../component/product/Productpage'
import { SlidersHorizontal } from 'lucide-react'

function Productspage() {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className="font-sans antialiased text-text-h bg-bg min-h-screen">
      <div className="page-x border-b border-border">
        <Header theme="light" />
      </div>

      <div className="w-full page-x py-6 md:py-page-y flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            className="flex items-center gap-2 w-full justify-center border border-border rounded-full py-3 text-sm font-medium text-text-heading hover:bg-code-bg transition-colors"
          >
            <SlidersHorizontal size={18} />
            {filterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <aside className={`w-full lg:w-1/4 shrink-0 ${filterOpen ? 'block' : 'hidden lg:block'}`}>
          <Filter />
        </aside>

        <main className="w-full lg:w-3/4 min-w-0">
          <Productpage />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Productspage
