#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var log = '127.0.0.1 - - "GET / HTTP/1.1" "-" "This is an example message"';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(log));

        console.log(" [x] Sent %s", log);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
