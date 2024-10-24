import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import SuccessAlert from "../components/Alerts/SuccessAlert";
import BlackAlert from "../components/Alerts/BlackAlert";
import BlueAlert from "../components/Alerts/BlueAlert";
import ErrorAlert from "../components/Alerts/ErrorAlert";
import GrayAlert from "../components/Alerts/GrayAlert";
import WarningAlert from "../components/Alerts/WarningAlert";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoctorHeader from "../components/Doctor/DoctorHeader";
import DoctorNavbar from "../components/Doctor/DoctorNavbar";

const DoctorLayout = ({ children }) => {
  const { isVisible, message, alertType } = useSelector((state) => state.alert);
  const isVisibleLoader = useSelector((state) => state.loader.isVisible);
  const [isManuallyVisible, setIsManuallyVisible] = useState(false);
  const location = useLocation(); // Get current route

  // Routes where DoctorNavbar should be hidden
  const hideNavbarRoutes = [
    "/doctor/verification-page1",
    "/doctor/verification-page2",
    "/doctor/verification-page3"
  ];

  useEffect(() => {
    if (isVisible) {
      setIsManuallyVisible(false);

      setTimeout(() => {
        setIsManuallyVisible(true);
      }, 300);
    }
  }, [isVisible]);

  const renderAlert = () => {
    switch (alertType) {
      case "success":
        return <SuccessAlert message={message} initialState={true} />;
      case "failed":
        return <ErrorAlert message={message} initialState={true} />;
      case "black":
        return <BlackAlert message={message} initialState={true} />;
      case "blue":
        return <BlueAlert message={message} initialState={true} />;
      case "gray":
        return <GrayAlert message={message} initialState={true} />;
      case "warning":
        return <WarningAlert message={message} initialState={true} />;
      default:
        return null;
    }
  };

  return (
    <div className={"main"}>
      {isManuallyVisible && <div className="fixed top-0 left-0 w-full z-50">{renderAlert()}</div>}

      {isVisibleLoader && <Loader />}

      <div>
        <DoctorHeader />
        <div className="flex">
          {/* Conditionally render the DoctorNavbar based on the current route */}
          {!hideNavbarRoutes.includes(location.pathname) && (
            <div className="flex flex-col h-screen sticky top-0">
              <DoctorNavbar />
            </div>
          )}

          <div className="flex-1 mb-10">
            {children}
            <div className="h-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
