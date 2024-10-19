import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import Loader from "../components/Loader";

const AdminLayout = ({ children }) => {
  return (
    <div className={"main"}>
      {/* <ToastContainer /> */}

      <div>
        <Loader />
        <Header />
        {children}
        <Footer/>
      </div>
    </div>
  );
};

export default AdminLayout;
