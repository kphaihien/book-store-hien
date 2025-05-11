import { FaStar } from 'react-icons/fa';

const StarRating = ({ numberStar }) => {
    const fullStars = Math.floor(numberStar);
    const partialStar = numberStar - fullStars; 

    return (
        <div className="flex items-center">
            {/* Hiển thị các ngôi sao vàng đầy đủ */}
            {Array.from({ length: fullStars }, (_, index) => (
                <FaStar className="ml-1 text-yellow-400" key={index} />
            ))}
            {/* Hiển thị ngôi sao thứ 5 với gradient */}
            {partialStar > 0 && (
                <FaStar
                    className="ml-1 text-gray-300"
                    
                />
            )}
        </div>
    );
};

export default StarRating;