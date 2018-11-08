'use strict()';

module.exports.consumer = function(event, context, callback) {

    console.log('Invoking consumer function');
    console.log("A fact about cat: " + event.Records[0].body);

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: event.Records[0].body
        }),
    };

    callback(null, response);

};
