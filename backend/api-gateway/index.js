const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4001;
const { connectToRabbitMQ } = require('./rabbitmq'); 
const cors = require('cors');
const authRoute = require('./routes/authRoute')
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/', authRoute);

// const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// app.use(authenticate);

app.use(async(req, res, next) => {
  const { url } = req;
  if (url.startsWith('/users')) {
    //  Users microservice
    console.log(`base url hit  ${url}`)
    return await axiosProxy(req, res, 'http://users-service:5000');
  } else if (url.startsWith('/posts')) {
    console.log(`base url hit  ${url}`)
    // Posts microservice
    return await axiosProxy(req, res, 'http://posts-service:7000');
  } else if (url.startsWith('/comments')) {
    // Comments microservice
    console.log(`base url hit  ${url}`)

    return await axiosProxy(req, res, 'http://comments-service:4000');
  }
  else if (url.startsWith('/')) {
    return axiosProxy(req, res, 'http://localhost:4001');
}

  res.status(404).json({ error: 'Route not found' });
});

async function axiosProxy(req, res, targetURL) {
  try {
    console.log("URL",targetURL + req.url)
    const response = await axios({
      method: req.method,
      url: targetURL + req.url,
      data: req.body,
      headers: {
        ...req.headers,
        'Cache-Control': 'no-cache',
      },    
    });
   

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    console.error('Error response:', error.response); 
    console.error('Error message:', error.message); 
    console.error('Error stack:', error.stack); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


(async () => {
  try {
      const channel = await connectToRabbitMQ();
      console.log('RabbitMQ connection established from API Gateway');
    return channel
  } catch (error) {
      console.error('Error connecting to RabbitMQ from API Gateway:', error.message);
      process.exit(1); 
  }
})();



app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
