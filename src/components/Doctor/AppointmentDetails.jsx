const AppointmentDetails = ({field="", value='', icon=''}) => {
  return (
    <div>
        <div className="flex flex-col mb-3">
          <label
            htmlFor={field}
            className="text-[1.03rem] mb-1 text-black-600 flex items-center gap-3"
          >
            {icon} {field}
          </label>
          <div className="overflow-hidden">
            <input
              type="text"
              id={field}
              className="border border-black-300 rounded-md px-4 py-2 w-full text-black-600 bg-black-100 truncate"
              name={field}
              value={value}
              readOnly
            />
          </div>
        </div>
    </div>
  );
};

export default AppointmentDetails;