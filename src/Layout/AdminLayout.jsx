import AdminHeader from "../components/Admin/AdminHeader";
import AdminNavigate from "../components/Common/AdminNavigate";
// import Footer from "../components/Common/Footer";
// import Header from "../components/Common/Header";
import LeftNavBar from "../components/Common/LeftNavBar";
import Loader from "../components/Loader";

const AdminLayout = ({ children }) => {
  return (
    <div className={"main"}>
      {/* <ToastContainer /> */}

      <div>
        <Loader />
        <AdminHeader />
        <div className="flex">
          <div className="flex flex-col">
            <LeftNavBar />
          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
