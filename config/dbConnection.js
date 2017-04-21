var mongo = require('mongodb');

module.exports = () => 
    () => new mongo.Db(
        'got',
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );