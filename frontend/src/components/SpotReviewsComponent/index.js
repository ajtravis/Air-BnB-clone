import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewCard from '../ReviewCard';
import { getSpotReviews } from '../../store/reviews';

const SpotReviewsComponent = () => {
 const dispatch = useDispatch();
 const spot = useSelector((state) => state.spot)
 const allReviews = useSelector((state) => state.reviews)
 const reviews = Object.values(allReviews)


 useEffect(() => {
     console.log("reviews useEffect is running");
     dispatch(getSpotReviews(spot.id));

   }, [spot.id]);

console.log("reviews in componant", reviews)
  return (
    <div>
        <ul className="reviews-list">
           {
            reviews.map((ele) => <li className='review-item'
             key={ele.id}>
                <ReviewCard reviewData={ele} />
            </li>)
           }
        </ul>
    </div>
  );
};

export default SpotReviewsComponent;
