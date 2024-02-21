import React, { useState } from "react";



interface StarRatingProps {
    totalStars: number;
  }
function EcoRating  ({totalStars}:StarRatingProps) {
    
        const [rating, setRating] = useState<number>(0);
      
        const handleClick = (starIndex: number) => {
          if (starIndex === rating - 1) {
            setRating(0);
          } else {
            setRating(starIndex + 1);
          }
        };
 return (
    <div>
        {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}
        >
          &#9733;
        </span>
      ))}
      <p>Product Rating: {rating}</p>
      
    </div>
  );
}

export default EcoRating;
