import React from 'react'

const Footer = () => {
  return (
  <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8 mt-32">
    <div className="container mx-auto px-6">
      <div className="flex justify-between">
        <div className="w-1/3 ml-16">
          <h3 className="text-2xl underline font-bold mb-3">About Us</h3>
          <p className="text-base">
            We provide a platform to book appointments with doctors at your nearby location. You can also search for clinics and see our doctors' degrees and experience in our doctors section.
          </p>
        </div>
        <div className="w-1/3 ml-44">
          <h3 className="text-2xl underline font-bold mb-3">Quick Links</h3>
          <ul className="text-base">
            <li className="mb-2"><a href="/doctors" className="hover:underline">Our Doctors</a></li>
            <li className="mb-2"><a href="/clinics" className="hover:underline">Search Clinics</a></li>
            <li className="mb-2"><a href="/appointments" className="hover:underline">Book Appointment</a></li>
          </ul>
        </div>
        <div className="w-1/3">
          <h3 className="text-2xl underline font-bold mb-3">Contact Us</h3>
          <p className="text-base">
            Email: support@cliniccare.com<br />
            Phone: +99 99999 99999
          </p>
        </div>
      </div>
      <div className="text-center mt-14">
        <p className="text-lg">&copy; 2023 ClinicCare. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer