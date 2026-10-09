import React from 'react'
import Header from '../component/navbar/Header'
import Footer from '../component/footer/footer'
import CategoriesComponent from '../component/categories/Categories'

function Categories() {
  return (
    <div className="font-sans antialiased text-text-h bg-bg min-h-screen flex flex-col">
      <div className="page-x border-b border-border">
        <Header theme="light" />
      </div>

      <div className="w-full page-x py-6 md:py-page-y flex-1">
        <main className="w-full min-w-0">
          <CategoriesComponent />
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Categories