import React, { useEffect } from 'react';
import BreadCrumbs from '../../components/Common/BreadCrumbs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { getMyClinicApi } from '../../Utils/services/apis/Doctor/ClinicDoctorApi';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { useDispatch } from 'react-redux';

const ClinicsList = () => {

    const dispatch = useDispatch();

    const fetchClinicData = async() => {
        dispatch(showLoader());
        try {
            let res = await getMyClinicApi()
            console.log(res)
        } catch (error) {
            dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
          } finally {
            dispatch(hideLoader());
          }
    }

    useEffect(() => {
        fetchClinicData();
    },[])

    const clinics = [
        { id: '#1', name: 'Health of Clinic', address:'123 Main St', contact: '3345678901', city: 'New York' },
        { id: '#2', name: 'Wellness Center', address:'456 Elm St', contact: '3345678902', city: 'Los Angeles' },
        { id: '#3', name: 'City Health', address: '789 Oak St', contact: '3345678903', city: 'Chicago' },
        { id: '#4', name: 'Family of Clinic', address: '321 Pine St', contact: '3345678904', city: 'Houston' }
    ];

    const handleView = (id) => {
        // Implement view functionality here
        console.log(`View clinic with ID: ${id}`);
    };

    const handleEdit = (id) => {
        // Implement edit functionality here
        console.log(`Edit admin with ID: ${id}`);
    };

    const handleDelete = (id) => {
        // Implement delete functionality here
        console.log(`Delete admin with ID: ${id}`);
    };

    return (
        <div>
            <BreadCrumbs currentPath="Clinic List" />
            <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
                <div className="top flex items-center justify-between mb-14">
                    <h1 className='text-xl font-semibold'>Clinic List</h1>
                    <button className='bg-blue-500 text-white shadow-sm shadow-secondary rounded-lg p-2'>Add Clinic</button>
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
                        <div className='flex gap-1'>
                            <label htmlFor="search" className='text-black-600'>Search: </label>
                            <input type="text" name='search' id='search' className='border border-black-500 pl-1 rounded-md' />
                        </div>
                    </div>
                </div>
                <div className="list w-[100%] border border-black-200 rounded-md">
                    <div className="heading flex justify-between font-semibold border-b-2 border-black-400 pb-2 px-7 py-3 mb-2">
                        <div>ID</div>
                        <div className='ml-7'>Name</div>
                        <div className='ml-10'>Address</div>
                        <div className='ml-10'>Contact</div>
                        <div className='ml-10'>City</div>
                        <div>Action</div>
                    </div>
                    {clinics.map((clinic) => (
                        <div key={clinic.id} className="flex items-center text-sm justify-between border-b border-black-200 px-5 py-2">
                            <div>{clinic.id}</div>
                            <div className="flex items-center">{clinic.name}</div>
                            <div className="mr-4">{clinic.address}</div>
                            <div>{clinic.contact}</div>
                            <div>{clinic.city}</div>
                            <div className="flex items-center">
                                <FaEdit
                                    className="text-black-500 hover:text-black-800 text-xl cursor-pointer mr-5"
                                    onClick={() => handleEdit(admin.id)}
                                />
                                <MdDelete
                                    className="text-[#FF5B61] hover:text-[#FF0000] text-xl cursor-pointer"
                                    onClick={() => handleDelete(admin.id)}
                                />
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

export default ClinicsList;
