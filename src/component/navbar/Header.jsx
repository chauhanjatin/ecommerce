import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import {
  ChevronDown,
  User,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Header({ theme = "dark" }) {
  const isDark = theme === "dark";
  const location = useLocation();
  const [appTheme, setAppTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token") !== null;

  const textColorClass = isDark ? "text-white" : "text-text-h";
  const logoClass = isDark || appTheme === "dark" ? "invert brightness-0" : "";
  const hoverClass = isDark
    ? "hover:text-text-subtle"
    : "hover:text-text-secondary";
  const mobilePanelClass = isDark
    ? "bg-surface-dark/95 border-white/10 text-white backdrop-blur-sm"
    : "bg-surface border-border text-text-h";

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setAppTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleAppTheme = () => {
    const next = appTheme === "light" ? "dark" : "light";
    setAppTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setCategoryMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    closeMenu();
  };

  const navItems = [
    { label: "Home", to: "/home" },
    { label: "Products", to: "/products" },
    { label: "Contact Us", to: "/contact" },
  ];

  return (
    <header className={`relative z-50 font-sans ${textColorClass}`}>
      <div className="flex justify-between items-center py-4 lg:py-6 gap-4">
        <div className="shrink-0">
          <Link to="/home" onClick={closeMenu}>
            <img
              src={logo}
              alt="logo"
              className={`h-7 lg:h-8 w-auto ${logoClass}`}
            />
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm font-medium whitespace-nowrap">
          {navItems.slice(0, 2).map((item) =>
              item.external ? (
                <a key={item.label} href={item.to} className={hoverClass}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.to} className={hoverClass}>
                  {item.label}
                </Link>
              ),
            )}
            <div className="relative">
              <div
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                className={`flex items-center gap-1 cursor-pointer ${hoverClass}`}
              >
                <span>Categories</span>
                <ChevronDown size={14} />
              </div>
              {categoryMenuOpen && (
                <div
                  className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg border py-2 ${isDark ? "bg-surface-dark border-white/10" : "bg-surface border-border"}`}
                >
                  <Link
                    to="/categories?category=bedroom"
                    className={`block px-4 py-2 text-sm ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    Bedroom
                  </Link>
                  <Link
                    to="/categories?category=livingroom"
                    className={`block px-4 py-2 text-sm ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    Living Room
                  </Link>
                  <Link
                    to="/categories?category=diningroom"
                    className={`block px-4 py-2 text-sm ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    Dining Room
                  </Link>
                  <Link
                    to="/categories?category=sofaset"
                    className={`block px-4 py-2 text-sm ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    Sofa Set
                  </Link>
                </div>
              )}
            </div>
            {navItems.slice(2).map((item) =>
              item.external ? (
                <a key={item.label} href={item.to} className={hoverClass}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.to} className={hoverClass}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          <>
              <Link
                to="/wishlist"
                className={hoverClass}
                onClick={closeMenu}
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>
              <Link
                to="/cart"
                className={hoverClass}
                onClick={closeMenu}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
              </Link>
            </>
          <button
            type="button"
            className={`lg:hidden ${hoverClass}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            type="button"
            onClick={toggleAppTheme}
            className={hoverClass}
            aria-label="Toggle theme"
          >
            {appTheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div
            className={`hidden lg:flex items-center gap-1 cursor-pointer relative ${hoverClass}`}
          >
            <div
              className="flex items-center gap-1"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className={hoverClass} aria-label="Account">
                <User size={20} />
              </div>
              <ChevronDown size={14} />
            </div>

            {userMenuOpen && (
              <div
                className={`absolute top-full right-0 mt-2 w-40 rounded-lg shadow-lg border py-2 ${isDark ? "bg-surface-dark border-white/10" : "bg-surface border-border"}`}
              >
                {!isLoggedIn && (
                  <Link
                    to="/login"
                    className={`block px-4 py-2 text-sm ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    Signup / Signin
                  </Link>
                )}
                {isLoggedIn && (
                  <>
                    <Link
                      to="/order-history"
                      className={`block px-4 py-2 text-sm ${hoverClass}`}
                      onClick={closeMenu}
                    >
                      Order History
                    </Link>
                    <Link
                      to="/home"
                      className={`block px-4 py-2 text-sm ${hoverClass}`}
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <nav
            className={`lg:hidden fixed top-0 right-0 z-50 flex h-full w-[min(100%,280px)] flex-col gap-1 border-l p-6 pt-20 ${mobilePanelClass}`}
          >
            {navItems.slice(0, 2).map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.to}
                    className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ),
              )}

            <>
                <button
                  type="button"
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${hoverClass}`}
                >
                  <span className="flex items-center gap-2">Categories</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${categoryMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {categoryMenuOpen && (
                  <div className="flex flex-col gap-2 pl-6 pb-2">
                    <Link
                      to="/products"
                      className={`text-base ${hoverClass}`}
                      onClick={closeMenu}
                    >
                      All Products
                    </Link>
                    <Link
                      to="/categories?category=bedroom"
                      className={`text-base ${hoverClass}`}
                      onClick={closeMenu}
                    >
                      Bedroom
                    </Link>
                    <Link
                      to="/categories?category=livingroom"
                      className={`text-base ${hoverClass}`}
                      onClick={closeMenu}
                    >
                      Living Room
                    </Link>
                    <Link
                      to="/categories?category=diningroom"
                      className={`text-base ${hoverClass}`}
                      onClick={closeMenu}
                    >
                      Dining Room
                    </Link>
                    <Link
                      to="/categories?category=sofaset"
                      className={`text-base ${hoverClass}`}
                      onClick={closeMenu}
                    >
                      Sofa Set
                    </Link>
                  </div>
                )}
              </>

            {navItems.slice(2).map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.to}
                    className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${hoverClass}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ),
              )}

            <div
              className={`mt-auto flex flex-col gap-2 border-t pt-4 ${isDark ? "border-white/10" : "border-border"}`}
            >
              <div
                className="flex items-center gap-2 mb-2"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <User size={20} />
                <span className="text-sm font-medium">Account</span>
                <ChevronDown size={14} />
              </div>
              {userMenuOpen && (
                <div className="flex flex-col gap-2 pl-7">
                  {!isLoggedIn && (
                    <Link
                      to="/login"
                      className={`text-sm ${hoverClass}`}
                      onClick={closeMenu}
                    >
                      Signup / Signin
                    </Link>
                  )}
                  {isLoggedIn && (
                    <>
                      <Link
                        to="/order-history"
                        className={`text-sm ${hoverClass}`}
                        onClick={closeMenu}
                      >
                        Order History
                      </Link>
                      <Link
                        to="/home"
                        className={`text-sm ${hoverClass}`}
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

export default Header;
