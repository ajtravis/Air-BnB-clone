import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSpotThunk, editSpot } from '../../store/spots'
import { useHistory, Redirect } from 'react-router-dom';
import SpotReviewsComponent from '../SpotReviewsComponent';
import { getSpotReviews } from '../../store/reviews';
import { findSpot } from '../../store/singleSpot';
import { useParams } from "react-router-dom";
import './spotDetails.css'


const SpotDetails = () => {


    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [spot, setSpot] = useState(useSelector((state) => state.spot))

    useEffect(() => {
        console.log("reviews useEffect is running");
        dispatch(findSpot(spot.id))
            .then(() => dispatch(getSpotReviews(spot.id)))
            .then(() => setIsLoaded(true))
      }, [spot, dispatch]);


    const user = useSelector((state) => state.session.user)
    const owner = spot.Owner;
    const spotReviews = useSelector((state) => state.reviews)
    const reviews = Object.values(spotReviews)

    const deleteHandler = (e) => {
        dispatch(deleteSpotThunk(spot.id))
        history.push('/')
    };

    const updateHandler = (e) => {
       history.push(`/spots/update`)
    };

    const reviewHandler = (e) => {
        history.push(`/reviewForm`)
    }

    return (
        <>
        {isLoaded &&
       <div id='details-page-container'>
        <div className='head'>
            <h1>{spot.name}</h1>
            <div className='head-details'>
                <div>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    {spot.avgStarRating}
                </div>
                <div> {spot.numReviews} reviews</div>
                <div>{spot.city}, {spot.state}, {spot.country}</div>
                {
                (user && user.id === owner.id) ?
                <button onClick={deleteHandler}>Delete Spot</button> :
                <></>
                }
                {
                (user && user.id === owner.id) ?
                <button onClick={updateHandler}>Update Spot</button> :
                <></>
                }
            </div>
        </div>
        <div id='images-container'>
            <div id="spot-image-list">
                {
                      spot.SpotImages.map((img) => (
                        <div  key={img.id}>
                            <img className='image' src={img.url} alt={"img.jpg"} />
                        </div>
                      ))
                }
            </div>
        </div>
        <div className='spotInfo'>
            <div className='info'>
                <h2>Entire home hosted by {owner.firstName ? owner.firstName : "Anonymous"}</h2>
                <div id="description">
                    <p>{spot.description}</p>
                </div>
            </div>
            <div className='moreInfo'>
                    <div>${spot.price} night</div>
                    <div>
                        <div className="reviews2">
                        <i className="fa-sharp fa-solid fa-star"></i>
                        <div>{spot.avgStarRating}</div>
                        <div> {spot.numReviews} reviews</div>
                        </div>
                    </div>

            </div>
        </div>
            <div className='spotReviews'>
            <SpotReviewsComponent reviews={reviews} />
            </div>
            <button className='add-review' onClick={reviewHandler}>Write a review</button>
       </div>
    }
    </>
    )
}

export default SpotDetails;
