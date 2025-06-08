import React, { useState, useEffect, useContext } from "react";
import { Menu, X, Code2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authContext } from "../context/AuthContextProvider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");

  const navigate = useNavigate();

  const { setSignupState, setLoginState, tempUserName } = useContext(authContext);
  const { user } = useSelector((store) => store.auth_store);

  const currentUser = user?.user_id ? user : null || tempUserName;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update activeRoute if the URL changes externally (optional)
  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact" }
  ];

  const handleLogInBtn = () => {
    setLoginState(true);
    setSignupState(false);
  };

  const handleSignUpBtn = () => {
    setSignupState(true);
    setLoginState(false);
  };

  const handleNavClick = (path) => {
    navigate(path);           // <-- Navigate to the route
    setActiveRoute(path);     // <-- Update active route for styling
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-white shadow-md"
          }`}
      >
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick("/")}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeLive
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  Real-time coding
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeRoute === item.path
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                    >
                      {item.name}
                      {activeRoute === item.path && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsUserDropdownOpen(!isUserDropdownOpen)
                    }
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition"
                  >
                    <img
                      className="w-8 h-8 rounded-full ring-2 ring-blue-100"
                      src={currentUser.profile_picture || "https://api.dicebear.com/7.x/pixel-art/svg?seed=coder123"}
                      alt="Profile"
                      referrerPolicy="no-referrer"
                    />
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        Hi, {currentUser.given_name || tempUserName}
                      </p>
                      <p className="text-xs text-gray-500">Welcome back</p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${isUserDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Profile Settings
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        My Projects
                      </button>
                      <hr className="my-1 border-gray-100" />
                      <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <button
                    onClick={handleLogInBtn}
                    className="px-6 py-2 text-blue-600 font-medium rounded-lg border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUpBtn}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg">
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${activeRoute === item.path
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                  >
                    {item.name}
                  </button>
                ))}

                {!currentUser ? (
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <button
                      onClick={handleLogInBtn}
                      className="w-full px-6 py-3 text-blue-600 font-medium rounded-lg border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleSignUpBtn}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <img
                        className="w-10 h-10 rounded-full ring-2 ring-blue-100"
                        src={currentUser.profile_picture}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          Hi, {currentUser.given_name}
                        </p>
                        <p className="text-sm text-gray-500">Welcome back</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                        My Projects
                      </button>
                      <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Spacer below fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;
