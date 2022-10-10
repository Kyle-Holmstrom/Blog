import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Blog.css';

const Blog = () => {
    const [blogPost, setBlogPost] = useState([]);

    useEffect(() => {
        Axios.get('https://localhost:5000/post')
            .then(res => {
                setBlogPost(res.data.getPost);
            })
    }, [])
    
    return(
        <div className="blog-container">
            <h1>Welcome to my Blog where I talk about anything and everything!</h1>
            {
                blogPost.map((key, val) => {
                    return <div key={key} className="blog-post">
                        <h1>
                            {val.title}
                        </h1>
                        <h3>
                            {val.author}
                        </h3>
                        <h5>
                            {val.createdOn}
                        </h5>
                        <p>
                            {val.post}
                        </p>
                    </div>
                })
            }
        </div>
    )
}

export default Blog;