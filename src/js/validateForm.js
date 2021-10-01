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
            console.log(inputId)
            if (this.regexNeph.test(this.neph)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'firstName':
            console.log(inputId)
            if (this.regexNom.test(this.firstName)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'lastName':
            console.log(inputId)
            if (this.regexNom.test(this.lastName)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'email':
            console.log(inputId)
            if (this.regexEmail.test(this.email)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'password':
            console.log(inputId)
            if (this.regexPassword.test(this.password)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'passwordCheck':
            console.log(inputId)
            if (this.password == this.passwordCheck){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'mobile':
            console.log(inputId)
            if (this.regexTel.test(this.mobile)){
                this.changeClassForm(input, true)
            } else {
                this.changeClassForm(input, false)
            }
            break;
        case 'departement':
            console.log(inputId)
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
function displayPassword(){
    const eye = document.querySelectorAll('.fa-eye')
    const eyeOff = document.querySelectorAll('.fa-eye-slash')
    const passwordField = document.querySelectorAll('input[type=password]')
    
    for(let i = 0; i < eye.length; i++){
        eye[i].addEventListener("click", () => {
            eye[i].style.display = "none"
            eyeOff[i].style.display = "block"
            passwordField[i].type = 'text' 
            console.log(passwordField[i].type)
        })
    }
    for(let i = 0; i < eyeOff.length; i++){
        eyeOff[i].addEventListener("click", () => {
            eyeOff[i].style.display = "none";
            eye[i].style.display = "block";
            passwordField[i].type = 'password' 
            console.log(passwordField[i].type)
        })
    }      
}
module.exports = {
    changeClassForm,
    validateForm,
    displayPassword
}