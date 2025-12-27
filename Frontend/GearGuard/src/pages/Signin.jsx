import React from 'react'

const Signin = () => {
  
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Email ID
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Sign In
        </button>

        {/* Sign Up */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?
          <a href="#" className="text-blue-500 hover:underline ml-1">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}

export default Signin;