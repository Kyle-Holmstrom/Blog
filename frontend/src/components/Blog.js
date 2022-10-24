import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Blog.css';

const BlogPost = (props) => (
    <tr>
        <td>{props.post.title}</td>
        <td>{props.post.description}</td>
        <td>{props.post.comments}</td>
        <td>{props.post.fileUpload}</td>
        <td>{props.post.upVote}</td>
        <td>{props.post.creator}</td>
	<td>{props.post.createdAt}</td>
        <td>
            <Button variant="contained" >
                <Link to={`/blog-edit/${props.post._id}`}
                    style={{color: 'white', textDecoration: 'none'}}
                    >Edit</Link>
                </Button> 
            <Button variant="contained" style={{marginLeft: '5px'}}
                onClick={() => {
                    props.deleteBlogPost(props.post._id);
                }}
            >
                Delete
            </Button>
        </td>
    </tr>
);

export default function Blog() {
    const [post, setPost] = useState([]);

    // This method will fetch the blog post from the database.
    useEffect(() => {
        async function getBlogPost() {
            const response = await fetch(`http://localhost:4000/blog`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const post = await response.json();
            setPost(post);
        }

        getBlogPost();

        return;

    }, [post.length]);
    
    // this method will delete a record
    async function deleteBlogPost(id) {
        await fetch(`http://localhost:4000/${id}`, {
            method: "DELETE"
        });

        const newPost = post.filter((el) => el._id !== id);
        setPost(newPost);
    }

    // This method will map out the users on the table
    function blogPostList() {
        return post.map((posts) => {
            return (
                <Blog
                    BlogPost={BlogPost}
                    deleteBlogPost={() => deleteBlogPost(post._id)}
                    key={post._id}
                    />
            );
        });
    }

    return (
        <div className="post-list-container">
            <h3>Post List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Comments</th>
                        <th>File Uploads</th>
                        <th>Upvotes</th>
                        <th>Creator</th>
	    		<th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {blogPostList()}
                </tbody>
            </table>
	    {/*
	    <Button variant="contained" className="add-blogpost-btn">
                <Link to="/blog/add" className="add-blogpost-link">Create Blog Post</Link>
            </Button>
	    */}
        </div>
    );
}
