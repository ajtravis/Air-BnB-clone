import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editSpot, deleteSpot, getAllSpots } from '../../store/spots';
import { findSpot } from '../../store/singleSpot';
import { useParams } from 'react-router-dom';
import "../AddSpotForm/addspot.css"

const UpdateSpotForm = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const [spot, setSpot] = useState(useSelector((state) => state.spot))
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [description, setDescription] = useState(spot.description)
    const [url, setUrl] = useState(spot.url)
    const [errors, setErrors] = useState([]);

    const id = spot.id
    const param = useParams();
    const spotId = param.spotId

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(editSpot({id, address, city, state, country, lat, lng, name, description, price}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        console.log(spotId)
        history.push(`/spots/${spotId}`)
        }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/spots/${id}`)
    }

    return (
        <>
        <div className='form-container'>
            <form className='spot-form' onSubmit={handleSubmit}>
            <label>
                Address
                <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </label>
            <label>
                City
                <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </label>
            <label>
                State
                <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </label>
            <label>
                Country
                <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </label>
            <label>
                Spot Name
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </label>
            <label>
                Price per night
                <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={"1"}
                required
                />
            </label>
            <label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder='Describe the spot'
                />
            </label>
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
        </div>
        </>
    );
}

export default UpdateSpotForm;
