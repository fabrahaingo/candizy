function changeClassForm(input, action){
    if(action){
        input.classList.remove('is-invalid')
        input.classList.add('is-valid')
    } else {
        input.classList.remove('is-valid')
        input.classList.add('is-invalid')
    }
}
function validateForm(inputId){
    let input = document.getElementById(inputId)
    switch(inputId){
        case 'neph':
            if (this.regexNeph.test(this.neph)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'firstName':
            if (this.regexNom.test(this.firstName)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'lastName':
            if (this.regexNom.test(this.lastName)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'email':
            if (this.regexEmail.test(this.email)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'password':
            if (this.regexPassword.test(this.password)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'passwordCheck':
            if (this.password == this.passwordCheck){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'mobile':
            if (this.regexTel.test(this.mobile)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'departement':
            if (this.departement){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        default:
            console.log('erreur switch form')
    }
}
function displayPassword(id){
    const eye = document.querySelectorAll('.eye')
    const eyeOff = document.querySelectorAll('.eye-off')
    let passwordField = ''
    if(id == 'eye1' || id == 'eyeOff1'){
        passwordField = document.getElementById('password')
    } else if(id == 'eye2' || id == 'eyeOff2') {
        passwordField = document.getElementById('passwordCheck')
    } else {
        return console.log('erreur id displayPassword')
    }

    switch(id){
        case 'eye1':
            eye[0].style.display = "none"
            eyeOff[0].style.display = "block"
            passwordField.type = 'text'
            break;
        case 'eyeOff1':
            eye[0].style.display = "block"
            eyeOff[0].style.display = "none"
            passwordField.type = 'password'
            break;
        case 'eye2':
            eye[1].style.display = "none"
            eyeOff[1].style.display = "block"
            passwordField.type = 'text'
            break;
        case 'eyeOff2':
            eye[1].style.display = "block"
            eyeOff[1].style.display = "none"
            passwordField.type = 'password'
            break;
        default:
            console.log('erreur switch displayPassword')
    }    
}
module.exports = {
    changeClassForm,
    validateForm,
    displayPassword
}