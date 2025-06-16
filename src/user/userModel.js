var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
     gender: {
        type: String,
        required: true
    },
     emailId: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
         match: [/^\d{10}$/, 'Phone number must be 10 digits']
    }
});

module.exports = mongoose.model('peoplelists', userSchema);