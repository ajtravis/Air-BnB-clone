import React from 'react';
import { useSelector } from 'react-redux'

const ReviewCard = (props) => {
    const  reviewData  = props.reviewData;
    const createdAt = reviewData.createdAt;
    const date = String(createdAt);
    const dateSplit = date.split("-");
    const year = +dateSplit[0];
    const month = +dateSplit[1];
    const poster = reviewData.User;
    const reviewBody = reviewData.review;
    console.log("props in card", props)
    const monthsArr = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]
    const monthName = monthsArr[month - 1]
    return (
        <div className='review-container'>
            <div id="user-name">{poster.firstName}</div>
            <div id="post-date">{monthName} {year}</div>
            <div id="review-body">{reviewBody}</div>
        </div>
    )
}

export default ReviewCard
