const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    isValidatedByAurige: { type: Boolean, required: false, default: null },
    isValidatedEmail: { type: Boolean, required: false, default: false },
    nbEchecsPratiques: { type: Number, required: false },
    userIdCandilib: { type: String, required: false, default: null },
    codeNeph: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailValidationHash: { type: String, required: false, default: null },
    nomNaissance: { type: String, required: true },
    portable: { type: String, required: true },
    prenom: { type: String, required: true },
    password: { type: String, required: true },
    presignedUpAt: { type: Date, required: false, default: null },
    departement: { type: String, required: true },
    preInscription: { type: Boolean, required: true, default: false },
    noReussites: { type: Array, required: false },
    createdAt: { type: Date, required: false, default: null },
    updatedAt: { type: Date, required: false, default: null },
    address: { type: String, required: false },
    addressComplement: { type: String, required: false },
    postal: { type: Number, required: false },
    isAdmin : { type: Boolean, required: true, default: false }
  });
  
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);