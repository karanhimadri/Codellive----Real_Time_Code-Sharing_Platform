import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets"
import { authContext } from "../context/AuthContextProvider";

const Navbar = () => {
  const { setSignupState, setLoginState } =
    useContext(authContext);
  const { user } = useSelector((store) => store.auth_store);

  const handleLogInBtn = () => {
    setLoginState(true)
    setSignupState(false)
  };

  const handleSignUpBtn = () => {
    setSignupState(true)
    setLoginState(false)
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md shadow-gray-400 py-3">
        <header className="flex flex-col lg:flex-row justify-around items-center px-6 lg:px-12">
          {/* Logo Section */}
          <div className="mb-2 lg:mb-0">
            <Link to="/" className="block">
              <img className="w-44" src={assets.codelive_logo} alt="Codelive Logo" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6 text-gray-700 font-medium pt-3.5">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-2 py-1 no-underline ${isActive ? "text-black font-semibold border-b-2 border-black" : "hover:text-gray-900"}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/features"
                  className={({ isActive }) =>
                    `px-2 py-1 no-underline ${isActive ? "text-black font-semibold border-b-2 border-black" : "hover:text-gray-900"}`
                  }
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/codelive-pricing"
                  className={({ isActive }) =>
                    `px-2 py-1 no-underline ${isActive ? "text-black font-semibold border-b-2 border-black" : "hover:text-gray-900"}`
                  }
                >
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/faqs"
                  className={({ isActive }) =>
                    `px-2 py-1 no-underline ${isActive ? "text-black font-semibold border-b-2 border-black" : "hover:text-gray-900"}`
                  }
                >
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-2 py-1 no-underline ${isActive ? "text-black font-semibold border-b-2 border-black" : "hover:text-gray-900"}`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* User Profile / Authentication Buttons */}
          <div className="flex items-center space-x-4">
            {user?.user_id ? (
              <div className="flex items-center space-x-2">
                <p className="text-sm">Hi, {user.given_name}</p>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.profile_picture}
                  alt="Profile Icon"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="border border-blue-500 text-blue-500 px-4 py-1 rounded-md hover:bg-blue-500 hover:text-white transition"
                  onClick={handleLogInBtn}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
                  onClick={handleSignUpBtn}
                >
                  Sign-up
                </button>
              </>
            )}
          </div>
        </header>
      </div>
      <div className="mb-20"></div>
    </>
  );
};

export default Navbar;