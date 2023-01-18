import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./airbnb-2.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navBar">
      <NavLink className={"logo-name"} exact to={"/"}>
      <img className='logo' src={logo} alt="logo.png"/>
      <h2 className={"site-name"}>al-BnB</h2>
      </NavLink>

      <ul className='menu'>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && (
          <li className='button-item'>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
