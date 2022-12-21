import React, {useContext, useEffect, useState} from 'react';
import './Feed.css';
import Share from "../share/Share";
import Post from "../post/Post";
import axios from 'axios';
import {AuthContext} from "../../context/AuthContext";

const Feed = ({username}) => {
    const [post, setPost] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect( ()=>{
        const fetchPost = async () => {
            const res = username
                ? await axios.get("/posts/profile/" + username)
                : await axios.get("/posts/timeline/" + user._id);
            setPost(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        };
        fetchPost();
    },[username, user._id]);

    return (
        <div className='feed'>
            <div className='feedWrapper'>
                {(!username || username === user.username) && <Share/>}
                {post.map(p=>(
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    );
};

export default Feed;