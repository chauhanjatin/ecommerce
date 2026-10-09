import React, { useMemo, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const PRICE_MIN = 0
const PRICE_MAX = 5499

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'bedroom', label: 'Bedroom Furniture' },
  { id: 'livingroom', label: 'Living Room Furniture' },
  { id: 'diningroom', label: 'Dining Room Furniture' },
  { id: 'sofaset', label: 'Sofa Set' },
]

const priceRanges = [
  { id: 1, label: '$200.00 - $500.00', min: 200, max: 500 },
  { id: 2, label: '$500.00 - $1000.00', min: 500, max: 1000 },
  { id: 3, label: '$1000.00 - $2000.00', min: 1000, max: 2000 },
  { id: 4, label: '$2000.00+', min: 2000, max: PRICE_MAX },
]

// const colors = [
//   { id: 'beige', label: 'Beige', count: 4 },
//   { id: 'black', label: 'Black', count: 13 },
//   { id: 'blue', label: 'Blue', count: 17 },
//   { id: 'brown', label: 'Brown', count: 9 },
//   { id: 'cream', label: 'Cream', count: 3 },
//   { id: 'green', label: 'Green', count: 6 },
//   { id: 'grey', label: 'Grey', count: 3 },
//   { id: 'maroon', label: 'Maroon', count: 2 },
//   { id: 'multicolor', label: 'Multicolor', count: 1 },
//   { id: 'off-white', label: 'Off White', count: 2 },
//   { id: 'olive', label: 'Olive', count: 1 },
//   { id: 'pink', label: 'Pink', count: 5 },
//   { id: 'purple', label: 'Purple', count: 2 },
//   { id: 'red', label: 'Red', count: 1 },
//   { id: 'white', label: 'White', count: 3 },
// ]

