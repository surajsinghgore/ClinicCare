import loader from "../assets/loader.svg";

const Loader = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-50 bg-loader-900 flex items-center justify-center">
      <img src={loader} alt="loader" />
    </div>



  );
};

export default Loader;
