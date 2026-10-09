import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Productspage from './pages/Productspage'
import Productdetail from './pages/Productdetail'
import Addtocart from './pages/Addtocart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Wishlist from './pages/Wishlist'
import Categories from './pages/Categories'
import Guest from './pages/Guest'
import Orderhistory from './pages/Orderhistory'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Productspage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product-detail" element={<Productdetail />} />
        <Route path="/cart" element={<Addtocart />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/wishlist" element={<Wishlist />} />
        
        {/* Protected routes that require login */}
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/order-history" element={<ProtectedRoute><Orderhistory /></ProtectedRoute>} />
        <Route path="/guest-checkout" element={<Guest />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
