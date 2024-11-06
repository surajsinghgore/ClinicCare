import React from 'react'
import BreadCrumbs from '../../../components/Common/BreadCrumbs'

const PlatformFeePage = () => {
    return (
        <>
            <BreadCrumbs currentPath="Platform Fee" />
            <div className="relative w-[80%] max-w-xl m-auto mt-24 rounded-lg shadow-md p-8 bg-white">
                <h1 className="text-2xl font-semibold underline text-black-800 mb-8">Platform Fee</h1>
                <label className="text-lg font-medium mb-2 block text-black-700">
                    Enter Platform Fee:
                </label>
                <div className="flex flex-col gap-14 items-end space-x-3">
                    <input
                        type="text"
                        placeholder="Enter amount..."
                        className="w-full px-4 py-3 border border-black-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-black-800 placeholder-black-500"
                    />
                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none transition-colors">
                        Add Fee
                    </button>
                </div>
            </div>
        </>
    )
}

export default PlatformFeePage
