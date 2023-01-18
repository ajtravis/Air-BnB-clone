import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteReviewThunk, getSpotReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import "./reviewCard.css"
import { findSpot, resetSpot } from '../../store/singleSpot';
import { useSpot } from '../../context/spot';

const ReviewCard = (props) => {
    const reviewData  = props.reviewData;
    const createdAt = reviewData.createdAt;
    const date = String(createdAt);
    const dateSplit = date.split("-");
    const year = +dateSplit[0];
    const month = +dateSplit[1];
    const [poster, setPoster] = useState(reviewData.User);
    const reviewBody = reviewData.review;
    const user = useSelector((state) => state.session.user)
    const monthsArr = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]
    const monthName = monthsArr[month - 1]
    const dispatch = useDispatch();
    const spotId = useParams();
    const id = spotId.spotId
    const { avg, setAvg } = useSpot();
    const [spot, setSpot] = useState(useSelector((state) => state.spot))


    const handleDelete = () => {
        dispatch(deleteReviewThunk({reviewId: props.reviewData.id}))
            .then(()=> setSpot(dispatch(findSpot(spotId))))
            .then(() => dispatch(getSpotReviews(id)))
            .then(() => setAvg(spot.avgStarRating))
    }

    return (
        <div className='review-container'>
            <div id="user-name">{poster.firstName}</div>
            <div id="post-date">{monthName} {year}</div>
            <div id="review-body">{reviewBody}</div>
            {user && (user.id === poster.id)?
            <button className='delete-review' onClick={handleDelete}>Delete Review</button>:
            <></>}
        </div>
    )
}

export default ReviewCard
