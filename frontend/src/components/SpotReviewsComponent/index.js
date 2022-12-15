import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const SpotReviewsComponent = () => {
 const allReviews = useSelector((state) => state.reviews)

 const reviews = Object.values(allReviews)

 useEffect(() => {
    console.log("reviews useEffect is running");
    dispatch(getSpotReviews(spot.id));

  }, [spot]);

  return (
    <div>
        <ul>
           {
            reviews.map((ele) => <li className='review-card' reviewData={ele}>{}</li>)
           }
        </ul>
    </div>
  );
};

export default SpotReviewsComponent;
