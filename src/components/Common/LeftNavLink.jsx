import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const LeftNavLink = ({ link, title, icons, submenuItems }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubmenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div onClick={toggleSubmenu} className=" leftnav cursor-pointer text-black hover:bg-[#E9F2FF] transition-colors duration-300 pl-4 pr-2 py-3 flex items-center justify-between text-lg font-normal">

                {/* icon */}
                <div className='flex items-center flex-1 gap-2'>
                    <div className="h-12 w-12 rounded-md bg-[#E9F2FF] flex items-center justify-center">
                        {icons}
                    </div>

                    {/* title */}
                    <div>
                        {title}
                    </div>
                </div>

                {/* arrow icon */}
                <div>
                    {isOpen ? (
                        <IoIosArrowDown className="ml-auto text-lg text-black" />
                    ) : (
                        <IoIosArrowForward className="ml-auto text-lg text-black" />
                    )}
                </div>

            </div>

            {isOpen && submenuItems && (
                <div>
                {submenuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block px-9 mb-4 mt-3 py-2 text-black hover:bg-[#D8E9FF] transition-colors duration-300 flex items-center gap-2"
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
        </>
    );
};

export default LeftNavLink;
