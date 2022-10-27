import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Card from '@mui/material/Card';
import './Shop.css';

const ShopItem = (props) => {
    return(
        <div className="shop-container">
			<Card variant="outlined" className="shop-container" >
				<div className='shop-hero'>
					<h1>{props.shop.productName}</h1>
				</div>
				<article>{props.shop.description}</article>
				<footer>
					<ul>
						<li>Price: {props.shop.price}</li>
						<li>In Stock: {props.shop.inStock}</li>
						<li>Mens Product: {props.shop.mensProduct}</li>
						<li>Womens Product: {props.shop.womensProduct}</li>
					</ul> 
				</footer>
				<aside>
					<Badge badgeContent={1} >
						<AddShoppingCartIcon color="primary" className="FavoriteIcon" />
					</Badge>
				</aside>
			</Card>
	    
	    {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
	    <img src={'https://www.feedinspiration.com/wp-content/uploads/2015/06/Clothing-For-Teenage-Girls-.jpg'} 
		style={{width: '120px', height: '140'}}
		    />
	
	    <img src={'https://www.theskinnybeep.com/wp-content/uploads/2016/10/Fashion-Model-Valentino-Catwalk.jpg'} 
		style={{width: '120px', height: '140'}}
	    />
	
	
	    <img src={'https://allforfashiondesign.com/wp-content/uploads/2013/05/fa-9.jpg'} 
		style={{width: '120px', height: '140'}} />
	</div> */}

	

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
    
    // this method will delete a record
    async function deleteShopItem(id) {
        await fetch(`http://localhost:4000/${id}`, {
            method: "DELETE"
        });

        const newList = shopItem.filter((el) => el._id !== id);
        setShopItem(newList);
    }

    //This method will map out products in cards
    function shopList() {
        return shopItem.map((shop) => {
            return (
                <ShopItem    
                    shop={shop}
                    deleteShopItem={() => deleteShopItem(shop._id)}
                    key={shop._id}
                    />
            );
        });
    }

    return (
        <div>
			<div className="shop-greeting">
			<h1>Welcome to the Shop!</h1>
            <h4>Make a purchase to support your favorite author!</h4>	
			</div>
			{shopList()}
		</div>
    );
}
