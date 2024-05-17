import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostDetail = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  useEffect(() => {
     const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/comments/${post._id}/comments`);
        setComments(response.data);
      } catch (e) {
        console.log( e);
        setComments([]);
      }
    };

    fetchComments();
  }, [post._id]);

  const addComment = async () => {
    if (!newCommentContent.trim()) return;
    try {
      await axios.post(`http://localhost:4001/comments/${post._id}/comments`, { content: newCommentContent });
      setComments(prevComments => [...prevComments, { content: newCommentContent }]);
      setNewCommentContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <div className="card">

      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
      </div>
      <ul>
        {comments?.map((comment, _id) => (
          <li key={_id}>{comment?.content}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default PostDetail;
