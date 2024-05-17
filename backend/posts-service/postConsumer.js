const amqp = require('amqplib');
const Post = require('./models/Post');
const { connectToRabbitMQ } = require('./rabbitmq');

async function postConsumer() {
  try {
    const channel = await connectToRabbitMQ();
    const queueName = 'post_comments_queue';
    const exchangeName = 'comments_exchange';
    const routingKey = '';

    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, routingKey);
    console.log('Post Consumer connected to RabbitMQ and waiting for messages...');

    channel.consume(queueName, async (msg) => {
      try {
        if (!msg || !msg.content) {
          console.log('No message received');
          return;
        }

        const message = JSON.parse(msg.content.toString());
        const { postId, content } = message;

        console.log(`Received message: ${msg.content.toString()}`);
        await updatePostWithComment(postId, content);

        console.log(`Post updated with new comment: Post ID ${postId}`);
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error.message);
        channel.reject(msg, false);
      }
    });
  } catch (err) {
    console.error('Error connecting to RabbitMQ:', err.message);
  }
}

async function updatePostWithComment(postId, commentContent) {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      console.error(`Post with ID ${postId} not found.`);
      return;
    }
    if (!post.comments) {
      post.comments = []; 
    }
    post?.comments?.push({ content: commentContent });    await post.save();
  } catch (error) {
    console.error('Error updating post with comment:', error.message);
    throw error;
  }
}

module.exports = { postConsumer };
