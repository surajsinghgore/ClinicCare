import { useEffect, useState } from "react";
import ReactStars from 'react-stars'
import { getLocalStorage } from "../../Utils/LocalStorage";
import { getMyRatingOfDoctor, giveMyRatingOfDoctor } from "../../Utils/services/apis/User/RatingApi";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";



export default function DoctorRating() {
  const dispatch = useDispatch()
  const { doctorId } = useParams()
  // State for service rating
  const [serviceRate, setServiceRate] = useState(0);

  const [userMessage, setUserMessage] = useState("");

  const handleServiceRate = (rate) => setServiceRate(rate);

  const submitRating = async (e) => {
    e.preventDefault();


    if (serviceRate === 0) {
      dispatch(showAlert({ message: "Please Give Service Rating", type: "failed" }));

      return;
    }
    if (!userMessage) {
      dispatch(showAlert({ message: "Please Enter Something in Message", type: "failed" }));


      return;
    }

    const payload = {
      "rating": serviceRate,
      "comment": userMessage
    }

    try {
      dispatch(showLoader());
      let res = await giveMyRatingOfDoctor(doctorId, payload);
      if (res?.status) {
        dispatch(showAlert({ message: res?.message, type: "success" }));

      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };



  const ratingDataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getMyRatingOfDoctor(doctorId);

      if (res?.status) {
        setServiceRate(res?.data?.rating)
        setUserMessage(res?.data?.comment)
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    ratingDataFetch();
  }, []);
  return (
    <div className="min-h-screen bg-black-50 flex items-center justify-center py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-black-800 text-center mb-6">
          Leave Your Feedback
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-black-600"
            >
              Client Email
            </label>
            <input
              id="userName"
              type="text"
              value={getLocalStorage('email')}
              readOnly
              className="mt-1 w-full border border-black-300 rounded-md shadow-sm py-2 px-3 text-black-800 bg-black-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-black-600"
            >
              Your Review
            </label>
            <textarea
              id="message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Write your review here..."
              className="mt-1 resize-none w-full border border-black-300 rounded-md shadow-sm py-2 px-3 text-black-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="6"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black-600 mb-2">
              Service Rating
            </label>
            <div className="rateSection">
              <div className="rateClient">
                <ReactStars
                  count={5}
                  value={serviceRate}
                  onChange={handleServiceRate}
                  size={60}
                  color1={"#d1d1d1"}
                  color2={"rgb(247 133 35)"}
                  className="sizesofStar"
                  isHalf={true}
                />
              </div>
            </div>


          </div>
          <button
            onClick={submitRating}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>

    </div>
  );
}
