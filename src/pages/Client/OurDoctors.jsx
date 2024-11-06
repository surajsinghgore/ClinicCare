import { Link } from 'react-router-dom';
import Header from '../../components/Common/Header';
import { FiSearch } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import Footer from '../../components/Common/Footer';
import { ourDoctorAllDataApi, ourDoctorSearchApi } from '../../Utils/services/apis/CommonApi';
import { useEffect, useState } from 'react';
import { showAlert } from '../../redux/Slices/AlertToggleState';
import { hideLoader, showLoader } from '../../redux/Slices/LoaderState';
import { useDispatch } from 'react-redux';

const OurDoctors = () => {
    const dispatch = useDispatch();

    const [doctor, setDoctor] = useState([])
    const dataFetch = async () => {
        try {
            dispatch(showLoader());
            let res = await ourDoctorAllDataApi();
            if (res?.success) {

                setDoctor(res.data)

            }
        } catch (error) {
            console.log(error);
            dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
        } finally {
            dispatch(hideLoader());
        }
    };

    const searchInput = async (e) => {
        if (e.target.value == "") {
            dataFetch()
        }
        try {
            let res = await ourDoctorSearchApi(e.target.value)
            if (res.success) {
                setDoctor(res.data)
            }
        } catch (error) {
            console.log(error)
            dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
        }
    }



    useEffect(() => {
        dataFetch()
    }, [])
    return (
        <>
            <Header />

            <div className="search w-full py-6">
                {/* Heading */}
                <h2 className="text-center text-3xl font-semibold text-black-700 mb-7 mt-14">
                    Search for Our Doctor
                </h2>

                {/* Search Bar */}
                <div className="flex justify-center items-center">
                    <div className="flex items-center bg-white w-3/5 rounded-full shadow-md px-4 py-3 outline outline-2 outline-black-300">
                        <FiSearch className="text-black-600 mr-2 text-2xl" />
                        <input
                            type="search"
                            placeholder="Search for Our Doctors"
                            className="w-full outline-none text-black-700"
                            onChange={(e) => searchInput(e)}
                        />
                    </div>
                </div>

                {/* Search Results */}
                <div className="w-4/5 mx-auto mt-8 space-y-10">
                    {
                        doctor.length !== 0 ? (
                            <>
                                {doctor.map((data) => {
                                    return (
                                        <div key={data._id}>
                                            <Link to={`/doctor-details/${data?._id}`} className="doctor-card flex items-start bg-white p-4 shadow rounded-lg hover:shadow-lg transition-shadow">
                                                <img
                                                    src={data?.doctorInfo?.profileUrl}
                                                    alt="Doctor Jenny Doe"
                                                    className="w-32 h-32 rounded-full object-cover"
                                                />
                                                <div className="ml-4 flex-grow">
                                                    <h3 className="text-xl font-semibold">Dr. {data?.doctorInfo?.name}</h3>
                                                    <p className="text-black-600 flex items-center mb-3">
                                                        <FaLocationDot className="mr-1" />
                                                        {data?.clinicInfo?.[0].city} {data?.clinicInfo?.[0].state}, {data?.clinicInfo?.[0].country}
                                                    </p>
                                                    <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Specialization:</span> {data?.doctorInfo?.highlights.map((item, index) => (
                                                        <>
                                                            {item}{index !== data.doctorInfo.highlights.length - 1 && ", "}
                                                        </>
                                                    ))}</p>
                                                    <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Hobbies:</span> {data?.doctorInfo?.hobbies.map((item, index) => (
                                                        <>
                                                            {item}{index !== data.doctorInfo.hobbies.length - 1 && ", "}
                                                        </>
                                                    ))}</p>
                                                    <button className="mt-4 px-4 py-1 text-white bg-[#0148B1] rounded-md shadow">Book Appointment</button>
                                                </div>
                                                <div className="ml-auto text-right">
                                                    <p className="text-black-600 mr-[3.1rem]"><span className='text-[#0148B1] font-semibold'>Experience:</span> {data?.doctorInfo?.experience} years</p>
                                                    <p className="text-black-600"><span className='text-[#0148B1] font-semibold'>Expertise:</span> {data?.doctorInfo?.specialization}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </>
                        ) : <p>No Doctor Found</p>
                    }
                    {/* Doctor Card 1 */}


                </div>
            </div >
            <Footer />
        </>
    )
}

export default OurDoctors