import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSpot } from '../../store/spots'


const AddSpotForm = () => {
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(addSpot({address, city, state, country, lat, lng, name, description, price}))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }
    return (
        <>
        <h1>List A New Spot</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
            <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
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
    )
}

export default AddSpotForm;
