import React from 'react'
import Header from '../component/navbar/Header'
import Footer from '../component/footer/footer'
import ContactComponent from '../component/contact/Contact'

function Contact() {
  return (
    <div className="font-sans antialiased text-text-heading bg-surface min-h-screen flex flex-col">
      <div className="page-x border-b border-border">
        <Header theme="light" />
      </div>
      
      <div className="flex-grow flex items-center justify-center py-8 sm:py-16 px-0">
        <div className="w-full px-4">
          <ContactComponent />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Contact