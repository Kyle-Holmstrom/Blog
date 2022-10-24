import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import './Blog.css';


const BlogPost = (props) => (
    <Card variant="outlined" className="blogpost-container" >
    {/* <div className="blogpost-container"> */}
        <h1>{props.post.title}</h1>
        <article>{props.post.description}</article>
        <footer>
            <ul>
                <li>Author: {props.post.creator}</li>
                <li>Created: {props.post.createdAt}</li>
            </ul> 
        </footer>
        <div className='comment-container'>
            <h4>Leave a comment below!</h4>
            <section>
                <p>{props.post.comments}</p>
            </section>
            <textarea rows="7" cols="75" />
        </div>
        <aside>
            <Badge badgeContent={props.post.upvote} >
                <FavoriteIcon className="FavoriteIcon" />
            </Badge>
        </aside>
    {/* </div> */}
    </Card>
    
    
    // <tr>
    //     <td>{props.post.title}</td>
    //     <td>{props.post.description}</td>
    //     <td>{props.post.comments}</td>
    //     <td>{props.post.upVote = 0}</td>
    //     <td>{props.post.creator}</td>
	//     <td>{props.post.createdAt}</td>
    //     <td>
    //         <Button variant="contained" >
    //             <Link to={`/blog-edit/${props.post._id}`}
    //                 style={{color: 'white', textDecoration: 'none'}}
    //                 >Edit</Link>
    //             </Button> 
    //         <Button variant="contained" style={{marginLeft: '5px'}}
    //             onClick={() => {
    //                 props.deleteBlogPost(props.post._id);
    //             }}
    //         >
    //             Delete
    //         </Button>
    //     </td>
    // </tr>
);

export default function Blog() {
    const [posts, setPost] = useState([]);

    // This method will fetch the blog post from the database.
    useEffect(() => {
        async function getBlogPost() {
            const response = await fetch(`http://localhost:4000/blog`);

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
        await fetch(`http://localhost:4000/${id}`, {
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
                    deleteBlogPost={() => deleteBlogPost(posts._id)}
                    key={posts._id}
                    />
            );
        });
    }

    return (
        // <div className="post-list-container">
        //     <h3>Post List</h3>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th>Title</th>
        //                 <th>Description</th>
        //                 <th>Comments</th>
        //                 <th>Upvotes</th>
        //                 <th>Creator</th>
	    // 		        <th>Created At</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {blogPostList()}
        //         </tbody>
        //     </table> 
	    
	    // <Button variant="contained" className="add-blogpost-btn">
        //         <Link to="/blog/add" className="add-blogpost-link">Create Blog Post</Link>
        //     </Button>
	   
        // </div>
        <div>{blogPostList()}</div>
    );
}
