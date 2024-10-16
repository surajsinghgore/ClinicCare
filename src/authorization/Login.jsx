import React from 'react'
import loginRegister from '../assets/loginRegister.png'
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div>
      <div className="flex justify-center items-center mt-16">
        <div className="w-1/2 flex justify-center items-center">
          <img src={loginRegister} alt="Login" className="w-full object-cover ml-56" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="border rounded-lg p-8 mr-56" style={{ borderColor: '#d3d3d3' }}>
            <form className="w-[300px]">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700 font-medium">Email</label>
                <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]" autoComplete='off' />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm text-gray-700 font-medium">Password</label>
                <input type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]" />
              </div>
              <div className="mb-4 flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-[#13BEF0] rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 font-medium">Remember Password</label>
              </div>
              <div className="mb-4">
                <a href="#forgot-password" className="text-sm text-[#004AAD] hover:underline font-medium">Forgot Password?</a>
              </div>
              <div>
                <button type="submit" className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">Login</button>
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-700 font-medium">Don't have an account? </span>
                <Link to="/register" className="text-sm text-[#004AAD] hover:underline font-medium">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login