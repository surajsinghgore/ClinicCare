import React from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs';

const ServicesList = () => {
    const services = [
        { id: '#1', serviceName: 'Health of Clinic', speciality:'Dentist', fees: '5000rs', clinicName: 'New York' },
        { id: '#2', serviceName: 'Wellness Center', speciality:'Dentist', fees: '5000rs', clinicName: 'Los Angeles' },
        { id: '#3', serviceName: 'City of Health', speciality: 'Dentist', fees: '5000rs', clinicName: 'Chicago' },
        { id: '#4', serviceName: 'Family Clinic', speciality: 'Dentist', fees: '5000rs', clinicName: 'Houston' }
    ];

    const handleView = (id) => {
        // Implement view functionality here
        console.log(`View services with ID: ${id}`);
    };

    return (
        <div>
            <BreadCrumbs currentPath="Clinic List" />
            <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
                <div className="top flex items-center justify-between mb-14">
                    <h1 className='text-xl font-semibold'>Services List</h1>
                    <button className='bg-blue-500 text-white shadow-sm shadow-secondary rounded-lg p-2'>Add Services</button>
                </div>
                <div className="mb-4">
                    <div className="topSelect flex items-center justify-between">
                        <div className='flex gap-1'>
                            <p className='text-black-600 text-sm'>Display</p>
                            <select serviceName="pages" id="pages" className="bg-white border border-black-400 text-sm rounded-sm">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="75">75</option>
                                <option value="100">100</option>
                            </select>
                            <p className='text-black-600 text-sm'>Records Per Page</p>
                        </div>
                        <div className='flex gap-1'>
                            <label htmlFor="search" className='text-black-600'>Search: </label>
                            <input type="text" serviceName='search' id='search' className='border border-black-500 pl-1 rounded-md' />
                        </div>
                    </div>
                </div>
                <div className="list w-[100%] border border-black-200 rounded-md">
                    <div className="heading flex justify-between font-semibold border-b-2 border-black-400 pb-2 px-7 py-3 mb-2">
                        <div>ID</div>
                        <div className='ml-7'>Service Name</div>
                        <div className='ml-10'>Speciality</div>
                        <div className='ml-10'>Fees</div>
                        <div className='ml-10'>Clinic Name</div>
                        <div>Action</div>
                    </div>
                    {services.map((services) => (
                        <div key={services.id} className="flex items-center text-sm justify-between border-b border-black-200 px-5 py-2">
                            <div>{services.id}</div>
                            <div className="text-left">{services.serviceName}</div>
                            <div className="mr-4">{services.speciality}</div>
                            <div>{services.fees}</div>
                            <div>{services.clinicName}</div>
                            <div className="">
                                <button 
                                    className="bg-blue-500 text-white p-[0.4rem] rounded hover:bg-blue-700 cursor-pointer"
                                    onClick={() => handleView(services.id)}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="last mt-6">
                    <p className='text-sm pl-2'>Showing Page 1 of 1</p>
                </div>
            </div>
        </div>
    );
}

export default ServicesList;
