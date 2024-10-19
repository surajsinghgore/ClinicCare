import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowDown } from "react-icons/io";

const LeftNavLink = ({ link, title, icons }) => {
    return (
        <>
            <Link className="text-black hover:bg-[#E9F2FF] transition-colors duration-300 px-6 py-3 flex items-center text-lg font-normal">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-5">
                    {icons}
                </div>
                {title}
                <IoIosArrowForward className="ml-auto text-2xl text-black" />
            </Link>
        </>
    )
}

export default LeftNavLink