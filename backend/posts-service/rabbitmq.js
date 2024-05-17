const amqp = require('amqplib');

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://admin:admin@rabbitmq');
        const channel = await connection.createChannel();
        const exchangeName = 'comments_exchange';
        const exchangeType = 'direct';

        await channel.assertExchange(exchangeName, exchangeType);
        console.log('Connected to RabbitMQ from Posts service');

        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error.message);
        throw error;
    }
}

module.exports = { connectToRabbitMQ };
