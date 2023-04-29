import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import './Blog.css';
import { Button } from '@mui/material';

const BlogPost = (props) => (
    <Card variant="outlined" className="blogpost-container" >
        <div className='blogpost-hero'>
            <h1>{props.post.title}</h1>
        </div>
        <article>{props.post.description}</article>
        <footer>
            <ul>
                <li>Author: {props.post.creator}</li>
                <li>Created: {props.post.createdAt}</li>
            </ul> 
        </footer>
        <div className='comment-container' >
            <section>
                <p>{props.post.comments}</p>
            </section>
            <textarea rows="5" cols="67" placeholder='Leave a comment!' />
            <br/>
            <Button variant='contained'>
                Send
            </Button>
        </div>
        <aside>
            <Badge badgeContent={props.post.upvote}>
                <FavoriteIcon className="FavoriteIcon" />
            </Badge>
        </aside>
    </Card>
);

export default function Blog() {
    const [posts, setPost] = useState([]);

    // This method will fetch the blog post from the database.
    useEffect(() => {
        async function getBlogPost() {
            const response = await fetch(`https://blog-udip.onrender.com/blog`);
            // const response = await fetch(`http://localhost:4000/blog`);
            // const response = await fetch("https://kyle-holmstrom.github.io/blog/");

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const posts = await response.json();
            setPost(posts);
        }

        getBlogPost();

        return;

    }, [posts.length]);
    
    // this method will delete a record
    async function deleteBlogPost(id) {
        await fetch(`https://blog-udip.onrender.com/blog/${id}`, {
            method: "DELETE"
        });
        const newPost = posts.filter((el) => el._id !== id);
        setPost(newPost);
    }

    // This method will map out the users on the table
    function blogPostList() {
        return posts.map((post) => {
            return (
                <BlogPost    
                    post={post}
                    deleteBlogPost={() => deleteBlogPost(post._id)}
                    key={post._id}
                    />
            );
        });
    }

    return (
        <div>{blogPostList()}</div>
    );
}