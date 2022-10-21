import React from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import LoginIcon from '@mui/icons-material/Login';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Badge from '@mui/material/Badge';
import './Navbar.css';

const Navbar = () => {
    return(
        <Breadcrumbs className="primary-nav">
            <NavLink to="/" className="nav-link">
                <HomeIcon sx={{ mr: 0.5}} fontSize="inherit" />
                Home
            </NavLink>
            <NavLink to="shop" className="nav-link">
                <StoreIcon sx={{ mr: 0.5}} fontSize="inherit" />
                Shop
            </NavLink>
            <NavLink to="auth" className="nav-link">
                <LoginIcon sx={{ mr: 0.5}} fontSize="inherit" />
                Login
            </NavLink>
            <NavLink to="show-users" className="nav-link">
                <Badge badgeContent={4} sx={{ mr: 0.8}} >
                    <PeopleAltIcon fontSize="inherit" />
                    </Badge>
                View Registered Users
            </NavLink>
        </Breadcrumbs>
    );
}

export default Navbar;