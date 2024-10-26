import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllDoctorSubmittedListApi, searchAllDoctorSubmittedListApi } from "../../Utils/services/apis/Admin/Doctor/AdminDoctorApi";
import { useLocation } from "react-router-dom";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";

const DoctorList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(queryParams.get("limit") || 10);
  const [page, setPage] = useState(queryParams.get("page") || 1);
  const [totalPage, setTotalPage] = useState(1); // Set default to 1
  const [data, setData] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(page));

  // Fetch data when limit or page changes
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await fetchAllDoctorSubmittedListApi(currentPage, limit);
      if (res?.success) {
        setData(res.data);
        setLimit(res.pagination.limit);
        setTotalPage(res.pagination.totalPages);
        setNext(res.pagination.hasNextPage);
        setPrev(res.pagination.hasPrevPage);
        setCurrentPage(res.pagination.currentPage); 
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch();
  }, [limit, currentPage]);

  // Handle limit change and navigate to page 1
  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    setLimit(newLimit);
    setPage(1); // Reset to page 1
    navigate(`/admin/verify-doctor?limit=${newLimit}&page=1`);
  };

  // Handle previous page button click
  const handlePrevPage = () => {
    if (prev && currentPage > 1) {
      const newPage = currentPage - 1;
      setPage(newPage);
      setCurrentPage(newPage);
      navigate(`/admin/verify-doctor?limit=${limit}&page=${newPage}`);
    }
  };

  // Handle next page button click
  const handleNextPage = () => {
    if (next && currentPage < totalPage) {
      const newPage = currentPage + 1;
      setPage(newPage);
      setCurrentPage(newPage);
      navigate(`/admin/verify-doctor?limit=${limit}&page=${newPage}`);
    }
  };

  const searchBarHandle = async (e) => {
    let search = e.target.value;
    try {
      if (e.target.value == "") {
        dataFetch();
      } else {
        let searchData = await searchAllDoctorSubmittedListApi(search);
        setData(searchData?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative w-[97%] m-auto mt-10 mb-10 rounded-lg shadow-lg p-5">
      <div className="top flex items-center justify-between mb-14">
        <h1 className="text-xl font-semibold">Doctor List</h1>
        <Link to="/admin/add-doctor">
          <button className="bg-blue-500 text-white shadow-sm shadow-secondary rounded-lg p-2">Add Doctor</button>
        </Link>
      </div>

      <div className="mb-4">
        <div className="topSelect flex items-center justify-between">
          <div className="flex gap-1">
            <p className="text-black-600 text-sm">Display</p>
            <select name="pages" id="pages" value={limit} onChange={(e) => handleLimitChange(e)} className="bg-white border border-black-400 text-sm rounded-sm">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
            <p className="text-black-600 text-sm">Records Per Page</p>
          </div>
          <div className="flex gap-1 items-center">
            <label htmlFor="search" className="text-black-600">
              Search:{" "}
            </label>
            <input type="text" name="search" onChange={(e) => searchBarHandle(e)} id="search" className="border border-black-500 pl-1 h-7 w-60 rounded-md" />
          </div>
        </div>
      </div>

      <div className="list w-[100%] border border-black-200 rounded-md">
        <div className="heading flex justify-between font-semibold border-b-2 border-black-400 pb-2 px-5 py-3 mb-2">
          <div>ID</div>
          <div>Name</div>
          <div className="ml-6">Specialization</div>
          <div>Gender</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Action</div>
        </div>

        {data.map((doctor, index) => (
          <div key={doctor._id} className="flex items-center text-sm justify-between border-b border-black-200 px-5 py-2">
            <div>#{++index}</div>
            <div className="flex items-center">
              <img src={doctor.profileUrl} alt={doctor.profileUrl} className="w-12 h-12 object-cover rounded-full mr-2" />
              {doctor.name}
            </div>
            <div className="pr-5">{doctor.specialization}</div>
            <div className="pl-10">{doctor.gender}</div>
            <div>{doctor.email}</div>
            <div>{doctor.mobile}</div>
            <div>
              <Link to={`/admin/verify-doctor/${doctor._id}`} className="bg-blue-500 text-white rounded-lg px-3 py-1 transition duration-200 ease-in-out hover:bg-blue-700">
                View
              </Link>
            </div>
          </div>
        ))}
        {data.length == 0 && <p className="text-center text-lg py-5 text-black-400">No data found</p>}
      </div>

      <div className="last mt-6 flex items-center justify-between">
        <p className="text-sm pl-2">
          Showing Page {currentPage} of {totalPage}
        </p>
        <div className="flex items-center bg-black-100 border border-black-300 rounded-md">
          <button className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none" disabled={!prev} onClick={handlePrevPage}>
            Previous
          </button>
          <div className="px-4 py-2 bg-blue-500 text-white">{currentPage}</div>
          <button className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none" disabled={!next} onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
