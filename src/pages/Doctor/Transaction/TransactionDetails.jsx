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
import { showAlert } from "../../../redux/Slices/AlertToggleState";
import { hideLoader, showLoader } from "../../../redux/Slices/LoaderState";
import { getMyTransactionAppointmentsByIdApi } from "../../../Utils/services/apis/Doctor/TransactionApi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const TransactionDetails = () => {
    // Fetch data when limit or page changes
    const {id}=useParams()
    const [data,setData]=useState([])
    const dispatch=useDispatch()
    const dataFetch = async () => {
    try {
      dispatch(showLoader());
      let res = await getMyTransactionAppointmentsByIdApi(id);
      if (res?.success) {
        setData(res.data)
      }
    } catch (error) {
      console.log(error);
      dispatch(showAlert({ message: error?.response?.data?.message, type: "failed" }));
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);
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
        {console.log(data)}
          <AppointmentDetails
            field={"Payment Method"}
              value={data?.paymentMethod}
            icon={<CiCreditCard1 />}
          />
          <AppointmentDetails
            field={"TXN ID"}
              value={data?.txnId}
            icon={<FaOrcid />}
          />
          <AppointmentDetails
            field={"Platform Fee"}
              value={data?.platformFee}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Service Fee"}
              value={data?.totalAmount - data?.platformFee}
            icon={<FaRupeeSign />}
          />
          <AppointmentDetails
            field={"Transaction ID"}
              value={data?.transactionId}
            icon={<FaOrcid />}
          />
          <AppointmentDetails
            field={"Transaction Message"}
              value={data?.methodRes?.message}
            icon={<MdMessage />}
          />
          <AppointmentDetails
            field={"Merchant ID"}
              value={data?.methodRes?.data?.merchantId}
            icon={<FaOrcid />}
          />
          <AppointmentDetails
            field={"Merchant Transaction"}
            value={data?.methodRes?.data?.merchantTransactionId}
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
            value={(data?.methodRes?.data?.amount / 100).toFixed(2)}
            icon={<MdCallReceived />}
          />
          <AppointmentDetails
            field={"State"}
              value={data?.methodRes?.data?.state}
            icon={<BiMessageDetail />}
          />
          <AppointmentDetails
            field={"Response Code"}
            value={data?.methodRes?.data?.responseCode}
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
            value={data?.methodRes?.data?.paymentInstrument?.type}

            icon={<LuFileType />}
          />
          <AppointmentDetails
            field={"Card Type"}
            value={data?.methodRes?.data?.paymentInstrument?.cardType}
            icon={<FaCreditCard />}
          />
          <AppointmentDetails
            field={"PG Transaction ID"}
            value={data?.methodRes?.data?.paymentInstrument?.pgTransactionId}

            icon={<FaOrcid />}
          />
          <AppointmentDetails
            field={"BRN"}
            value={data?.methodRes?.data?.paymentInstrument?.brn}

            icon={<FaCreditCard />}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
