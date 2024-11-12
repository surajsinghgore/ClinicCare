import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = ({ link, title, icons }) => {
    return (
        <Link
            to={link}
            className="leftnav cursor-pointer text-black hover:bg-[#E9F2FF] transition-colors duration-300 pl-4 pr-2 py-3 flex items-center justify-between text-lg font-normal"
        >
            {/* Icon */}
            <div className='flex items-center flex-1 gap-2'>
                <div className="h-10 w-10 rounded-md bg-[#E9F2FF] flex items-center justify-center">
                    {icons}
                </div>

                {/* Title */}
                <div>
                    {title}
                </div>
            </div>
        </Link>
    );
};

export default UserNav;
