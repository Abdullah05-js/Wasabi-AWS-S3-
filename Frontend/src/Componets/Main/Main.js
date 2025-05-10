import React from 'react';
import { useState } from 'react';
import Post from './Post';
import CreatePost from './CreatePost';
import { useEffect } from 'react';
import axios from 'axios';

const Main = () => {

    const [PostList, setPostList] = useState([])

    const getPosts = async () => {
        const response = await axios.get("http://localhost:5000/api/posts")
        setPostList(response.data)
    }

    useEffect(() => {
        getPosts()
    }, [])

    const ReturnPostList = PostList.map((post, index) => {
        return <Post img={post.url} content={post.content} index={index} author={post.author} />
    })

    return (
        <div className='w-full h-full flex justify-center items-start'>

            <div className='w-1/3 flex flex-col gap-2'>
                <CreatePost setNewPost={setPostList} />
                {ReturnPostList}
            </div>

        </div>
    );
}

export default Main;
