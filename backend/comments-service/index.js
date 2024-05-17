const express = require('express');
const connectDB = require('./config');
const commentsRouter = require('./routes/comments');
const cors = require('cors');
const { connectToRabbitMQ } = require('./rabbitmq');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: '*' }));

connectDB();
// connectToRabbitMQ()
app.use('/comments', commentsRouter);

// (async () => {
//   try {
//       const channel = await connectToRabbitMQ();
//       console.log('RabbitMQ connection established from Comments service');

//   } catch (error) {
//       console.error('Error connecting to RabbitMQ from Comments service:', error.message);
//       process.exit(1); 
//   }
// })();


app.listen(PORT, () => {
  console.log(`Comments Service running on port ${PORT}`);
});
