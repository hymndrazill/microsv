const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { connectToRabbitMQ } = require('../rabbitmq');


router.get('/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post('/:postId/comments', async (req, res) => {
  try {
    const { content } = req.body;
    const newComment = new Comment({ postId: req.params.postId, content });
    await newComment.save();
    // notifying that we published our msg
    console.log('Publishing message to RabbitMQ:', { postId: req.params.postId, content });
    await publishMessageToRabbitMQ(req.params.postId, content);

    res.status(201).json(newComment);
    console.log(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

async function publishMessageToRabbitMQ(postId, content) {
  try {
    console.log('Publishing message to RabbitMQ:', { postId, content });
    const channel = await connectToRabbitMQ();
    const message = { postId, content };
    const exchangeName = 'comments_exchange';
    const routingKey = '';

    channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
    console.log('Message was published to RabbitMQ:', message);
  } catch (error) {
    console.error('Error publishing message to RabbitMQ:', error);
    throw error;
  }
}

module.exports = router;  
