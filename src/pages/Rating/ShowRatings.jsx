import { Rating } from "react-simple-star-rating";

export default function ShowRatings() {
  const reviews = [
    {
      name: "Alex Suprun",
      date: "December 2023",
      profileImg: "https://via.placeholder.com/50", // Replace with actual profile images
      rating: 100,
      review: "Everything is perfect",
    },
    {
      name: "Jurica Koletić",
      date: "December 2023",
      profileImg: "https://via.placeholder.com/50",
      rating: 100,
      review: "Everything is perfect",
    },
    {
      name: "Courtney Cook",
      date: "December 2023",
      profileImg: "https://via.placeholder.com/50",
      rating: 100,
      review: "Everything is perfect",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      {/* Reviews Header */}
      <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-gray-800">15 reviews</h1>
          <select className="border border-gray-300 rounded-lg p-2 text-gray-600 text-sm">
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
            className="w-full border border-gray-300 rounded-lg p-2 pl-10 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-3 text-gray-400"
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
              className="w-12 h-12 rounded-full mr-4"
            />
            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-800">
                  {review.name}
                </h2>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              {/* Stars */}
              <div className="my-2">
                <div className="my-2">
                  <Rating
                    initialValue={review.rating}
                    allowFraction
                    readonly
                    size={20}
                    style={{ display: "inline-flex", gap: "4px" }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-700">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
