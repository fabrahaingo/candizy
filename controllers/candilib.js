const User = require("../models/User")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
let urlCandilib = 'https://beta.interieur.gouv.fr/candilib/api/v2'

exports.getDepartements = async (req, res, next) => {
    let status
    fetch(urlCandilib + '/public/departements')
    .then((response) => { 
        status = response.status
        return response.json() 
    })
    .then((jsonData) => {
        console.log(jsonData)
        let message = 'success'
        return res.status(200).json({message, departements : jsonData})
    })
    .catch((err) => {
        console.error(err)
    })
}

exports.preInscriptionCandidat = async (req, res, next) => {
    console.log('req.body :',req.body)
    let userId = req.body.id
    let candidat = {
        codeNeph: req.body.codeNeph,
        departement: req.body.departement,
        email: req.body.email,
        nomNaissance: req.body.nomNaissance,
        portable: req.body.portable,
        prenom: req.body.prenom
    }
    let status
    fetch(urlCandilib + '/candidat/preinscription', {
        method: 'post',
        body: JSON.stringify(candidat),
	    headers: {'Content-Type': 'application/json'}
    })
    .then((response) => { 
        status = response.status
        return response.json() 
    })
    .then((jsonData) => {
        console.log(jsonData)
        if(!jsonData.success){
            return res.status(401).json({ data: jsonData})
        }
            return User.findByIdAndUpdate(userId, {
                userIdCandilib: jsonData.candidat._id,
                emailValidationHash: jsonData.candidat.emailValidationHash,
                presignedUpAt: jsonData.candidat.presignedUpAt,
                createdAt: jsonData.candidat.createdAt,
                updatedAt: jsonData.candidat.updatedAt
            })
            .then(response => {
                console.log(response)
            })
        let message = 'success'
        return res.status(200).json({message, data : jsonData})
    })
    .catch((err) => {
    console.error(err)
    })
    
}



