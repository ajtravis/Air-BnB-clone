import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux';

const UpdateSpotForm = () => {
    const spot = useSelector((state) => state.spot)
    const dispatch = useDispatch();
    const history = useHistory();
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
    return (
        <>
            <form>
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
                Latitude
                <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                />
            </label>
            <label>
                Longitude
                <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
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
            <label>
                Image url
                <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                />
            </label>
            <label>
                Description
                <textarea
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 required/>
            </label>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default UpdateSpotForm;
