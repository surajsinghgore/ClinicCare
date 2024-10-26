import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideAlert } from "../../redux/Slices/AlertToggleState";

const BlackAlert = ({ message, initialState }) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = React.useState(initialState);
  const hideAlertToast = () => {
    setShowAlert(false);
    dispatch(hideAlert());
  };

    // Automatically hide alert after 2 seconds
    useEffect(() => {
      if (showAlert) {
        const timer = setTimeout(() => {
          hideAlertToast();
        }, 2000);
  
        // Clear timer if component unmounts or `showAlert` changes
        return () => clearTimeout(timer);
      }
    }, [showAlert]);

  return (
    <>
      {showAlert && (
        <div className="space-y-3">
          <div className="max-w bg-alert-black text-sm text-white shadow-lg" role="alert" tabIndex="-1" aria-labelledby="hs-toast-solid-color-dark-label">
            <div id="hs-toast-solid-color-dark-label" className="flex p-4">
              {message}
              <div className="ms-auto">
                <button
                  onClick={() => hideAlertToast()}
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlackAlert;
