import React from 'react'
import DoctorHeader from '../components/Doctor/DoctorHeader'

const DoctorLayout = ({ children }) => {
  return (
    <div className={"main"}>
    {/* <ToastContainer /> */}

    <div>
      {/* <Loader /> */}
      <DoctorHeader />
      <div className="flex">
        <div className="flex flex-col">
          {/* <LeftNavBar /> */}
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  </div>
  )
}

export default DoctorLayout