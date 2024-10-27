import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllDoctorSubmittedListApi, searchAllDoctorSubmittedListApi } from "../../Utils/services/apis/Admin/Doctor/AdminDoctorApi";
import { useLocation } from "react-router-dom";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { useDispatch } from "react-redux";
import { getAllAdminApi, searchAllAdminApi } from "../../Utils/services/apis/Admin/AdminApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { extractFullDateTime } from "../../Utils/DateFormatFunction";

const AdminLists = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(queryParams.get("limit") || 10);
  const [page, setPage] = useState(queryParams.get("page") || 1);
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(page));

  // Fetch data when limit or page changes
  const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getAllAdminApi(currentPage, limit);
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
    navigate(`/admin/admins-list?limit=${newLimit}&page=1`);
  };

  // Handle previous page button click
  const handlePrevPage = () => {
    if (prev && currentPage > 1) {
      const newPage = currentPage - 1;
      setPage(newPage);
      setCurrentPage(newPage);
      navigate(`/admin/admins-list?limit=${limit}&page=${newPage}`);
    }
  };

  // Handle next page button click
  const handleNextPage = () => {
    if (next && currentPage < totalPage) {
      const newPage = currentPage + 1;
      setPage(newPage);
      setCurrentPage(newPage);
      navigate(`/admin/admins-list?limit=${limit}&page=${newPage}`);
    }
  };

  const searchBarHandle = async (e) => {
    let search = e.target.value;
    try {
      if (e.target.value == "") {
        dataFetch();
      } else {
        let searchData = await searchAllAdminApi(search);
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
        <div className="heading flex justify-between font-semibold border-b-2 border-black-400 pb-2 px-7 py-3 mb-2">
          <div>ID</div>
          <div className="ml-7">Name</div>
          <div className="ml-10">Email</div>
          <div className="ml-10">Phone</div>
          <div>Permission</div>
          <div>Last Login</div>
          <div>Active</div>
          <div>Action</div>
        </div>
        {console.log(data)}
        {data.map((admin, index) => (
          <div key={admin._id} className="flex items-center text-sm justify-between border-b border-black-200 px-7 py-2">
            <div>#{++index}</div>
            <div className="flex items-center">{admin.name}</div>
            <div>{admin.email}</div>
            <div>{admin.mobile}</div>
            <div>{admin.permission}</div>
            <div>{extractFullDateTime(admin.lastActiveAt)}</div>
            <div>{admin.activeDevice ? "Online" : "Offline"}</div>
            <div className="flex items-center">
              <FaEdit className="text-black-500 hover:text-black-800 text-xl cursor-pointer mr-5" onClick={() => handleEdit(admin.id)} />
              <MdDelete className="text-[#FF5B61] hover:text-[#FF0000] text-xl cursor-pointer" onClick={() => handleDelete(admin.id)} />
            </div>
          </div>
        ))}
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

export default AdminLists;
