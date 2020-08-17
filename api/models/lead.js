const mongo = require('mongoose');
// add any additional user properties to the user schema
const leadSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: false},
    phone: {type: String, required: true},
    ips: {type: Array, require: false}
});
module.exports = mongo.model('Lead', leadSchema);