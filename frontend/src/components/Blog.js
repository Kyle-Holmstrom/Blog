import React from 'react';
import './Blog.css';

const Blog = () => {
    return(
        <div className="blog-container">
            <h2>Welcome to my Blog where I talk about anything and everything!</h2>
            <div className="grid-container">
                <div>
                    <h3>blog title</h3>
                    <h4>created on</h4>
                    <p>
                        blog content here.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Blog;