import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteReviewThunk } from '../../store/reviews';

const ReviewCard = (props) => {
    const  reviewData  = props.reviewData;
    const createdAt = reviewData.createdAt;
    const date = String(createdAt);
    const dateSplit = date.split("-");
    const year = +dateSplit[0];
    const month = +dateSplit[1];
    const poster = reviewData.User;
    const reviewBody = reviewData.review;
    const user = useSelector((state) => state.session.user)
    const monthsArr = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]
    const monthName = monthsArr[month - 1]
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteReviewThunk({reviewId: props.reviewData.id}))
    }

    return (
        <div className='review-container'>
            <div id="user-name">{poster.firstName}</div>
            <div id="post-date">{monthName} {year}</div>
            <div id="review-body">{reviewBody}</div>
            {(user.id === poster.id)?
            <button onClick={handleDelete}>Delete Review</button>:
            <></>}
        </div>
    )
}

export default ReviewCard
