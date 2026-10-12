import React, { useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, setCartItems, getCartKey } from "../../utils/cart";

function Addtocart() {
  const navigate = useNavigate();
  const [cartItems, setCartItemsState] = useState(() => getCartItems());
  
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const handleCartSync = () => {
      setCartItemsState(getCartItems());
    };
    window.addEventListener('cartUpdated', handleCartSync);
    window.addEventListener('storage', handleCartSync);
    return () => {
      window.removeEventListener('cartUpdated', handleCartSync);
      window.removeEventListener('storage', handleCartSync);
    };
  }, []);

  const updateCart = (newCart) => {
    setCartItemsState(newCart);
    setCartItems(newCart);
  };

  const handleRemove = (id) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, change) => {
    const newCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.price
        };
      }
      return item;
    }).filter(item => item.quantity > 0);
    updateCart(newCart);
  };

  const handleCheckoutClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/checkout');
    } else {
      setShowGuestPopup(true);
    }
  };

  const handleGuestSubmit = () => {
    if (!guestEmail.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(guestEmail)) {
      setEmailError("Email is invalid");
      return;
    }
    localStorage.setItem('guestEmail', guestEmail);
    navigate('/guest-checkout');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <>
      <div className="w-full text-text-heading font-sans mt-6 md:mt-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-[65%]">
            <div className="w-full border border-border rounded-lg overflow-hidden">
              <div className="hidden md:flex bg-surface-muted text-white items-center px-4 sm:px-8 py-4 sm:py-5">
                <div className="w-[45%] text-sm sm:text-[15px] font-medium">Product</div>
                <div className="w-[15%] text-sm sm:text-[15px] font-medium text-center">Price</div>
                <div className="w-[25%] text-sm sm:text-[15px] font-medium text-center">Quantity</div>
                <div className="w-[15%] text-sm sm:text-[15px] font-medium text-center">Total</div>
              </div>

              <div className="bg-surface flex flex-col">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className={`hidden md:flex items-center px-4 md:px-4 py-5 sm:py-6 ${index !== cartItems.length - 1 ? "border-b border-border" : ""}`} 
                    >
                      <div className="w-[45%] flex items-center gap-4 min-w-0">
                        <button onClick={() => handleRemove(item.id)} className="text-text-heading hover:text-text-h shrink-0 cursor-pointer">
                          <X size={16} strokeWidth={2} />
                        </button>
                        <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] bg-image-bg rounded-md shrink-0 overflow-hidden">
                          {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                        </div>
                        <span className="text-[16px] text-text-heading font-medium truncate">{item.title}</span>
                      </div>
                      <div className="w-[15%] text-center text-[16px] text-text-heading">${item.price}</div>
                      <div className="w-[25%] flex justify-center">
                        <div className="flex items-center border border-border rounded-full h-10 w-[100px] px-3 justify-between">
                          <button onClick={() => handleQuantityChange(item.id, -1)} className="text-text-light hover:text-text-h">
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span className="text-sm font-medium text-text-heading">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, 1)} className="text-text-light hover:text-text-h">
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                      <div className="w-[15%] text-center text-[16px] text-text-heading">${item.total}</div>
                    </div>

                    <div
                      className={`md:hidden p-4 sm:p-6 flex flex-col gap-4 ${index !== cartItems.length - 1 ? "border-b border-border" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-image-bg rounded-md shrink-0 overflow-hidden">
                          {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-sm font-medium text-text-heading">{item.title}</span>
                            <button onClick={() => handleRemove(item.id)} className="text-text-heading hover:text-text-h shrink-0">
                              <X size={16} strokeWidth={2} />
                            </button>
                          </div>
                          <span className="text-sm text-text-light mt-1 block">${item.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-full h-10 w-[100px] px-3 justify-between">
                          <button onClick={() => handleQuantityChange(item.id, -1)} className="text-text-light hover:text-text-h">
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span className="text-sm font-medium text-text-heading">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, 1)} className="text-text-light hover:text-text-h">
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        <span className="text-sm font-medium text-text-heading">Total: ${item.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[35%]">
            <div className="w-full border border-border rounded-lg overflow-hidden">
              <div className="bg-surface-muted text-white px-4 sm:px-8 py-4 sm:py-5">
                <h2 className="text-sm sm:text-[15px] font-medium">Cart Total</h2>
              </div>
              <div className="bg-surface flex flex-col">
                <div className="flex justify-between items-center px-4 sm:px-8 py-5 sm:py-6 border-b border-border">
                  <span className="text-xs md:text-[16px] text-text-heading uppercase">SUBTOTAL</span>
                  <span className="text-[16px] text-[#949494]">${subtotal}</span>
                </div>
                <div className="flex justify-between items-center px-4 sm:px-8 py-5 sm:py-6 border-b border-border">
                  <span className="text-xs md:text-[16px] text-text-heading uppercase">DISCOUNT</span>
                  <span className="text-[16px] text-[#949494]">---</span>
                </div>
                <div className="flex justify-between items-center px-4 sm:px-8 py-5 sm:py-6">
                  <span className="text-xs md:text-[16px] text-text-heading uppercase">TOTAL</span>
                  <span className="text-[16px] text-[#949494]">${subtotal}</span>
                </div>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-btn text-white h-14 sm:h-[64px] text-sm sm:text-[15px] font-medium hover:bg-black transition-colors flex items-center justify-center cursor-pointer"
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showGuestPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-xl shadow-2xl max-w-md w-full p-8 flex flex-col relative">
            <button 
              onClick={() => setShowGuestPopup(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-heading"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-medium text-text-heading mb-2">Check out as guest</h2>
            <p className="text-text-muted text-sm mb-6">
              Enter your email address to proceed with your guest checkout.
            </p>
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm text-text-heading">Email Address</label>
              <input 
                type="email" 
                value={guestEmail}
                onChange={(e) => {
                  setGuestEmail(e.target.value);
                  setEmailError("");
                }}
                className={`input-field h-[46px] rounded-full px-4 border ${emailError ? 'border-red-500' : 'border-border'}`}
                placeholder="Enter your email"
              />
              {emailError && <span className="text-red-500 text-xs ml-4">{emailError}</span>}
            </div>
            <button 
              onClick={handleGuestSubmit}
              className="bg-btn hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-colors w-full"
            >
              Continue
            </button>
            <div className="mt-6 text-center text-sm text-text-muted">
              Already have an account? <Link to="/login" className="text-text-heading hover:underline">Log in</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Addtocart;
