import React from 'react'
import { Search } from 'lucide-react'

function Herosection() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20 px-4 text-textwhite">
      <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6 leading-tight">
        Crafting Comfort, Redefining Spaces.<br className="hidden sm:block" />
        <span className="sm:hidden"> </span>Your Home, Your Signature Style!
      </h1>
      <p className="text-text-subtle text-sm md:text-base max-w-2xl mx-auto mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla nunc in molestie
        feugiat. Nunc auctor consectetur elit, quis pulvina. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nulla fringilla nunc in molestie feugiat
      </p>
      
      <div className="relative w-full max-w-md">
        <input 
          type="text" 
          placeholder="Search An Item" 
          className="w-full border border-border-strong text-white placeholder-text-subtle rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-text-subtle"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full">
          <Search size={16} className="text-white" />
        </button>
      </div>
    </div>
  )
}

export default Herosection