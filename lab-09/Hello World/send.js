#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// connect to server
amqp.connect('amqp://localhost', function(error0, connection) {
   // creating channel
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        const args = process.argv;
        // create a queue to send to so that we can publish messages
        var queue = 'hello'; // Note: will be created only if it doesn't already exist
        var msg = args[args.length - 1] || 'Hello World!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });

    // close connection
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});