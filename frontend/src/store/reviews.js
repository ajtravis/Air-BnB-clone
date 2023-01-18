import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview'
const DELETE_REVIEW = 'review/delete'


export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews,
    }
};

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review,
    }
}

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId,

    }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews))
    return reviews;
    }
}

export const postReview = ({spotId, review, stars, user, reviewImages}) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review, stars
        })
    })
    if (response.ok) {
        const result= await response.json();
        const newReview = {...result, spotId: +spotId, User: user, reviewImages}
        dispatch(addReview(newReview))
        }
        return response;
}

export const deleteReviewThunk = ({reviewId}) => async (dispatch) => {

        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        })
        if(response.ok) dispatch(deleteReview(reviewId));
        return response.json()
}

const reviewReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {...state}
            const reviewsArr = action.payload.Reviews;
            const allReviews = {};

            reviewsArr.forEach(ele => {
                allReviews[ele.id] = ele;
            });
            return {
                ...allReviews
            }
        };
        case ADD_REVIEW: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        };
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.reviewId];
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default reviewReducer;
