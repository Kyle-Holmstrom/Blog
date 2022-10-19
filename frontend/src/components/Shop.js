import React from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
    return(
        <div className="shop-container">
            <h1>Welcome to the Shop!</h1>
            <h4>Make a purchase to support your favorite author!</h4>


	    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
	    <img src={'https://www.feedinspiration.com/wp-content/uploads/2015/06/Clothing-For-Teenage-Girls-.jpg'} 
		style={{width: '120px', height: '140'}}
		    />
	
	    <img src={'https://www.theskinnybeep.com/wp-content/uploads/2016/10/Fashion-Model-Valentino-Catwalk.jpg'} 
		style={{width: '120px', height: '140'}}
	    />
	
	
	    <img src={'https://allforfashiondesign.com/wp-content/uploads/2013/05/fa-9.jpg'} 
		style={{width: '120px', height: '140'}} />
	</div>



        </div>
    );
}

export default Shop;
