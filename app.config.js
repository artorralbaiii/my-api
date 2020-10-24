'use strict';
/*jshint -W101 */
module.exports = function () {
    var config = {
        env: {
            PORT: 6003,
            MONGO_DB: 'mongodb+srv://admin:passw0rd@cluster0-vzlo8.mongodb.net/tasker'
        }
    };

    return config;
};
/*jshint +W101 */