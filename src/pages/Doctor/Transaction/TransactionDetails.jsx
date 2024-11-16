import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { PiMoney } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";
import { FaOrcid } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdCallReceived } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { IoIosBarcode } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { LuFileType } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { FaCreditCard } from "react-icons/fa";
import AppointmentDetails from "../../../components/Doctor/AppointmentDetails";

const TransactionDetails = () => {
  return (
    <div>
      <BreadCrumbs currentPath="Transaction Details" />
      <div className="p-4 w-[95%] m-auto mt-10 border border-black-300 rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl underline font-semibold flex items-center gap-3">
            Transaction Details
            <PiMoney className="text-2xl text-success" />
          </h1>
        </div>

        {/* transaction details */}
        <div className="flex justify-between items-center mt-10">
          <h2 className="text-xl underline font-semibold flex items-center gap-3">
            All Transaction Details
            <GrTransaction className="text-2xl" />
          </h2>
        </div>
        <div className="mt-6 mb-10 grid grid-cols-4 gap-5">
          <AppointmentDetails
            field={"Payment Method"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<CiCreditCard1 />}
          />
          <AppointmentDetails
            field={"TXN ID"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaOrcid />}
          />
          <AppointmentDetails
            field={"Platform Fee"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Service Fee"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Transaction ID"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaOrcid />}
          />
          <AppointmentDetails
            field={"Transaction Message"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<MdMessage />}
          />
          <AppointmentDetails
            field={"Merchant ID"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaOrcid />}
          />
          <AppointmentDetails
            field={"Merchant Transaction"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<AiOutlineTransaction />}
          />
        </div>

        {/* amount details */}
        <div>
          <h2 className="text-xl underline font-semibold flex items-center gap-3">
            Payment Details
            <PiMoney className="text-2xl" />
          </h2>
        </div>
        <div className="mt-6 mb-10 grid grid-cols-3 gap-5">
          <AppointmentDetails
            field={"Amount Received"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<MdCallReceived />}
          />
          <AppointmentDetails
            field={"State"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<BiMessageDetail />}
          />
          <AppointmentDetails
            field={"Response Code"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<IoIosBarcode />}
          />
        </div>

        {/* payment instructions */}
        <div>
          <h2 className="text-xl underline font-semibold flex items-center gap-3">
            Payment Instructions
            <FaFileInvoiceDollar className="text-2xl" />
          </h2>
        </div>
        <div className="mt-6 mb-10 grid grid-cols-2 gap-5">
          <AppointmentDetails
            field={"Type"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<LuFileType />}
          />
          <AppointmentDetails
            field={"Card Type"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaCreditCard />}
          />
          <AppointmentDetails
            field={"PG Transaction ID"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaOrcid />}
          />
          <AppointmentDetails
            field={"BRN"}
            //   value={DoctorAppointmentById?.appointmentNumber}
            icon={<FaCreditCard />}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
