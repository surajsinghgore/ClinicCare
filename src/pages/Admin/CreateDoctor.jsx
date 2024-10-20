import React, { useEffect } from 'react'
import AdminNavigate from '../../components/Common/BreadCrumbs'
import { RiUserAddLine } from "react-icons/ri";
import { MdOutlineMail } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa'; 
import { createDoctorValidation } from '../../Utils/services/FormValidation/AdminValidation';
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { showLoader, hideLoader } from "../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createDoctorApi } from '../../Utils/services/apis/Admin/Doctor/AdminDoctorApi';
import { useNavigate } from 'react-router-dom';

const CreateDoctor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createDoctorValidation) });


  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0].message;

      dispatch(showAlert({ message: firstError, type: "warning" }));

      return;
    }
  }, [errors]);



  const onSubmit = async (formData) => {
    let body = { ...formData };

    
    
    dispatch(showLoader());

    try {
      let res = await createDoctorApi(body);
      console.log(res);
      dispatch(showAlert({ message: res.message, type: "success" }));
    } catch (error) {
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <AdminNavigate currentPath="Add Doctor" />
      <div className='relative mainDiv w-[90%] h-[55%] m-auto mt-10 rounded-lg'>
        <div className='p-5 text-2xl flex items-center gap-3 text-[#116AEF] border-b border-black-400'>
          <RiUserAddLine />
          <h1 className='font-semibold text-2xl'>Add Doctor</h1>
        </div>


          <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex p-6'>
          <div className='flex flex-col'>
            <div className='flex items-center mb-3'>
              <label htmlFor='name' className='text-black-400'>Doctor Name</label>
            </div>
            <div className='flex items-center relative'>
              <input type="text" {...register("name")} autoFocus autoComplete='off' name='name' id='name' placeholder='Add doctor name...' className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10' />
              <FaUserEdit className='ml-2 text-lg absolute left-1' />
            </div>
          </div>
          <div className='flex flex-col ml-10'>
            <div className='flex items-center mb-3'>
              <label htmlFor='email' className='text-black-400'>Email</label>
            </div>
            <div className='flex items-center relative'>
              <input type="email" {...register("email")} autoComplete='off' name='email' id='email' placeholder='Add doctor email...' className='w-96 rounded-lg p-2 border border-black-200 focus:outline-none pl-10' />
              <MdOutlineMail className='ml-2 text-lg absolute left-1' />
            </div>
          <button className='ml-auto bg-blue-500 hover:bg-blue-700 duration-200 text-white m-8 shadow-lg font-bold py-2 px-3 rounded-md absolute bottom-0 right-0'>
            Create Doctor Profile
          </button>
          </div>
        </div>
          </form>
      </div>
    </>
  )
}

export default CreateDoctor