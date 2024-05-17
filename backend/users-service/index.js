const express = require('express');
const connectDB = require('./config');
const usersRouter = require('./routes/users');
const { connectToRabbitMQ } = require('./rabbitmq'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

connectDB();

app.use('/users', usersRouter);

(async () => {
  try {
      const channel = await connectToRabbitMQ();
      console.log('RabbitMQ connection established from Posts service');

      // Define message publishing and consuming logic here
  } catch (error) {
      console.error('Error connecting to RabbitMQ from Posts service:', error.message);
      process.exit(1); // Terminate the service if RabbitMQ connection fails
  }
})();

app.listen(PORT, () => {
  console.log(`Users Service running on port ${PORT}`);
});
