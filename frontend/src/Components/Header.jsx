import React, { useContext } from 'react';
import headerImg from '../assets/favi-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import { UsedContext } from './App';
import './Header.css'; 

function Header() {
  const { state } = useContext(UsedContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <NavLink to="/logout">
          <button className="Headerbtn btn">Logout</button>
        </NavLink>
      );
    } else {
      return (
        <>
          <NavLink to="/login">
            <button className="Headerbtn btn login">Login</button>
          </NavLink>
          <NavLink to="/register">
            <button className="Headerbtn btn register">Register</button>
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className="logo" src={headerImg} alt="MainLogo" />
        {/* Updated: Wrapped 'Circle' in a span to color it differently */}
        <NavLink className="brand" to="/">Compile<span>X</span></NavLink>
      </div>
      <div className="navbar-buttons">
        <RenderMenu />
      </div>
    </nav>
  );
}

export default Header;