import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ReviewCard = () => {
    return (
        <div className="max-w-sm p-4 border rounded-lg shadow-md bg-white">
            <div className="flex items-center justify-between">
                {/* Star Rating */}
                <div className="flex items-center">
                    {[...Array(3)].map((_, i) => (
                        <AiFillStar key={i} className="w-5 h-5 text-warning" />
                    ))}
                    {[...Array(2)].map((_, i) => (
                        <AiOutlineStar key={i + 3} className="w-5 h-5 text-black-300" />
                    ))}
                </div>
                <span className="text-black-500 text-sm">26th Dec, 2023</span>
            </div>
            <p className="text-black-700 text-sm mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet.
            </p>
            <div className="flex items-center mt-4">
                <img
                    className="w-10 h-10 object-cover rounded-full"
                    src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="User profile"
                />
                <span className="ml-3 text-black-700 font-medium">Jane Cooper</span>
            </div>
        </div>
    )
}

export default ReviewCard