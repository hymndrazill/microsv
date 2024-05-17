import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostDetail from '../components/PostDetail';

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4001/posts');
        console.log(response.data)
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>List of Posts</h1>
      {posts?.map((post,_id) => (
        <PostDetail key={_id} post={post} />
      ))}
    </div>
  );
};

export default PostPage;
