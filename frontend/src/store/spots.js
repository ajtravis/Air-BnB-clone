import { csrfFetch } from './csrf';
import { selectSpot } from './singleSpot'

// action constants
const LOAD_SPOTS = 'spots/loadSpots';
const ADD_SPOT = 'spots/addSpot'
const DELETE_SPOT = 'spots/delete'
const UPDATE_SPOT = "spot/updateSpot";


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

export const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        payload: id,
    }
}

export const updateSpot = (spot) => {
    return {
      type: UPDATE_SPOT,
      payload: spot,
    };
  };


// thunks
export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots))
    return spots;
    }
    return response.json()
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
        if (imgResponse.ok) {
           await dispatch(add(spot))
        };
        return imgResponse.json()
    }
    return response.json()
};

export const editSpot = ({id, address, city, state, country, lat, lng, name, description, price}) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            address, city, state, country, lat, lng, name, description, price
        })
    })
    if (response.ok) {
        const updated = await response.json();
        // dispatch(selectSpot(updated))
        dispatch(updateSpot(updated))
        return updated;
    };
    return response.json()
    }



export const deleteSpotThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    if(response.ok) {

        dispatch(deleteSpot(id))
    };
    return response.json
};

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

        case DELETE_SPOT: {
            const newState = {...state}
            const spotId = action.payload
            console.log("payload", action.payload)

            delete newState[spotId]

            return newState
        };

        case UPDATE_SPOT: {
            const newState = { ...state };
            const id = action.payload.id
            const updatedSpot = {...newState.spot, ...action.payload}
            newState[id] = updatedSpot;
            return newState;
        };

      default:
        return state;
    }
  };

export default spotsReducer;
