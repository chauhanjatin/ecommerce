import React, { useState } from 'react'

function Checkoutmethod({ onProceed }) {
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    validThrough: '',
    cvv: '',
    saveAsDefault: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProceedClick = () => {
    const newErrors = {};
    if (!formData.nameOnCard.trim()) newErrors.nameOnCard = "Name is required";
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card Number is required";
    if (!formData.validThrough.trim()) newErrors.validThrough = "Date is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onProceed();
  };

  return (
    <div className="p-4 sm:p-8 bg-surface flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-1">
        <label className="text-[16px] text-text-heading">Name On Card*</label>
        <input name="nameOnCard" value={formData.nameOnCard} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.nameOnCard ? 'border-red-500' : ''}`} />
        {errors.nameOnCard && <span className="text-red-500 text-xs ml-4">{errors.nameOnCard}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[16px] text-text-heading">Card Number*</label>
        <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.cardNumber ? 'border-red-500' : ''}`} />
        {errors.cardNumber && <span className="text-red-500 text-xs ml-4">{errors.cardNumber}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-[16px] text-text-heading">Valid Through*</label>
          <input name="validThrough" value={formData.validThrough} onChange={handleChange} type="text" placeholder="MM/YY" className={`input-field h-[46px] rounded-full ${errors.validThrough ? 'border-red-500' : ''}`} />
          {errors.validThrough && <span className="text-red-500 text-xs ml-4">{errors.validThrough}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[16px] text-text-heading">CVV*</label>
          <input name="cvv" value={formData.cvv} onChange={handleChange} type="text" className={`input-field h-[46px] rounded-full ${errors.cvv ? 'border-red-500' : ''}`} />
          {errors.cvv && <span className="text-red-500 text-xs ml-4">{errors.cvv}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <input 
          type="checkbox" 
          name="saveAsDefault" 
          checked={formData.saveAsDefault} 
          onChange={handleChange} 
          className="w-5 h-5 rounded border-border text-btn focus:ring-0 cursor-pointer"
        />
        <label className="text-sm text-text-heading cursor-pointer">Save As Default Payment Method</label>
      </div>

      <div className="mt-4 sm:mt-6">
        <button onClick={handleProceedClick} className="btn-primary w-full sm:w-auto h-[46px] px-8 rounded-full text-[16px]">
          Proceed to Next Step
        </button>
      </div>
    </div>
  )
}

export default Checkoutmethod
