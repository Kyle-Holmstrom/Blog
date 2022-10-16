import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return(
        <nav className="primary-nav">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            <NavLink to="shop" className="nav-link">
                Shop
            </NavLink>
            <NavLink to="auth" className="nav-link">
                Login/Sign Up
            </NavLink>
            <NavLink to="show-users" className="nav-link">
                View Registered Users
            </NavLink>
        </nav>
    );
}

export default Navbar;