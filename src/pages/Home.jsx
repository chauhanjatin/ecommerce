import React from 'react'
import Header from '../component/navbar/Header'
import Herosection from '../component/home/Herosection'
import Featuredproduct from '../component/home/Featuredproduct'
import Categories from '../component/home/Categories'
import Popularproducts from '../component/home/Popularproducts'
import Faq from '../component/home/Faq'
import Footer from '../component/footer/footer'

function Home() {
  return (
    <div className="font-sans antialiased text-text-h bg-bg">
      <div 
        className="page-x text-white min-h-hero relative bg-cover bg-center"
        style={{ backgroundImage: `url('https://www.prcdesignstudio.com/images/slides/Interior-Design-Service.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <Header />
          <Herosection />
        </div>
      </div>
      <div className="w-full page-x py-8 md:py-page-y space-y-12 md:space-y-section-gap">
        <Featuredproduct />
        <Categories />
        <Popularproducts />
        <Faq />
      </div>
      <Footer />
    </div>
  )
}

export default Home
