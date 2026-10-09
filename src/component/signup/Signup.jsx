import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || password !== confirmPassword) {
      alert("Please enter a valid email and matching passwords");
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.find(u => u.email === email);
      if (userExists) {
        alert("Email already exists");
        return;
      }
      
      users.push({ email, password, fullName });
      localStorage.setItem('users', JSON.stringify(users));
      
      alert("Signup successful! Please login.");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div className="page-x">
      <div className="auth-card my-6 sm:my-12 flex flex-col md:flex-row md:min-h-auth">
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-2xl sm:text-[28px] font-semibold text-text-h mb-2">Signup</h2>
          <p className="text-text-secondary text-sm mb-10">
            Already Have An Account,{' '}
            <Link to="/login" className="text-text-h underline hover:text-text-heading">
              Login.
            </Link>
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleSignup}>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2">
                <label className="label-field">Full Name</label>
                <input type="text" placeholder="michael joe" className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="w-full md:w-1/2">
                <label className="label-field">Email</label>
                <input type="email" placeholder="michael.joe@xmail.com" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2">
                <label className="label-field">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="******"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <label className="label-field">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="******"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                  >
                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
            </div>  

            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-border-strong text-text-h focus:ring-text-h cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-text-secondary mt-0.5">
                I have read and agreed to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary mt-4 w-full py-3.5 rounded-full text-sm">
              Create Account
            </button>
          </form>
        </div>
    
        <div className="w-full md:w-1/2 bg-surface-muted min-h-[180px] md:min-h-0 order-1 md:order-2"></div>
      </div>
    </div>
  )
}

export default Signup