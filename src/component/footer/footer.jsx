import React from 'react'
import { ChevronRight } from 'lucide-react'
import logo from '../../assets/logo.svg'

function Footer() {
  return (
    <footer className="mt-20 font-sans">
      {/* Brands Bar */}
      <div className="bg-footer-brands py-6 sm:py-8 flex justify-start sm:justify-between items-center gap-8 sm:gap-16 overflow-x-auto px-4 page-x text-text-subtle font-bold text-lg sm:text-2xl">
        {/* Placeholders for brands based on mockup */}
        <span className="opacity-70">SHE FINDS</span>
        <span className="opacity-70 font-serif">yahoo! <span className="text-sm font-sans">news</span></span>
        <span className="opacity-70">healthline</span>
        <span className="opacity-70 font-serif">yahoo! <span className="text-sm font-sans">news</span></span>
        <span className="opacity-70 font-serif">yahoo!</span>
        <span className="opacity-70">msn</span>
        <span className="opacity-70 font-serif">yahoo! <span className="text-sm font-sans">news</span></span>
      </div>

      {/* Main Footer */}
      <div className="text-white pt-12 sm:pt-20 pb-8 page-x bg-cover bg-center" 
      style={{ backgroundImage: `url('https://stmarysinteriors.com/wp-content/uploads/2026/03/6-4.jpg')` }}
      >
        <div className="flex flex-col items-center text-center mb-12 sm:mb-24">
          <img src={logo} alt="logo" className="h-12 sm:h-16 w-auto invert brightness-0 mb-6 sm:mb-10" />
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-normal mb-6 sm:mb-10 max-w-2xl leading-tight px-2">
            Subscribe To Your Newsletter To Stay Updated About Discounts
          </h2>
          <div className="relative w-full max-w-lg">
            <input 
              type="email" 
              placeholder="person@email.com" 
              className="w-full bg-surface-dark border border-border-mid text-white placeholder-text-muted rounded-full py-4 px-6 pr-14 focus:outline-none focus:ring-1 focus:ring-text-muted"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-btn rounded-full hover:bg-black transition-colors">
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {[1, 2].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col gap-5">
                <h4 className="text-text-muted text-sm font-medium mb-2">PRODUCTS</h4>
                <a href="#" className="text-text-soft text-sm hover:text-white">Lorem Ipsum</a>
                <a href="#" className="text-text-soft text-sm hover:text-white">Lorem Ipsum</a>
                <a href="#" className="text-text-soft text-sm hover:text-white">Lorem Ipsum</a>
              </div>
              <div className="flex flex-col gap-5">
                <h4 className="text-text-muted text-sm font-medium mb-2">LEGAL PAGES</h4>
                <a href="#" className="text-text-soft text-sm hover:text-white">Lorem Ipsum Text</a>
                <a href="#" className="text-text-soft text-sm hover:text-white">Lorem Ipsum Text</a>
                <a href="#" className="text-text-soft text-sm hover:text-white">Lorem Ipsum Text</a>
                <a href="#" className="text-text-soft text-sm hover:text-white">Lorem Ipsum</a>
                <a href="#" className="text-text-soft text-sm hover:text-white">Lorem Ipsum</a>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-border-mid pt-8 text-center text-sm text-text-subtle">
          Copyright © 2023 Renew Bariatrics, Inc
        </div>
      </div>
    </footer>
  )
}

export default Footer
