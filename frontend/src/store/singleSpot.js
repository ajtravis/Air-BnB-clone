import { csrfFetch } from './csrf';

const SELECT_SPOT = 'spot/selectSpot'
const RESET = 'spot/reset'

export const selectSpot = (spot) => {
    return {
        type: SELECT_SPOT,
        spot,
    }
}

export const resetSpot = () => {
    return {
        type: RESET,

    }
}

export const findSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    console.log("response", response)
    if (response.ok) {
        const spot = await response.json();
        dispatch(selectSpot(spot))
        return spot;
    }
}

export default function singleSpotReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_SPOT: {
            const newState = { ...state  };
            console.log("spot", action.spot)
            newState[action.spot.id] = { ...state[action.spot.id], ...action.spot }
            return newState[action.spot.id];
        }
        case RESET:
            return {};


        default: return state
    }
}
