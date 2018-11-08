'use strict()';

var httpClient = require('https');
var AWS = require('aws-sdk');
var sqs = new AWS.SQS();

module.exports.producer = function(event, context, callback) {

    console.log('Invoking producer function');

    httpClient.get('https://cat-fact.herokuapp.com/facts', (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        let facts = JSON.parse(data);
        for (var i = 0; i < facts.all.length; i++) {
            let params = {
                MessageBody: facts.all[i].text,
                QueueUrl: process.env.CAT_FACTS_QUEUE_URL
            };

            sqs.sendMessage(params, function(err, data) {
                if (err) {
                    console.log('Error encountered sending a message: %s', err);
                } else {
                    console.log('A message about a cat fact is sent to ' + params.QueueUrl);
                }
            });
        }
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
};
