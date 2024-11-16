import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { getMyTransactionAppointmentsApi, searchTransactionAllAppointmentsApi } from "../../../Utils/services/apis/Doctor/TransactionApi";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Transactions = () => {


  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    appointmentNumber: "",
    patientName: "",
    appointmentDate: "",
    txnId: "",
  });
  const queryParams = new URLSearchParams(location.search);
  const [limit, setLimit] = useState(queryParams.get("limit") || 10);
  const [currentPage, setCurrentPage] = useState(
    Number(queryParams.get("page") || 1)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPage, setTotalPage] = useState(1);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const dataFetch = useCallback(async () => {
    try {
      dispatch(showLoader());
      const res = await getMyTransactionAppointmentsApi(currentPage, limit);

      if (res?.success) {
        setData(res.data);
        setTotalPage(res.pagination.totalPages);
        setNext(res.pagination.hasNextPage);
        setPrev(res.pagination.hasPrevPage);
      }
    } catch (error) {
      console.error("Error fetching clinics:", error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    dataFetch();
  }, [limit, currentPage]);

  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    setLimit(newLimit);
    setCurrentPage(1);
    navigate(`/doctor/transaction-records?limit=${newLimit}&page=${currentPage}`);
  };

  const handlePrevPage = () => {
    if (prev && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`/doctor/transaction-records?limit=${limit}&page=${newPage}`);
    }
  };

  const handleNextPage = () => {
    if (next && currentPage < totalPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`/doctor/transaction-records?limit=${limit}&page=${newPage}`);
    }
  };


  const searchFetch = useCallback(async () => {
    try {
      dispatch(showLoader());

      // Destructure searchParams correctly
      const { appointmentNumber, patientName, appointmentDate, txnId } =
        searchParams;

      // Call the API function with the current search parameters
      const res = await searchTransactionAllAppointmentsApi(
        appointmentNumber,
        patientName,
        appointmentDate,
        txnId
      );

      // Check the response and update the state accordingly
      if (res?.success) {
        setData(res.data);
        setTotalPage(res.pagination.totalPages);
        setNext(res.pagination.hasNextPage);
        setPrev(res.pagination.hasPrevPage);
      }
    } catch (error) {
      console.error("Error searching appointments:", error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, currentPage, limit, searchParams]);

  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 on search
    searchFetch(); // Trigger the search
  };


  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div>
      <BreadCrumbs currentPath="Transaction Records" />
      <div className="p-4 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-red-600 font-semibold">
            All Transaction Records
          </h2>
        </div>
        <div className="mt-4 mb-10 flex space-x-4">
          <input
            type="number"
            placeholder="Search Appointment Id ..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="appointmentNumber"
            value={searchParams.appointmentNumber}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            placeholder="Search Patient Name..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="patientName"
            value={searchParams.patientName}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            placeholder="Search TXN ID..."
            className="border border-black-300 rounded-md px-3 py-2 w-full"
            name="txnId"
            value={searchParams.txnId}
            onChange={handleSearchChange}
          />
          <input
            type="date"
            placeholder="Select Appointment Date"
            className="border border-black-300 rounded-md px-3 py-1 w-[23%]"
            name="appointmentDate"
            value={searchParams.appointmentDate}
            onChange={handleSearchChange}
          />
          <button className="bg-blue-600 px-4 py-2 text-white rounded-md" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="mt-4 pt-7">
          <div className="topSelect flex items-center justify-between">
            <div className="flex gap-1">
              <p className="text-black-600 text-sm">Display</p>
              <select
                name="pages"
                id="pages"
                value={limit}
                onChange={handleLimitChange}
                className="bg-white border border-black-400 text-sm rounded-sm"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
              <p className="text-black-600 text-sm">Records Per Page</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="w-full bg-white overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 text-black-800">
              Appointment Records
            </h2>
            <table className="w-full text-left border border-black-300">
              <thead>
                <tr className="bg-[#D3D3D3] text-black-900 font-semibold">
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    #ID
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Date
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Time
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    TXN ID
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-sm uppercase tracking-wider border-b">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

                {data.length !== 0 ? (
                  <>
                    {data.map((transaction) => (
                      <tr key={transaction.transactionId} className="hover:bg-black-100">
                        <td className="px-6 py-4  text-black-900">
                          {transaction.appointmentNumber}
                        </td>
                        <td className="px-6 py-4 flex items-center">
                          <img
                            src={transaction.userProfileUrl}
                            alt={transaction.userProfileUrl}
                            className="w-12 h-12 rounded-full mr-4 border border-black-300 shadow-sm"
                          />
                          <span className="text-black-900 font-base">
                            {truncateText(transaction.userName, 20)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-black-900 font-base">
                          {transaction.appointmentDate}
                        </td>
                        <td className="px-6 py-4 text-black-900 font-base">
                          {transaction.appointmentTime}
                        </td>
                        <td className="px-6 py-4 text-black-900 font-base">
                          {truncateText(transaction.txnId)}
                        </td>
                        <td className="px-6 py-4 text-black-900 font-base">
                          {truncateText(transaction.amount, 12)}
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/doctor/transaction-details/${transaction.transactionId}`}>
                            <button className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <p className="min-w-full bg-white  p-4 w-full flex-1">
                    No Transaction Found.
                  </p>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="last mt-6 flex items-center justify-between">
          <p className="text-sm pl-2">
            Showing Page {currentPage} of {totalPage}
          </p>
          <div className="flex items-center bg-black-100 border border-black-300 rounded-md">
            <button
              className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none"
              disabled={!prev}
              onClick={handlePrevPage}
            >
              Previous
            </button>
            <div className="px-4 py-2 bg-blue-500 text-white">
              {currentPage}
            </div>
            <button
              className="px-4 py-2 text-black-700 hover:text-black-900 focus:outline-none"
              disabled={!next}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
