const amqp = require('amqplib');

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://admin:admin@rabbitmq');
        const channel = await connection.createChannel();

        // Define queues, exchanges, and bindings here

        console.log('Connected to RabbitMQ from Api  service');
        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error.message);
        throw error;
    }
}

module.exports = { connectToRabbitMQ };
