import React from 'react'
import Header from '../component/navbar/Header'
import Footer from '../component/footer/footer'
import ProductdetailComponent from '../component/product/Productdetail'
import Similarproduct from '../component/product/Similarproduct'

function Productdetail() {
  return (
    <div className="font-sans antialiased text-text-h bg-bg min-h-screen">
      <div className="page-x border-b border-border mb-4 sm:mb-8">
        <Header theme="light" />
      </div>
      
      <div className="w-full page-x">
        <ProductdetailComponent />
        <Similarproduct />
      </div>

      <Footer />
    </div>
  )
}

export default Productdetail
