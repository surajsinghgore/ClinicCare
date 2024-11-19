import ReactStars from "react-stars";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { getAllRatingOfDoctor, getAllRatingOfDoctorSortBy, searchAllRatingOfDoctor } from "../../Utils/services/apis/User/RatingApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { FaSearch } from "react-icons/fa";

export default function ShowRatings() {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const [review, setReview] = useState([]);
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || 'latest')
  const [hashMore, setHashMore] = useState(false);
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(queryParams.get("limit") || 10);

  const doctorReviewFetch = async () => {
    try {
      setReview([]);
      dispatch(showLoader());
      const res = await getAllRatingOfDoctorSortBy(doctorId, parseInt(limit), sortBy);

      if (res?.status) {
        setReview(res.data);
        setHashMore(res.hasMore);
      } else {
        setReview([]);
        setHashMore(false);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({ message: error?.response?.data?.message || "Something went wrong", type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  const loadMoreData = () => {
    const newLimit = parseInt(limit, 10) + 10;
    setLimit(newLimit);
    navigate(`/show-ratings/${doctorId}?limit=${newLimit}&sortBy=oldest`);
  };

  useEffect(() => {
    doctorReviewFetch();
  }, [limit]);

  const sortByStateChange = async (e) => {

    setSortBy(e.target.value)
    dispatch(showLoader());
    navigate(`/show-ratings/${doctorId}?limit=${limit}&sortBy=${e.target.value}`);
    try {
      setReview([]);
      dispatch(showLoader());
      const res = await getAllRatingOfDoctorSortBy(doctorId, parseInt(limit), e.target.value);

      if (res?.status) {
        setReview(res.data);
        setHashMore(res.hasMore);
      } else {
        setReview([]);
        setHashMore(false);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({ message: error?.response?.data?.message || "Something went wrong", type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  }

  const handleSearchChange = async (e) => {

    if (e.target.value == "") {
      doctorReviewFetch()
    }
    setSortBy(e.target.value)
    dispatch(showLoader());

    try {
      setReview([]);
      dispatch(showLoader());
      const res = await searchAllRatingOfDoctor(doctorId, e.target.value);

      if (res?.status) {
        setReview(res.data);
        setHashMore(res.hasMore);
      } else {
        setReview([]);
        setHashMore(false);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({ message: error?.response?.data?.message || "Something went wrong", type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  }
  return (
    <div className="w-[80%] m-auto flex flex-col items-center p-8">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-black-800">
            {review.length > 0 ? `${review.length} reviews` : "No reviews found"}
          </h1>
          <select value={sortBy} name="sortBy" onChange={(e) => sortByStateChange(e)} className="border border-black-300 rounded-lg p-2 text-black-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 hover:bg-black-100 active:bg-black-200 transition duration-200 ease-in-out">
            <option value={'latest'}>Latest Reviews</option>
            <option value='oldest'>Oldest Reviews</option>

          </select>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search..."
            name="search"
            onChange={(e) => handleSearchChange(e)}
            className="w-full border border-black-300 rounded-lg p-3 pl-10 text-sm focus:ring-2 focus:ring-blue-700 focus:outline-none"
          />
          <FaSearch className="h-5 w-5 absolute left-3 top-3 text-black-400" />


        </div>

        {/* Reviews List */}
        {review.length > 0 ? (
          review.map((review, index) => (
            <div key={index} className="p-2 flex items-center border-black-300 border-b hover:bg-black-100">
              {/* Profile Image */}
              <img
                src={review.profileUrl}
                alt={review.userName}
                className="w-[70px] h-[70px] mt-3 object-cover rounded-full mr-4"
              />
              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-bold text-black-800">{review.userName}</h2>
                  <span className="text-sm text-black-500">{review.date}</span>
                </div>
                {/* Stars */}
                <div>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={30}
                    color1={"#d1d1d1"}
                    color2={"rgb(247 133 35)"}
                    className="sizesofStar"
                    isHalf={true}
                    edit={false}
                  />
                </div>
                <p className="text-base text-black-700">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">No reviews found</div>
        )}

        {/* Load More Button */}
        {hashMore && (
          <div className="flex items-center justify-center mt-4">
            <button
              className="text-white px-5 py-1 bg-[#034EB0] rounded-lg"
              onClick={loadMoreData}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
