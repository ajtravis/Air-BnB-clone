import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postReview } from '../../store/reviews'

const AddReviewForm = () => {
    const user = useSelector((state) => state.session.user)
    const spot = useSelector((state) => state.spot.id)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [star1, setStar1] = useState('')
    const [star2, setStar2] = useState('')
    const [star3, setStar3] = useState('')
    const [star4, setStar4] = useState('')
    const [star5, setStar5] = useState('')
    const [errors, setErrors] = useState([]);
    const starClickerArr= [setStar1("clicked"), setStar2("clicked"), setStar3("clicked"), setStar4("clicked"), setStar5("clicked")]
    const starUnClickerArr= [setStar1(""), setStar2(""), setStar3(""), setStar4(""), setStar5("")]

    const starClick = (number) => {
        setStars(number)
        for(let i = number-1; i >= 0; i--){
            starClickerArr[i]();
        }
        for(let i = number-1; i <=5 ; i++){
            starUnClickerArr[i]();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(postReview({review, stars, spotId: spot.id}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        history.push('/');
    }

    return(
        <>
        <h1>Post A Review</h1>
        <form onSubmit={handleSubmit}>
        {
        errors.length ? (<ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>) :
        (<></>)
        }
        <i id="star1" className={`fa-solid fa-star + ${star1}`} onClick={starClick(1)}></i>
        <i id="star2" className={`fa-solid fa-star + ${star2}`} onClick={starClick(2)}></i>
        <i id="star3" className={`fa-solid fa-star + ${star3}`} onClick={starClick(3)}></i>
        <i id="star4" className={`fa-solid fa-star + ${star4}`} onClick={starClick(4)}></i>
        <i id="star5" className={`fa-solid fa-star + ${star5}`} onClick={starClick(5)}></i>
        <textarea
            value={review}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='write a review'
            required
        />
        <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default AddReviewForm;
