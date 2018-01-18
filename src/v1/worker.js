
const ordersService = require('./repositories/orders')();

module.exports = (amqpData) => {
    function processMessagePart1(msg){
        setTimeout(function() {
            processMessagePart2(msg);
        }, 15000)
    }

    function processMessagePart2(msg){
        ordersService.updateOne(msg.content, {status: "realized"})
            .then( reply => {
             amqpData.channel.ack(msg)
            })
            .catch(err => {
                console.log(err)
                amqpData.channel.nack(msg)
            });
        return
    }
    amqpData.channel.consume(amqpData.queue, processMessagePart1, {noAck: false});
    return
};