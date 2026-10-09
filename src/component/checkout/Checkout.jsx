import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import Checkoutmethod from './Checkoutmethod'

function CheckoutComponent() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    country: '',
    zip: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const shipping = cartItems.length > 0 ? 100 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleProceedStep1 = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.street.trim()) newErrors.street = "Street Address is required";
    if (!formData.city.trim()) newErrors.city = "Town / City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.zip.trim()) newErrors.zip = "Postcode / Zip is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(2);
  };

  const handleProceedStep2 = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    const orderNo = Math.floor(1000 + Math.random() * 9000).toString();
    const trackingId = Math.floor(10000000 + Math.random() * 90000000).toString();
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const formattedDate = `${deliveryDate.getDate().toString().padStart(2, '0')}-${(deliveryDate.getMonth() + 1).toString().padStart(2, '0')}-${deliveryDate.getFullYear()} (Expected)`;

    const newOrder = {
      orderNo,
      items: cartItems.map(item => ({ title: item.title, image: item.image, quantity: item.quantity })),
      status: "In Progress",
      trackingId,
      deliveryDate: formattedDate,
      price: total.toFixed(2)
    };

    const existingOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    localStorage.setItem('userOrders', JSON.stringify([newOrder, ...existingOrders]));

    // Clear cart upon successful order
    localStorage.removeItem('cartItems');
    setCartItems([]);

    setShowPopup(true);
  };

  const handleGoHome = () => {
    localStorage.removeItem('cartItems');
    navigate('/home');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="w-full text-text-heading font-sans mt-6 md:mt-10 mb-12 md:mb-20 relative">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-[65%] border border-border rounded-lg overflow-hidden flex flex-col h-fit">
            <div className="bg-surface-muted text-white px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between font-medium text-xs sm:text-sm">
              <div className={`flex-1 text-center ${step === 1 ? 'font-bold' : 'text-white/80'}`}>Personal</div>
              <div className={`flex-1 text-center ${step === 2 ? 'font-bold text-white' : 'text-white/80'}`}>Billing</div>
              <div className={`flex-1 text-center ${step === 3 ? 'font-bold text-white' : 'text-white/80'} hidden sm:block`}>Confirmation</div>
            </div>
            
            {step === 1 ? (
              <div className="p-4 sm:p-8 bg-surface flex flex-col gap-5 sm:gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[16px] text-text-heading">Email Address*</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" className={`input-field h-[46px] rounded-full ${errors.email ? 'border-red-500' : ''}`} />
                    {errors.email && <span className="text-red-500 text-xs ml-4">{errors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[16px] text-text-heading">Phone Number*</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className={`input-field h-[46px] rounded-full ${errors.phone ? 'border-red-500' : ''}`} />
                    {errors.phone && <span className="text-red-500 text-xs ml-4">{errors.phone}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[16px] text-text-heading">Street Address*</label>
                  <input name="street" value={formData.street} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.street ? 'border-red-500' : ''}`} />
                  {errors.street && <span className="text-red-500 text-xs ml-4">{errors.street}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[16px] text-text-heading">Town / City*</label>
                  <input name="city" value={formData.city} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.city ? 'border-red-500' : ''}`} />
                  {errors.city && <span className="text-red-500 text-xs ml-4">{errors.city}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[16px] text-text-heading">Country*</label>
                  <input name="country" value={formData.country} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.country ? 'border-red-500' : ''}`} />
                  {errors.country && <span className="text-red-500 text-xs ml-4">{errors.country}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[16px] text-text-heading">Postcode / Zip*</label>
                  <input name="zip" value={formData.zip} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.zip ? 'border-red-500' : ''}`} />
                  {errors.zip && <span className="text-red-500 text-xs ml-4">{errors.zip}</span>}
                </div>

                <div className="mt-2 sm:mt-4">
                  <button onClick={handleProceedStep1} className="btn-primary w-full sm:w-auto h-[46px] px-8 rounded-full text-[16px]">
                    Proceed to Next Step
                  </button>
                </div>
              </div>
            ) : (
              <Checkoutmethod onProceed={handleProceedStep2} />
            )}
          </div>

          <div className="w-full lg:w-[35%] border border-border rounded-lg overflow-hidden flex flex-col h-fit">
            <div className="bg-surface-muted text-white px-4 sm:px-8 py-4 sm:py-5">
              <h2 className="text-sm sm:text-[15px] font-medium">Cart Details</h2>
            </div>
            <div className="p-4 sm:p-8 bg-surface flex flex-col">
              <div className="hidden sm:flex justify-between items-center text-[16px] text-text-heading font-medium uppercase tracking-wide mb-6">
                <div className="flex-1 min-w-0">PRODUCT</div>
                <div className="w-16 text-center shrink-0">Qty</div>
                <div className="w-20 text-right shrink-0">SUBTOTAL</div>
              </div>

              <div className="flex flex-col gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-dashed border-border">
                {cartItems.length > 0 ? (
                  cartItems.map((item, i) => (
                    <div key={i}>
                      <div className="hidden sm:flex justify-between items-center text-[16px] text-text-muted gap-2">
                        <div className="flex-1 min-w-0 truncate">{item.title}</div>
                        <div className="w-16 text-center shrink-0">{String(item.quantity).padStart(2, '0')}</div>
                        <div className="w-20 text-right shrink-0">${item.total}</div>
                      </div>
                      <div className="sm:hidden flex flex-col gap-1 text-sm text-text-muted">
                        <span className="font-medium text-text-heading">{item.title}</span>
                        <div className="flex justify-between">
                          <span>Qty: {String(item.quantity).padStart(2, '0')}</span>
                          <span>${item.total}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-text-muted text-sm py-4">Your cart is empty.</div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-dashed border-border">
                <span className="text-xs sm:text-[16px] text-text-heading font-medium uppercase tracking-wide">SUBTOTAL</span>
                <span className="text-sm text-text-muted font-medium">${subtotal}</span>
              </div>

              <div className="flex justify-between items-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-dashed border-border">
                <span className="text-xs sm:text-[16px] text-text-heading font-medium uppercase tracking-wide">SHIPPING</span>
                <span className="text-sm text-text-muted font-medium">${shipping}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm md:text-[16px] text-text-heading font-medium">Total</span>
                <span className="text-sm md:text-[16px] text-text-muted font-medium">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-xl shadow-2xl max-w-xl w-full p-8 sm:p-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#4A4A4A] rounded-full flex items-center justify-center mb-6">
              <Check className="text-white w-8 h-8" strokeWidth={3} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-text-heading mb-4">Thank you!</h2>
            <p className="text-text-muted text-[15px] mb-10 max-w-[280px]">
              Your order has been confirmed & it is on the way. Check your email for the details
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button 
                onClick={handleGoHome}
                className="bg-[#2A2A2A] hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Go to Homepage
              </button>
              <button 
                onClick={handleClosePopup}
                className="bg-transparent hover:bg-surface-muted border border-[#2A2A2A] text-text-heading px-8 py-3 rounded-full font-medium transition-colors"
              >
                Check Order Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CheckoutComponent