// const sizes = [
//   { id: 's', label: 'S', count: 19 },
//   { id: 'sm', label: 'S/M', count: 3 },
//   { id: 'm', label: 'M', count: 34 },
//   { id: 'l', label: 'L', count: 41 },
//   { id: 'lxl', label: 'L/XL', count: 1 },
//   { id: 'xl', label: 'XL', count: 29 },
//   { id: '2xl', label: '2XL', count: 30 },
//   { id: '2xl3xl', label: '2XL/3XL', count: 1 },
//   { id: '3xl', label: '3XL', count: 20 },
//   { id: '26', label: '26', count: 10 },
//   { id: '28', label: '28', count: 26 },
//   { id: '30', label: '30', count: 26 },
//   { id: '32', label: '32', count: 22 },
//   { id: '34', label: '34', count: 19 },
//   { id: '36', label: '36', count: 13 },
//   { id: '38', label: '38', count: 6 },
//   { id: '40', label: '40', count: 7 },
//   { id: '42', label: '42', count: 1 },
//   { id: 'free', label: 'Free Size', count: 5 },
// ]

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category')
  const selectedPriceRanges = searchParams.get('price') 
    ? searchParams.get('price').split(',').map(Number) 
    : []

  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    size: true,
  }) 
  const [minPrice, setMinPrice] = useState(PRICE_MIN)
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])

  const fillStyle = useMemo(() => {
    const left = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
    const right = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
    return { left: `${left}%`, width: `${Math.max(right - left, 0)}%` }
  }, [minPrice, maxPrice])

  const toggleCategory = (id) => {
    if (activeCategory === id || id === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', id)
    }
    setSearchParams(searchParams)
  }

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const togglePriceRange = (id) => {
    const next = selectedPriceRanges.includes(id) 
      ? selectedPriceRanges.filter((item) => item !== id) 
      : [...selectedPriceRanges, id]
      
    if (next.length > 0) {
      searchParams.set('price', next.join(','))
    } else {
      searchParams.delete('price')
    }
    setSearchParams(searchParams)
  }

  const clampPrice = (value) => Math.min(PRICE_MAX, Math.max(PRICE_MIN, Number(value) || 0))

  const handleMinChange = (value) => {
    const next = Math.min(clampPrice(value), maxPrice)
    setMinPrice(next)
  }

  const handleMaxChange = (value) => {
    const next = Math.max(clampPrice(value), minPrice)
    setMaxPrice(next)
  }

  const toggleColor = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleSize = (id) => {
    setSelectedSizes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="w-full max-w-none lg:max-w-[280px] flex flex-col gap-6 lg:gap-8 font-sans">
      {/* Categories — first design */}
      <div className="border border-border p-5 sm:p-6 bg-surface">
        <h3 className="font-heading flex items-center gap-3 text-lg sm:text-xl font-medium text-text-heading mb-5 sm:mb-6">
          <span className="w-1 h-5 bg-text-heading shrink-0"></span>
          Categories
        </h3>
        <ul className="flex flex-col gap-4 sm:gap-5">
          {categories.map((item) => {
            const isActive = activeCategory === item.id || (!activeCategory && item.id === 'all')
            return (
              <li key={item.id} className="flex flex-col">
                <button
                  type="button"
                  className={`flex w-full justify-between items-center text-[15px] cursor-pointer text-left transition-colors ${isActive ? 'text-text-h font-medium' : 'text-text hover:text-text-h'}`}
                  onClick={() => toggleCategory(item.id)}
                >
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Price Range checkboxes — first design */}
      <div className="border border-border p-5 sm:p-6 bg-surface">
        <h3 className="font-heading flex items-center gap-3 text-lg sm:text-xl font-medium text-text-heading mb-5 sm:mb-6">
          <span className="w-1 h-5 bg-text-heading shrink-0"></span>
          Price Range
        </h3>
        <ul className="flex flex-col gap-4">
          {priceRanges.map((range) => {
            const checked = selectedPriceRanges.includes(range.id)
            return (
              <li key={range.id}>
                <button
                  type="button"
                  className="flex items-center gap-3 sm:gap-4 text-text text-[15px] cursor-pointer w-full text-left"
                  onClick={() => togglePriceRange(range.id)}
                >
                  <span className={`filter-check ${checked ? 'is-checked' : ''}`}>
                    {checked && <Check size={12} className="text-white" />}
                  </span>
                  <span>{range.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Price slider — second design */}
      {/* <div className="border border-border p-5 sm:p-6 bg-surface">
        <button
          type="button"
          className="flex w-full items-center justify-between text-text-h font-semibold text-base mb-1"
          onClick={() => toggleSection('price')}
          aria-expanded={openSections.price}
        >
          <span>Price</span>
          <ChevronDown
            size={18}
            className={`text-text-muted transition-transform ${openSections.price ? 'rotate-180' : ''}`}
          />
        </button>

        {openSections.price && (
          <div className="pt-4 flex flex-col gap-5">
            <div className="price-range">
              <div className="price-range__track"></div>
              <div className="price-range__fill" style={fillStyle}></div>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={minPrice}
                onChange={(e) => handleMinChange(e.target.value)}
                className="price-range__input"
                aria-label="Minimum price"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={maxPrice}
                onChange={(e) => handleMaxChange(e.target.value)}
                className="price-range__input"
                aria-label="Maximum price"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="flex-1 flex items-center gap-2 border border-border rounded-md px-3 py-2 text-sm text-text-muted">
                <span>₹</span>
                <input
                  type="number"
                  min={PRICE_MIN}
                  max={maxPrice}
                  value={minPrice}
                  onChange={(e) => handleMinChange(e.target.value)}
                  className="w-full bg-transparent outline-none text-text-heading"
                />
              </label>
              <span className="text-text-muted text-sm shrink-0">to</span>
              <label className="flex-1 flex items-center gap-2 border border-border rounded-md px-3 py-2 text-sm text-text-muted">
                <span>₹</span>
                <input
                  type="number"
                  min={minPrice}
                  max={PRICE_MAX}
                  value={maxPrice}
                  onChange={(e) => handleMaxChange(e.target.value)}
                  className="w-full bg-transparent outline-none text-text-heading"
                />
              </label>
            </div>
          </div>
        )}
      </div> */}

      {/* Color — third design */}
      {/* <div className="border border-border p-5 sm:p-6 bg-surface">
        <button
          type="button"
          className="flex w-full items-center justify-between text-text-h font-semibold text-base mb-1"
          onClick={() => toggleSection('color')}
          aria-expanded={openSections.color}
        >
          <span>Color</span>
          <ChevronDown
            size={18}
            className={`text-text-muted transition-transform ${openSections.color ? 'rotate-180' : ''}`}
          />
        </button>

        {openSections.color && (
          <ul className="pt-4 flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
            {colors.map((color) => {
              const checked = selectedColors.includes(color.id)
              return (
                <li key={color.id}>
                  <button
                    type="button"
                    className="flex items-center gap-3 text-text-heading text-sm w-full text-left hover:text-text-h"
                    onClick={() => toggleColor(color.id)}
                  >
                    <span className={`filter-check ${checked ? 'is-checked' : ''}`}>
                      {checked && <Check size={12} className="text-white" />}
                    </span>
                    <span>
                      {color.label} ({color.count})
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div> */}

      {/* Size — fourth design */}
      {/* <div className="border border-border p-5 sm:p-6 bg-surface">
        <button
          type="button"
          className="flex w-full items-center justify-between text-text-h font-semibold text-base mb-1"
          onClick={() => toggleSection('size')}
          aria-expanded={openSections.size}
        >
          <span>Size</span>
          <ChevronDown
            size={18}
            className={`text-text-muted transition-transform ${openSections.size ? 'rotate-180' : ''}`}
          />
        </button>

        {openSections.size && (
          <div className="pt-4 grid grid-cols-3 gap-2.5">
            {sizes.map((size) => {
              const active = selectedSizes.includes(size.id)
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => toggleSize(size.id)}
                  className={`size-pill ${size.id === 'free' ? 'col-span-2' : ''} ${active ? 'is-active' : ''}`}
                >
                  {size.label} ({size.count})
                </button>
              )
            })}
          </div>
        )}
      </div> */}
    </div>
  )
}

export default Filter
