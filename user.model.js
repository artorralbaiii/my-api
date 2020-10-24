"use strict";

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);