import AdminHeader from "../components/Admin/AdminHeader";
import AdminNavigate from "../components/Common/BreadCrumbs";
// import Footer from "../components/Common/Footer";
// import Header from "../components/Common/Header";
// import LeftNavBar from "../components/Common/LeftNavBar";
import Loader from "../components/Loader";
import SuccessAlert from "../components/Alerts/SuccessAlert";
import BlackAlert from "../components/Alerts/BlackAlert";
import BlueAlert from "../components/Alerts/BlueAlert";
import ErrorAlert from "../components/Alerts/ErrorAlert";
import GrayAlert from "../components/Alerts/GrayAlert";
import WarningAlert from "../components/Alerts/WarningAlert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Common/Header";
import DashboardNav from "../pages/UserDashboard/DashboardNav";


const DashboardLayout = ({ children }) => {

  const { isVisible, message, alertType } = useSelector((state) => state.alert);
  const isVisibleLoader = useSelector((state) => state.loader.isVisible);
  const [isManuallyVisible, setIsManuallyVisible] = useState(false);

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
        <Header />
        <div className="flex">
          <div className="flex flex-col h-[100vh] sticky top-0">
            <DashboardNav />
          </div>
          <div className="flex-1 overflow-y-hidden">
            {children}
          </div>
        </div>

      </div>
    </div>


  );
};

export default DashboardLayout;
