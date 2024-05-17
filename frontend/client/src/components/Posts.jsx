import React, { useState } from 'react';

const Posts = ({ posts, addComment }) => {
  const [newCommentContent, setNewCommentContent] = useState('');

  const handleAddComment = async (postId, postIndex) => { 
    if (!newCommentContent.trim()) return;
    await addComment(postId, newCommentContent, postIndex); 
    setNewCommentContent('');
  };

  return (
    <ul>
      {posts?.map((post, index) => (
        <li key={index}>
          <strong>{post.title}</strong> - {post.content}
          <ul>
            {post?.comments?.map((comment, commentIndex) => (
              <li key={commentIndex}>
                <em>{comment.content}</em>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
            />
            <button onClick={() => handleAddComment(post._id, index)}>Add Comment</button> {/* Pass the postIndex */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
