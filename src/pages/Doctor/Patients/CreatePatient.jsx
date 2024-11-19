import { IoPersonAdd } from "react-icons/io5";
import BreadCrumbs from "../../../components/Common/BreadCrumbs";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useState } from "react";

const CreatePatient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "exampleemail@gmail.com",
      img: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "exampleemail@gmail.com",
      img: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Suraj Singh",
      email: "exampleemail@gmail.com",
      img: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Tushar Negi",
      email: "exampleemail@gmail.com",
      img: "https://via.placeholder.com/50",
    },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPatient = (name) => {
    alert(`Patient with name ${name} added!`);
  };

  return (
    <div>
      <BreadCrumbs currentPath={"Create Patient"} />

      <div className="mt-6 p-10">
        <h1 className="flex items-center gap-5 underline text-4xl font-medium mb-10">
          Add New Patient <IoPersonAdd className="text-3xl" />
        </h1>
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for a patient..."
            className="w-full p-3 pl-10 border border-black-300 rounded shadow-md"
          />
          <FaSearch className="absolute top-4 left-3 text-black-400 text-lg" />
        </div>

        {/* Search Results */}
        <div className="bg-white shadow-md rounded-md">
          {results
            .filter((result) =>
              result.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center">
                  <img
                    src={result.img}
                    alt={result.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-lg text-black-800">
                      {result.name}
                    </span>
                    <span className="text-sm text-black-800">
                      {result.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddPatient(result.name)}
                  className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full shadow-md"
                >
                  <FaPlus />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePatient;
