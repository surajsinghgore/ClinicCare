import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import BreadCrumbs from '../../components/Common/BreadCrumbs';

const AdminLists = () => {
    const admins = [
        { id: '#001', name: 'Smith White', email: 'smith@gmail.com', phone: '3345678901', password: 'password123', permission: 'read', lastLogin: '2024-10-22 10:00 AM' },
        { id: '#002', name: 'Athus White', email: 'athus@gmail.com', phone: '3345678902', password: 'password456', permission: 'write', lastLogin: '2024-10-21 9:30 AM' },
        { id: '#003', name: 'Fartk White', email: 'fartk@gmail.com', phone: '3345678903', password: 'password789', permission: 'update', lastLogin: '2024-10-20 8:15 AM' },
        { id: '#004', name: 'Math White', email: 'math@gmail.com', phone: '3345678904', password: 'password101', permission: 'create', lastLogin: '2024-10-19 7:45 AM' }
    ];

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
            <BreadCrumbs currentPath="Admin's List" />
            <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
                <div className="top flex items-center justify-between mb-14">
                    <h1 className='text-xl font-semibold'>Admin List</h1>
                    <button className='bg-blue-500 text-white shadow-sm shadow-secondary rounded-lg p-2'>Add Admin</button>
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
                        <div className='ml-10'>Email</div>
                        <div className='ml-10'>Phone</div>
                        <div className='ml-6'>Password</div>
                        <div>Permission</div>
                        <div>Last Login</div>
                        <div>Action</div>
                    </div>
                    {admins.map((admin) => (
                        <div key={admin.id} className="flex items-center text-sm justify-between border-b border-black-200 px-7 py-2">
                            <div>{admin.id}</div>
                            <div className="flex items-center">{admin.name}</div>
                            <div>{admin.email}</div>
                            <div>{admin.phone}</div>
                            <div>{admin.password}</div>
                            <div>{admin.permission}</div>
                            <div>{admin.lastLogin}</div>
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

export default AdminLists;
