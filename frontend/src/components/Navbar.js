import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import LoginIcon from '@mui/icons-material/Login';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Badge from '@mui/material/Badge';
import './Navbar.css';

const Navbar = () => {
    const [count, setCount] = useState(0);

    // suppose to get count for navbar.. doesnt work needs fixing.
    // *** It now works, require further testing by adding and deleting users
    // *** from database to ensure it properly displays the number. 
    useEffect(() => {
        async function getCount() {
            const response = await fetch(`http://localhost:4000/user-count`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const count = await response.json();
            setCount(count);
        }
        getCount();
        return;
    }, [count.length]);

    return(
        <Breadcrumbs className="primary-nav">
            <NavLink to="blog" className="nav-link">
                <HomeIcon sx={{ mr: 0.5}} fontSize="inherit" />
                Home
            </NavLink>
            <NavLink to="shop" className="nav-link">
                <StoreIcon sx={{ mr: 0.5}} fontSize="inherit" />
                Shop
            </NavLink>
            <NavLink to="users" className="nav-link">
                <Badge badgeContent={count} sx={{ mr: 0.8}} >
                    <PeopleAltIcon fontSize="inherit" />
                    </Badge>
                View Registered Users
            </NavLink>
            <NavLink to="login" className="nav-link">
                <LoginIcon sx={{ mr: 0.5}} fontSize="inherit" />
                Login
            </NavLink>
        </Breadcrumbs>
    );
}

export default Navbar;