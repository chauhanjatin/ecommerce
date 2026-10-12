import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import loginImage from "../../assets/login-img.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event('cartUpdated'));
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="page-x">
      <div className="auth-card my-6 sm:my-12 flex flex-col md:flex-row md:min-h-auth">
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-2xl sm:text-[28px] font-semibold text-text-h mb-2">
            Login
          </h2>
          <p className="text-text-secondary text-sm mb-10">
            Do not have an account,{" "}
            <Link
              to="/signup"
              className="text-text-h underline hover:text-text-heading"
            >
              create a new one.
            </Link>
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div>
              <label className="label-field">Enter Your Email Or Phone</label>
              <input
                type="text"
                placeholder="michael.joe@xmail.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label-field">Enter Your Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary mt-4 w-full py-3.5 rounded-full text-sm"
            >
              Login
            </button>

            <div className="text-center mt-3">
              <a
                href="#"
                className="text-sm text-text underline hover:text-text-h"
              >
                Forgot Your Password
              </a>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-surface-muted order-1 md:order-2">
          <img src={loginImage} alt="login" className="h-full"/>
        </div>
      </div>
    </div>
  );
}

export default Login;