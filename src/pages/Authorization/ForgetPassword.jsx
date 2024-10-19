import  { useState } from 'react'
import forgetPassword from '../../assets/forgetpass.png'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
    
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(email)
        navigate('/auth/otpverify', { state: {email} })
    }

  return (
    <div className="flex justify-center items-center mt-14 ml-14 gap-32">
      <div className="w-[35%] flex justify-center items-center">
        <img src={forgetPassword} alt="Forget Password" className="w-full object-cover ml-56" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="border rounded-lg p-8 mr-56" style={{ borderColor: '#d3d3d3' }}>
          <h2 className="text-2xl font-bold mb-6 text-black-700 border-b-2 border-black-200 pb-4">Forget Password</h2>
          <p className="mb-4 text-black-400">Provide us the email id of your cliniccare account and we will send you an otp to reset your password.</p>
          <form className="w-[100%]" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-base text-black-700 font-medium">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-[#004AAD] rounded-md focus:outline-none focus:ring-[#004AAD] focus:border-[#004AAD]" autoComplete='off' />
            </div>
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-[#004AAD] text-white rounded-md hover:bg-[#0fa3d1] font-medium">Send OTP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword