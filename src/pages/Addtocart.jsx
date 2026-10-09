import React from 'react'
import Header from '../component/navbar/Header'
import Footer from '../component/footer/footer'
import AddtocartComponent from '../component/cart/Addtocart'
import Alsolike from '../component/alsolike/Alsolike'

function Addtocart() {
  return (
    <div className="font-sans antialiased text-text-heading bg-surface min-h-screen">
      <div className="page-x border-b border-border mb-4 sm:mb-8">
        <Header theme="light" />
      </div>
      
      <div className="w-full page-x">
        <AddtocartComponent />
        <Alsolike />
      </div>

      <Footer />
    </div>
  )
}

export default Addtocart