module.exports = (amqpData) => {
    const worker = require('./v1/worker')(amqpData)
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
    return;
};
