import { csrfFetch } from './csrf';

// action constants
const LOAD_SPOTS = 'spots/loadSpots';
const ADD_SPOT = 'spots/addSpot'
const DELETE_SPOT = 'spots/delete'


// action creators
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots,
    }
};

const add = (spot) => {
    return {
        type: ADD_SPOT,
        payload: spot,
    }
}

const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        payload: spotId,
    }
}

// thunks
export const getAllSpots = () => async (dispatch) => {
    console.log("getting spots")
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots))
    return spots;
    }
}

export const addSpot = ({address, city, state, country, lat, lng, name, description, price, url, preview}) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address, city, state, country, lat, lng, name, description, price
        })
    })

    if (response.ok) {
        const spot = await response.json();
        const imgResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url, preview
            })
        })
        if (imgResponse.ok) dispatch(add(spot));
    }
}

export const deleteSpotThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    if(response.ok) dispatch(deleteSpot(id));
    return response.json()
}

// make helper functions folder later
// const normalize = (array) => {
//     const result = {};
//     array.map((ele) => result[ele.id] = ele)
// }

const initialState = {}

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPOTS: {
            const spotsArr = action.payload.Spots;
            const allSpots = {};

            spotsArr.forEach(ele => {
                allSpots[ele.id] = ele;
            });

            return {
                ...state,
                ...allSpots
            }
        };

        case ADD_SPOT: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        };

        case DELETE: {
            const newState = {...state}
            delete newState[action.spotId]
            return newState
        };
        
      default:
        return state;
    }
  };

export default spotsReducer;
