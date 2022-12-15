import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editSpot, deleteSpot } from '../../store/spots';

const UpdateSpotForm = () => {
    const spot = useSelector((state) => state.spot)
    const dispatch = useDispatch();
    const history = useHistory()
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(editSpot({id, address, city, state, country, lat: 1, lng: 1, name, description, price}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        history.push('/')
        }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
            <lable>
                State
                <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </lable>
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
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder='Describe the spot'
                />
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default UpdateSpotForm;
