import React from 'react';

const NoMatch = () => {
    return(
        <div style={{textAlign: "center", alignContent: 'center', paddingTop: '4rem', 
            fontFamily: 'cursive', height: '100vh', width: 'auto'
        }}>
            <h2 style={{color: 'red', fontSize: '200px', animation: 'ease-in', animationDuration: '2s'}}>404</h2>
            <h4>Page not found.</h4>
        </div>
    );
}

export default NoMatch;