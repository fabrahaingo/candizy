const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    nomNaissance: { type: String, required: true },
    prenom: { type: String, required: true },
    password: { type: String, required: true },
    codeNeph: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    portable: { type: String, required: true },
    departement: { type: String, required: true },
    isAdmin : { type: Boolean, required: true }
  });
  
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);