import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../navbar/Header'
import Footer from '../footer/footer'
import { Check } from 'lucide-react'
import { getCartItems, clearCartItems } from '../../utils/cart'

function GuestComponent() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [guestEmail, setGuestEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postcode: '',
    city: '',
    country: '',
    state: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card'); // card, cod, gpay
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const items = getCartItems();
    if (items.length === 0) {
      navigate('/cart');
    }
    setCartItems(items);
    setGuestEmail(localStorage.getItem('guestEmail') || "");
  }, [navigate]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const shipping = cartItems.length > 0 ? 100 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name required";
    if (!formData.address.trim()) newErrors.address = "Address required";
    if (!formData.postcode.trim()) newErrors.postcode = "Postcode required";
    if (!formData.city.trim()) newErrors.city = "City required";
    if (!formData.country.trim()) newErrors.country = "Country required";
    if (!formData.state.trim()) newErrors.state = "State required";
    if (!formData.phone.trim()) newErrors.phone = "Phone required";

    if (paymentMethod === 'card') {
      if (!cardDetails.number.trim() || !cardDetails.expiry.trim() || !cardDetails.cvv.trim()) {
        newErrors.payment = "Please fill in all card details";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear cart upon successful order
    clearCartItems();
    setCartItems([]);
    setShowPopup(true);
  };

  const handleGoHome = () => {
    clearCartItems();
    localStorage.removeItem('guestEmail');
    navigate('/home');
  };

  return (
    <div className="font-sans antialiased text-text-heading bg-surface min-h-screen flex flex-col">
      <div className="page-x border-b border-border mb-4 sm:mb-8">
        <Header theme="light" />
      </div>
      
      <main className="flex-1 w-full page-x">
        <div className="w-full mt-6 md:mt-10 mb-12 md:mb-20">
          <h1 className="text-2xl font-semibold mb-6">Guest Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="w-full lg:w-[65%] flex flex-col gap-6">
              
              {/* Address Details */}
              <div className="border border-border rounded-lg overflow-hidden flex flex-col h-fit">
                <div className="bg-surface-muted text-white px-4 sm:px-8 py-4 sm:py-5">
                  <h2 className="text-sm sm:text-[15px] font-medium">Shipping Address</h2>
                </div>
                <div className="p-4 sm:p-8 bg-surface flex flex-col gap-5 sm:gap-6">
                  <div className="mb-2 text-sm text-text-muted">
                    Checking out as: <span className="font-medium text-text-heading">{guestEmail}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] text-text-heading">First Name*</label>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.firstName ? 'border-red-500' : ''}`} />
                      {errors.firstName && <span className="text-red-500 text-xs ml-4">{errors.firstName}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] text-text-heading">Last Name*</label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.lastName ? 'border-red-500' : ''}`} />
                      {errors.lastName && <span className="text-red-500 text-xs ml-4">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[16px] text-text-heading">Address*</label>
                    <input name="address" value={formData.address} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.address ? 'border-red-500' : ''}`} />
                    {errors.address && <span className="text-red-500 text-xs ml-4">{errors.address}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] text-text-heading">City*</label>
                      <input name="city" value={formData.city} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.city ? 'border-red-500' : ''}`} />
                      {errors.city && <span className="text-red-500 text-xs ml-4">{errors.city}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] text-text-heading">State*</label>
                      <input name="state" value={formData.state} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.state ? 'border-red-500' : ''}`} />
                      {errors.state && <span className="text-red-500 text-xs ml-4">{errors.state}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] text-text-heading">Country*</label>
                      <input name="country" value={formData.country} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.country ? 'border-red-500' : ''}`} />
                      {errors.country && <span className="text-red-500 text-xs ml-4">{errors.country}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[16px] text-text-heading">Postcode / Zip*</label>
                      <input name="postcode" value={formData.postcode} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.postcode ? 'border-red-500' : ''}`} />
                      {errors.postcode && <span className="text-red-500 text-xs ml-4">{errors.postcode}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[16px] text-text-heading">Phone Number*</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className={`input-field h-[46px] rounded-full ${errors.phone ? 'border-red-500' : ''}`} />
                    {errors.phone && <span className="text-red-500 text-xs ml-4">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Delivery info */}
              <div className="border border-border rounded-lg overflow-hidden flex flex-col h-fit">
                <div className="bg-surface-muted text-white px-4 sm:px-8 py-4 sm:py-5">
                  <h2 className="text-sm sm:text-[15px] font-medium">Delivery Information</h2>
                </div>
                <div className="p-4 sm:p-8 bg-surface text-text-muted text-[15px]">
                  Your order is estimated to be shipped within <span className="font-semibold text-text-heading">3-7 Working Days</span>.
                </div>
              </div>

              {/* Payment Methods */}
              <div className="border border-border rounded-lg overflow-hidden flex flex-col h-fit">
                <div className="bg-surface-muted text-white px-4 sm:px-8 py-4 sm:py-5">
                  <h2 className="text-sm sm:text-[15px] font-medium">Payment Method</h2>
                </div>
                <div className="p-4 sm:p-8 bg-surface flex flex-col gap-4">
                  
                  <label className={`border p-4 rounded-xl cursor-pointer flex flex-col gap-3 transition-colors ${paymentMethod === 'card' ? 'border-text-heading bg-surface-alt' : 'border-border'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 accent-black" />
                      <span className="font-medium text-text-heading">Credit/Debit Card</span>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="pl-8 grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Card Number" value={cardDetails.number} onChange={(e) => { setCardDetails({...cardDetails, number: e.target.value}); setErrors({...errors, payment: ''}) }} className={`col-span-2 input-field h-10 rounded-md ${errors.payment ? 'border-red-500' : ''}`} />
                        <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => { setCardDetails({...cardDetails, expiry: e.target.value}); setErrors({...errors, payment: ''}) }} className={`input-field h-10 rounded-md ${errors.payment ? 'border-red-500' : ''}`} />
                        <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => { setCardDetails({...cardDetails, cvv: e.target.value}); setErrors({...errors, payment: ''}) }} className={`input-field h-10 rounded-md ${errors.payment ? 'border-red-500' : ''}`} />
                        {errors.payment && <span className="col-span-2 text-red-500 text-xs">{errors.payment}</span>}
                      </div>
                    )}
                  </label>

                  <label className={`border p-4 rounded-xl cursor-pointer flex flex-col gap-3 transition-colors ${paymentMethod === 'gpay' ? 'border-text-heading bg-surface-alt' : 'border-border'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'gpay'} onChange={() => setPaymentMethod('gpay')} className="w-5 h-5 accent-black" />
                      <span className="font-medium text-text-heading">Google Pay (GPay)</span>
                    </div>
                    {paymentMethod === 'gpay' && (
                      <div className="flex flex-col items-center justify-center p-4">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Ecommerce-Payment" alt="QR Scanner" className="w-[150px] h-[150px] mb-2 rounded" />
                        <span className="text-sm text-text-muted font-medium">Scan QR Code to Pay</span>
                      </div>
                    )}
                  </label>

                  <label className={`border p-4 rounded-xl cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === 'cod' ? 'border-text-heading bg-surface-alt' : 'border-border'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 accent-black" />
                    <span className="font-medium text-text-heading">Cash on Delivery (COD)</span>
                  </label>

                </div>
              </div>

            </div>

            <div className="w-full lg:w-[35%]">
              <div className="w-full border border-border rounded-lg overflow-hidden flex flex-col h-fit sticky top-6">
                <div className="bg-surface-muted text-white px-4 sm:px-8 py-4 sm:py-5">
                  <h2 className="text-sm sm:text-[15px] font-medium">Order Summary</h2>
                </div>
                <div className="p-4 sm:p-8 bg-surface flex flex-col">
                  <div className="flex flex-col gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-dashed border-border">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[15px] text-text-muted gap-2">
                        <div className="flex-1 min-w-0 truncate">{item.title} <span className="text-xs">x{item.quantity}</span></div>
                        <div className="w-20 text-right shrink-0">${item.total}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-dashed border-border">
                    <span className="text-xs sm:text-[16px] text-text-heading font-medium uppercase tracking-wide">SUBTOTAL</span>
                    <span className="text-sm text-text-muted font-medium">${subtotal}</span>
                  </div>

                  <div className="flex justify-between items-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-dashed border-border">
                    <span className="text-xs sm:text-[16px] text-text-heading font-medium uppercase tracking-wide">SHIPPING</span>
                    <span className="text-sm text-text-muted font-medium">${shipping}</span>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm md:text-[16px] text-text-heading font-medium">Total</span>
                    <span className="text-sm md:text-[16px] text-text-muted font-medium">${total}</span>
                  </div>
                  
                  <button onClick={handlePlaceOrder} className="btn-primary w-full h-[46px] rounded-full text-[16px]">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-xl shadow-2xl max-w-lg w-full p-8 sm:p-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#4A4A4A] rounded-full flex items-center justify-center mb-6">
              <Check className="text-white w-8 h-8" strokeWidth={3} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-text-heading mb-4">Order Placed!</h2>
            <p className="text-text-muted text-[15px] mb-10 max-w-[280px]">
              Thank you for your guest order. A confirmation email has been sent to {guestEmail}.
            </p>
            <div className="flex flex-col gap-4 w-full justify-center">
              <button 
                onClick={handleGoHome}
                className="bg-[#2A2A2A] hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestComponent