import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewCard from '../ReviewCard';
import { getSpotReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import "./reviews.css"
import { useSpot } from '../../context/spot'

const SpotReviewsComponent = ({reviews}) => {
 const dispatch = useDispatch();
 const {spotId} = useParams()
 const reviewsObj = useSelector(state => state.reviews)
 const reviewsList = Object.values(reviewsObj)
  const [spotReviews, setSpotReviews] = useState(reviews)

const { setAvg } = useSpot()

 useEffect(() => {
     console.log("reviews useEffect is running", spotReviews);
     setSpotReviews(Object.values(reviewsObj))
   }, [reviewsObj]);


  return (
    <div>
        <ul className="reviews-list">
           {
            spotReviews.map((ele) => <li className='review-item'
             key={ele.id}>
                <ReviewCard reviewData={ele} />
            </li>)
           }
        </ul>
    </div>
  );
};

export default SpotReviewsComponent;
