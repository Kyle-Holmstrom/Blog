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
        </nav>
    );
}

export default Navbar;