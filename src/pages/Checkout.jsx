import React from 'react'
import Header from '../component/navbar/Header'
import Footer from '../component/footer/footer'
import CheckoutComponent from '../component/checkout/Checkout'

function Checkout() {
  return (
    <div className="font-sans antialiased text-text-heading bg-surface min-h-screen flex flex-col">
      <div className="page-x border-b border-border mb-4 sm:mb-8">
        <Header theme="light" />
      </div>
      
      <main className="flex-1 w-full page-x">
        <CheckoutComponent />
      </main>

      <Footer />
    </div>
  )
}

export default Checkout