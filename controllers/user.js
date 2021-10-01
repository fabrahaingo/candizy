const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
var Cryptr = require('cryptr')

var cryptr = new Cryptr(process.env.SECRET);

//var decstring = cryptr.decrypt(encstring);
// console.log('2 : '+ decstring);

exports.signup = (req, res, next) => {
    console.log(req.body)
    let regexPassword = /[\w.-]{8,16}/
    if(regexPassword.test(req.body.password)){

        var emailEncrypted = cryptr.encrypt(req.body.email)

        console.log('Signup : ' + emailEncrypted)

        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                ...req.body,
                email: emailEncrypted,
                password: hash,
                preInscription: false,
                isAdmin : false
            })
            user.save()
                .then((response) => res.status(201).json({ message: 'Utilisateur créé !', data: response }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
  }
  else{
    res.status(400).json({ message: 'Un mot de passe doit contenir 8 caractères au minimum !'})
  }
};

exports.login = (req, res, next) => {
    console.log('req.body : ', req.body)

    User.find ()
    .then(user => {
    let emailDecrypt = ''
    let checkEmail = false
    let password = ''
    let userId = ''
    let candidat= {}

    for (let element of user){
        emailDecrypt = cryptr.decrypt(element.email)

        if (req.body.email == emailDecrypt) {
            checkEmail = true
            userId = element._id.toString()
            password = element.password
            candidat = {
                userId: userId,
                nomNaissance: element.nomNaissance,
                prenom: element.prenom,
                password: password,
                codeNeph: element.codeNeph,
                email: emailDecrypt,
                portable: element.portable,
                departement: element.departement,
                preInscription: element.preInscription,
                isAdmin: element.isAdmin,
                token: jwt.sign(
                    { userId: candidat.userId },
                    process.env.SECRET,
                    { expiresIn: '24h' }
                )
            }
            console.log('candidat :', candidat)
        }
    }
    if (!checkEmail) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
    }
    bcrypt.compare(req.body.password, password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' })
            }
            res.status(200).json({
                data: candidat,
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error })
        })
    })
    .catch(error => res.status(500).json({ error }))
}