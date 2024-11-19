
import ReactStars from 'react-stars';

const ReviewCard = ({ review }) => {

    return (
        <div className="min-w-sm max-w-sm p-4 border rounded-lg shadow-md bg-white w-[500px]">
            <div className="flex items-center justify-between">
                {/* Star Rating */}
                <div className="flex items-center">
                    <ReactStars
                        count={5}
                        value={review?.rating}
                        size={30}
                        color1={"#d1d1d1"}
                        color2={"rgb(247 133 35)"}
                        className="sizesofStar"
                        isHalf={true}
                        edit={false}
                    />
                </div>
                <span className="text-black-500 text-sm"> {review?.date}</span>
            </div>
            <p className="text-black-700 text-sm mt-3 text-start">
                {review?.comment}</p>
            <div className="flex items-center mt-4 ">
                <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={review?.profileUrl}
                    alt="User profile"
                />
                <span className="ml-3 text-black-700 font-medium text-sm">{review?.userName}</span>
            </div>
        </div>
    )
}

export default ReviewCard