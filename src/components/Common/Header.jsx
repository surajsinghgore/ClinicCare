
import logo from "../../assets/logo.png";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-20 w-full flex py-2 px-4 items-center font-semibold">
      <div className="left w-[180px] flex items-center">
        <img src={logo} alt="Logo" className="w-full h-full mt-10 ml-2" />
      </div>
      <div className="center flex-grow flex justify-center space-x-10">
        <NavLink to="/doctors" className="text-black transition-colors duration-300 hover:text-[#004AAD]" activeClassName="text-[#004AAD]">
          Our Doctors
        </NavLink>
        <NavLink to="/home" className="text-black transition-colors duration-300 hover:text-[#004AAD]" >
          Find A Clinic
        </NavLink>
        <NavLink to="/about" className="text-black transition-colors duration-300 hover:text-[#004AAD]" >
          Membership Plan
        </NavLink>
        <NavLink to="/contact" className="text-black transition-colors duration-300 hover:text-[#004AAD]" activeClassName="text-[#004AAD]">
          Contact
        </NavLink>
        <NavLink to="/bookappointment" className="text-black transition-colors duration-300 hover:text-[#004AAD]" activeClassName="text-[#004AAD]">
          Book Appointment
        </NavLink>
      </div>
      <div className="right flex items-center">
        <Link to="/auth/login" className="border text-black px-4 py-2 rounded mr-16" style={{ borderColor: "#004AAD", color: "#004AAD" }}>
          Signup / Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
