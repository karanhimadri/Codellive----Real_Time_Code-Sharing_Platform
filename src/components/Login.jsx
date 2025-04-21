import React, { useContext, useState } from "react";
import { authContext } from "../context/AuthContextProvider";
import GoogleOAuth from "./GoogleOAuth";

const Login = () => {
  const { setLoginState } = useContext(authContext)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <GoogleOAuth />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => setLoginState(false)}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Login;