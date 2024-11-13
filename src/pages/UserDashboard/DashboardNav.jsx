import { useEffect } from "react";
import { FaUserAlt, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { MdPassword, MdEventNote } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import UserNav from "./UserNav";
import { hideLoader, showLoader } from "../../redux/Slices/LoaderState";
import { fetchMyUserDetails } from "../../redux/Slices/GetMyActiveUserDetails";
import { showAlert } from "../../redux/Slices/AlertToggleState";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../Utils/LocalStorage";

const DashboardNav = () => {
  const role = getLocalStorage('role')
  const { getMyUserDetails } = useSelector((state) => state.getMyUserDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(showLoader());
      dispatch(fetchMyUserDetails());
    } catch (error) {
      dispatch(
        showAlert({ message: error?.response?.data?.message, type: "failed" })
      );
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch]);




  const logout = () => {
    localStorage.clear();
    dispatch(showAlert({ message: `${role} has logged out successfully`, type: "blue" }));
    navigate("/auth/login");
  }
  return (
    <div className="shadow-lg h-[100vh]">
      {/* Profile Section */}
      <section className="bg-[#FFFFFF] pb-4 px-4 border-b-[1px] border-black-200">
        <div className="flex items-center ml-1 mt-10 relative">
          <div className="relative group">
            <img
              src={getMyUserDetails?.profileUrl}
              alt="User Profile"
              className="h-[4.8rem] w-[4.8rem] mr-4 rounded-full object-cover shadow-md"
            />
            <Link to={"/user/user-profile-change"}>
              <FaEdit
                className="absolute right-3 inset-0 m-auto p-1 bg-white rounded-full text-black-800 text-3xl cursor-pointer shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                title="Edit Profile"
              />
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-semibold">{getMyUserDetails?.name}</h1>
            <p className="text-sm">User</p>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className=" w-[16rem] py-5 flex-grow bg-[#FFFFFF]">
        <nav className="flex flex-col justify-between space-y-2">
          <UserNav
            link="/user/user-general-details"
            title="General"
            icons={<FaUserAlt className="text-2xl text-black-800" />}
          />
          <UserNav
            link="/user/user-password-change"
            title="Password"
            icons={<MdPassword className="text-2xl text-black-800" />}
          />
          <UserNav
            link="/user/user-appointment"
            title="Appointment"
            icons={<MdEventNote className="text-2xl text-black-800" />}
          />
          <div onClick={() => logout()}>

            <UserNav
              link="/auth/login"
              title="Logout"
              icons={<FaSignOutAlt className="text-2xl text-black-800" />}
            />
          </div>
        </nav>
      </section>
    </div>
  );
};

export default DashboardNav;
