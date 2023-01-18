import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./logo.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navBar">
      <NavLink exact to={"/"}>
      <div className='logo-name'>
        <img className='logo' src={logo} alt="logo.png"/>
        <h2 className='site-name' >al-bnb</h2>
      </div>
      </NavLink>
      <ul className='menu'>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
