import React, { useEffect, useState } from 'react';

import Badge from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Card from '@mui/material/Card';

import './Shop.css';

const ShopItem = (props) => {
    const [count, setCount] = useState(0);

    function addToCart() {
        setCount(count + 1);
    }
    
    return(
        <div className="shop-container">
			<Card variant="outlined" className="shop-container-card" >
				<div className='shop-hero'>
					<h1>{props.shop.productName}</h1>
				</div>
				<article>{props.shop.description}</article>
				<footer>
					<ul>
						<li>Price: ${props.shop.price}</li>
						<li>In Stock: {props.shop.inStock}</li>
						<li>Mens Product: {props.shop.mensProduct}</li>
						<li>Women's Product: {props.shop.womensProduct}</li>
					</ul> 
				</footer>
				<aside>
					<Badge badgeContent={count} className="heart-badge" >
						<AddShoppingCartIcon color="primary" className="FavoriteIcon" onClick={addToCart} />
					</Badge>
				</aside>
			</Card>
        </div>
    );
}

export default function Shop() {
    const [shopItem, setShopItem] = useState([]);

    // This method will fetch the product from the database.
    useEffect(() => {
        async function getShopItems() {
            const response = await fetch(`http://localhost:4000/shop`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const shopItem = await response.json();
            setShopItem(shopItem);
        }

        getShopItems();

        return;

    }, [shopItem.length]);

    //This method will map out products in cards
    function shopList() {
        return shopItem.map((shop) => {
            return (
                <ShopItem    
                    shop={shop}
                    key={shop._id}
                    />
            );
        });
    }

    return (
        <div>
			<div className="shop-greeting">
			<h1 id='shop-header'>Merchandise Shop of the century</h1>
            <h4>Make a purchase to support your favorite author!</h4>	
			</div>
			{shopList()}
		</div>
    );
}
