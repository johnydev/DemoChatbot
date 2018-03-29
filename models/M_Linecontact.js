'use strict';

const mongoose = require('mongoose');
let M_LineContactSchema = new mongoose.Schema({
    lineId: String, // Id of the main mapping item
    displayName: String, // [C:] = customer, [R:] = reservation
    imageProfile: String,
    createdDate: String,
    modifiedDate: String
});

// mongoose.model('M_LineContact', M_LineContactSchema);
// module.exports = mongoose.model('M_LineContact');

module.exports = mongoose.model('M_LineContact', M_LineContactSchema);

