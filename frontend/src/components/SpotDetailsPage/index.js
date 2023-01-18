import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteSpotThunk, editSpot, getAllSpots } from '../../store/spots'
import { useHistory, Redirect } from 'react-router-dom';
import SpotReviewsComponent from '../SpotReviewsComponent';
import { getSpotReviews } from '../../store/reviews';
import { findSpot, resetSpot } from '../../store/singleSpot';
import { useParams } from "react-router-dom";
import { useSpot } from '../../context/spot';
import './spotDetails.css'




const SpotDetails = ({currentSpot}) => {


    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const loadedSpot = useSelector((state) => state.spot)
    const [user, setUser] = useState(useSelector((state) => state.session.user))
    const spotReviews = useSelector((state) => state.reviews)
    const [reviews, setReviews] = useState(Object.values(spotReviews))
    const [owner, setOwner] = useState(useSelector(state => state.spot.Owner));
    const { avg, setAvg, spot, setSpot} = useSpot();
    const singleSpot = useSelector(state => state.spot)
    const images = useSelector(state => state.spot.SpotImages)

    useEffect(() => {
        const initialLoad =  () =>
        {
        const newSpot = dispatch(findSpot(spotId))
        setSpot(newSpot);
        const initReviews = dispatch(getSpotReviews(spotId))
        setReviews(Object.values(initReviews))
        setOwner(spot.Owner)
        }
        setIsLoaded(false)
        initialLoad(spotId, getSpotReviews)
        setIsLoaded(true)
    }, [dispatch])

    useEffect(() => {
        setIsLoaded(false)
        // const reviewLoader = async () => {
        //     setReviews(Object.values(spotReviews))
        // }
        // reviewLoader()
        //     .then(() => setIsLoaded(true))
        // dispatch(findSpot(spotId))
        //     .then(() => setReviews(Object.values(spotReviews)))
        //     .then(() => setAvg(spot.avgStarRating))
        //     .then(() => setIsLoaded(true))
        dispatch(findSpot(spotId))
            .then(() => console.log("useEffect1", "loadedSpot", loadedSpot))
            .then(() => setReviews(Object.values(spotReviews)))
            .then(() => setSpot(singleSpot))
            .then(() => setAvg(spot.avgStarRating))
            .then(() => setIsLoaded(true))
        console.log("avg1", avg)
    }, [spotReviews, avg])

    useEffect(() => {
        console.log("details useEffect is running");
        console.log("spotId", spotId)
        setIsLoaded(false)
        dispatch(findSpot(spotId))
            .then(() => console.log("useEffect2"))
            .then(() => setSpot(singleSpot))
            .then(() => setOwner(spot.Owner))
            .then(() => setAvg(spot.avgStarRating))
            .then(() => setIsLoaded(true))


      }, [spotId, spotReviews]);



    const deleteHandler = (e) => {
        dispatch(deleteSpotThunk(spotId))
        history.push('/')
    };

    const updateHandler = (e) => {
       history.push(`/spots/${spotId}/update`)
    };

    const reviewHandler = (e) => {
        history.push(`/reviewForm`)
    }

    return (
        <>
        {isLoaded &&
       <div id='details-page-container'>
        <div className='head'>
            <h1>{currentSpot.name}</h1>
            <div className='head-details'>
                <div>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    {currentSpot.avgStarRating? Math.round(currentSpot.avgStarRating * 100)/100 : 0}
                </div>
                <div> {reviews.length} reviews</div>
                <div>{currentSpot.city}</div> <div>{currentSpot.state}</div> <div>{currentSpot.country}</div>
                {
                (user && user.id === spot.ownerId) ?
                <button onClick={deleteHandler}>Delete Spot</button> :
                <></>
                }
                {
                (user && user.id === spot.ownerId) ?
                <button onClick={updateHandler}>Update Spot</button> :
                <></>
                }
            </div>
        </div>
        <div id='images-container'>
            <div id="spot-image-list">
                {     spot.SpotImages ?
                      spot.SpotImages.map((img) => (
                        <div className='image' key={img.id}>
                            <img className='image' src={img.url} alt={"img.jpg"} />
                        </div>
                      )) :

                        currentSpot.SpotImages.map((img) => (
                            <div className='image' key={img.id}>
                                <img className='image' src={img.url} alt={"img.jpg"} />
                            </div>
                          ))

                }
            </div>
        </div>
        <div className='spotInfo'>
            <div className='info'>
                <h2>Entire home hosted by {spot.Owner ? spot.Owner.firstName : "Anonymous"}</h2>
                <div id="description">
                    <p>{spot.description}</p>
                </div>
            </div>
            <div className='moreInfo'>
                    <div>${currentSpot.price} night</div>
                    <div>
                        <div className="reviews2">
                        <i className="fa-sharp fa-solid fa-star"></i>
                        <div>{currentSpot.avgStarRating? Math.round(currentSpot.avgStarRating * 100)/100 : 0}</div>
                        <div> {reviews.length} reviews</div>
                        </div>
                    </div>
            </div>
        </div>
            <div className='spotReviews'>
            <SpotReviewsComponent reviews={reviews}/>
            </div>
            { user &&
            <button className='add-review' onClick={reviewHandler}>Write a review</button>
            }
       </div>
    }
    </>
    )
}

export default SpotDetails;
