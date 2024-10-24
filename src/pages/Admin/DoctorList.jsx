import React from 'react';
import { Link } from 'react-router-dom';

const DoctorList = () => {
    const doctors = [
        { id: '#0021', name: 'Smith White', specialization: 'Neurology', gender: 'female', email: 'smith@gmail.com', phone: '3345678901', image: 'https://images.pexels.com/photos/3873193/pexels-photo-3873193.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: '#0022', name: 'Athus White', specialization: 'Neurology', gender: 'male', email: 'smith@gmail.com', phone: '3345678901', image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: '#0023', name: 'Fartk White', specialization: 'Neurology', gender: 'female', email: 'smith@gmail.com', phone: '3345678901', image: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: '#0024', name: 'Math White', specialization: 'Neurology', gender: 'male', email: 'smith@gmail.com', phone: '3345678901', image: 'https://images.pexels.com/photos/7585023/pexels-photo-7585023.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' }
    ];

    return (
        <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
            <div className="top flex items-center justify-between mb-14">
                <h1 className='text-xl font-semibold'>Doctor List</h1>
                <button className='bg-blue-500 text-white shadow-sm shadow-secondary rounded-lg p-2'>Add Doctor</button>
            </div>

            <div className="mb-4">
                <div className="topSelect flex items-center justify-between">
                    <div className='flex gap-1'>
                        <p className='text-black-600 text-sm'>Display</p>
                        <select name="pages" id="pages" className="bg-white border border-black-400 text-sm rounded-sm">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                        </select>
                        <p className='text-black-600 text-sm'>Records Per Page</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <label htmlFor="search" className='text-black-600'>Search: </label>
                        <input type="text" name='search' id='search' className='border border-black-500 pl-1 h-7 w-60 rounded-md' />
                    </div>
                </div>
            </div>

            <div className="list w-[100%] border border-black-200 rounded-md">
                <div className="heading flex justify-between font-semibold border-b-2 border-black-400 pb-2 px-5 py-3 mb-2">
                    <div>ID</div>
                    <div>Name</div>
                    <div className='ml-6'>Specialization</div>
                    <div>Gender</div>
                    <div>Email</div>
                    <div>Phone</div>
                    <div>Action</div>
                </div>
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center text-sm justify-between border-b border-black-200 px-5 py-2">
                        <div>{doctor.id}</div>
                        <div className="flex items-center">
                            <img src={doctor.image} alt={doctor.name} className="w-12 h-12 object-cover rounded-full mr-2" />
                            {doctor.name}
                        </div>
                        <div className='pr-5'>{doctor.specialization}</div>
                        <div className='pl-10'>{doctor.gender}</div>
                        <div>{doctor.email}</div>
                        <div>{doctor.phone}</div>
                        <div>
                            <Link to={"/admin/verify-doctor"}
                                className='bg-blue-500 text-white rounded-lg px-3 py-1 transition duration-200 ease-in-out hover:bg-blue-700'
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="last mt-6 flex items-center justify-between">
                <p className='text-sm pl-2'>Showing Page 1 of 1</p>
                <div className=" flex items-center bg-black-100 border border-black-300 rounded-md">
                    <button className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none">Previous</button>
                    <div className="px-4 py-2 bg-blue-500 text-white">1</div>
                    <button className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none">Next</button>
                </div>
            </div>
        </div>
    );
}

export default DoctorList;
