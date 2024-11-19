import ReactStars from "react-stars";

export default function ShowRatings() {
  const reviews = [
    {
      name: "Alex Suprun",
      date: "December 2023",
      profileImg: "https://via.placeholder.com/50",
      rating: 5,
      review: "Everything is perfect",
    },
    {
      name: "Jurica Koletić",
      date: "December 2023",
      profileImg: "https://via.placeholder.com/50",
      rating: 4.5,
      review: "Everything is perfect",
    },
    {
      name: "Courtney Cook",
      date: "December 2023",
      profileImg: "https://via.placeholder.com/50",
      rating: 4,
      review: "Everything is perfect",
    },
    {
      name: "Sam Altmen",
      date: "December 2023",
      profileImg: "https://via.placeholder.com/50",
      rating: 3,
      review: "Everything is perfect",
    },
    {
      name: "Elon Musk",
      date: "December 2023",
      profileImg: "https://via.placeholder.com/50",
      rating: 2,
      review: "Everything is perfect",
    },
  ];

  return (
    <div className="w-[80%] m-auto flex flex-col items-center p-8">
      {/* Reviews Header */}
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-black-800">5 reviews</h1>
          <select className="border border-black-300 rounded-lg p-2 text-black-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 hover:bg-black-100 active:bg-black-200 transition duration-200 ease-in-out">
            <option>Most recent</option>
            <option>Highest rating</option>
            <option>Lowest rating</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-black-300 rounded-lg p-3 pl-10 text-sm focus:ring-2 focus:ring-blue-700 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-3 text-black-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16l-4-4m0 0l4-4m-4 4h16"
            />
          </svg>
        </div>

        {/* Reviews List */}
        {reviews.map((review, index) => (
          <div key={index} className="flex items-start mb-6">
            {/* Profile Image */}
            <img
              src={review.profileImg}
              alt={review.name}
              className="w-20 h-2w-20 rounded-full mr-4"
            />
            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-md font-bold text-black-800">
                  {review.name}
                </h2>
                <span className="text-sm text-black-500">{review.date}</span>
              </div>
              {/* Stars */}
              <div>
                <div>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={30}
                    color1={"#d1d1d1"}
                    color2={"rgb(247 133 35)"}
                    className="sizesofStar"
                    isHalf={true}
                    edit={false}
                  />
                </div>
              </div>
              <p className="text-base text-black-700">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
