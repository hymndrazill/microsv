const express = require('express');
const postsRouter = require('./routes/posts');
const connectDB = require('./config');
const { connectToRabbitMQ } = require('./rabbitmq'); 
const cors = require('cors');
const { postConsumer } = require('./postConsumer');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors({ origin: '*' }));

connectDB();

app.use('/posts', postsRouter);


(async () => {
  try {
      const channel = await connectToRabbitMQ();
      console.log('RabbitMQ connection established from Posts service');
      await postConsumer();

  } catch (error) {
      console.error('Error connecting to RabbitMQ from Posts service:', error.message);
      process.exit(1);
  }
})();
app.listen(PORT, () => {
  console.log(`Posts Service running on port ${PORT}`);
});
