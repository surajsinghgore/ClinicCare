import React from 'react'
import loginRegister from '../assets/loginRegister.png'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="flex justify-center items-center mt-16">
      <div className="w-1/2 flex justify-center items-center">
        <img src={loginRegister} alt="Register" className="w-full object-cover ml-56" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border rounded-lg p-8 mr-56" style={{ borderColor: '#d3d3d3' }}>
          <h2 className="text-2xl font-bold mb-4">Register Form</h2>
          <form className="w-[380px]">
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm text-gray-700 font-medium">Full Name</label>
              <input type="text" id="fullName" className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]" autoComplete='off' />
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-sm text-gray-700 font-medium">Mobile Number</label>
              <input type="text" id="mobileNumber" className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]" autoComplete='off' />
            </div>
            <div className="mb-7">
              <label htmlFor="email" className="block text-sm text-gray-700 font-medium">Email</label>
              <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]" autoComplete='off' />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-medium mb-2">Permissions</label>
              <div className="flex flex-wrap">
                <div className="flex items-center mr-4">
                  <input type="checkbox" id="all" className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-[#13BEF0] rounded" />
                  <label htmlFor="all" className="ml-2 block text-sm text-gray-900 font-medium">All</label>
                </div>
                <div className="flex items-center mr-4">
                  <input type="checkbox" id="read" className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-[#13BEF0] rounded" />
                  <label htmlFor="read" className="ml-2 block text-sm text-gray-900 font-medium">Read</label>
                </div>
                <div className="flex items-center mr-4">
                  <input type="checkbox" id="write" className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-[#13BEF0] rounded" />
                  <label htmlFor="write" className="ml-2 block text-sm text-gray-900 font-medium">Write</label>
                </div>
                <div className="flex items-center mr-4">
                  <input type="checkbox" id="update" className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-[#13BEF0] rounded" />
                  <label htmlFor="update" className="ml-2 block text-sm text-gray-900 font-medium">Update</label>
                </div>
                <div className="flex items-center mr-4">
                  <input type="checkbox" id="create" className="h-4 w-4 text-[#13BEF0] focus:ring-[#13BEF0] border-[#13BEF0] rounded" />
                  <label htmlFor="create" className="ml-2 block text-sm text-gray-900 font-medium">Create</label>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">Register</button>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-700 font-medium">Already have an account? </span>
              <Link to="/login" className="text-sm text-[#004AAD] hover:underline font-medium">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register