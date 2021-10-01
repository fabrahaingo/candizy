<template>
        <div class="login container">
        <h1 class="login__title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="login__title" v-else>Inscription</h1>
        <p class="login__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="login__action btn btn-primary btn-sm" @click="switchToCreateAccount()">Créer un compte</span></p>
        <p class="login__subtitle" v-else-if="mode == 'create'">Tu a déjà un compte ? <span class="login__action btn btn-primary btn-sm" @click="switchToLogin()">Se connecter</span></p>

        <form action="#">
            <div class="form-group row my-2" v-if="mode == 'create'">
                <label for="neph" class="col-sm-3 col-form-label text-start">NEPH : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="neph" id="neph" placeholder="093496239512" v-model="neph"
                    @change="validateForm('neph')"/>
                </div>
            </div>
            <div class="form-group row my-2" v-if="mode == 'create'">
                <label for="lastName" class="col-sm-3 col-form-label text-start">Nom de Naissance : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="lastName" id="lastName" placeholder="Dupond" v-model="lastName"
                    @change="validateForm('lastName')">
                </div>
            </div>
            <div class="form-group row my-2" v-if="mode == 'create'">
                <label for="firstName" class="col-sm-3 col-form-label text-start">Prénom : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="firstName" id="firstName" placeholder="Jean" v-model="firstName"
                    @change="validateForm('firstName')">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="email" class="col-sm-3 col-form-label text-start">E-mail : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="mail" name="email" id="email" placeholder="jean.dupond@gmail.com" v-model="email"
                    @change="validateForm('email')">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="password" class="col-sm-3 col-form-label text-start">Mot de passe : </label>
                <div class="col-sm-9 password-container">
                    <input class="form-control" type="password" name="password" id="password" placeholder="Mot de passe" v-model="password"
                    @change="validateForm('password')">
                    <div class="password-icon">
                        <i class="far fa-eye" @click="displayPassword"></i>
                        <i class="far fa-eye-slash" @click="displayPassword"></i>
                    </div>
                    
                </div>
            </div>
            <div class="form-group row my-2" v-if="mode == 'create'">
                <label for="passwordCheck" class="col-sm-3 col-form-label text-start">Mot de passe:</label>
                <div class="col-sm-9 password-container">
                    <input class="form-control" type="password" name="passwordCheck" id="passwordCheck" placeholder="Confirmation du mot de passe" v-model="passwordCheck"
                    @change="validateForm('passwordCheck')">
                    <div class="password-icon">
                        <i class="far fa-eye" @click="displayPassword"></i>
                        <i class="far fa-eye-slash" @click="displayPassword"></i>
                    </div>
                </div>
            </div>
            <div class="form-group row my-2" v-if="mode == 'create'">
                <label for="mobile" class="col-sm-3 col-form-label text-start">Portable : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="tel" name="mobile" id="mobile" placeholder="0601234567" v-model="mobile"
                    @change="validateForm('mobile')">
                </div>
            </div>
            <div class="form-group row my-2" v-if="mode == 'create'">
                <label for="departement" class="col-sm-3 col-form-label text-start">Departement : </label>
                <div class="col-sm-9">
                    <select v-model="departement" name="departement" id="departement" class="form-control" @change="validateForm('departement')">
                        <option disabled value="">
                            Choisissez votre département
                        </option>
                        <option
                            v-for="item in gettersDepartements"
                            :key="item"
                            :value="item"
                            >
                                {{ item }}
                        </option>
                    </select>
                    {{ lastName }}
                    {{ firstName }}
                    {{ password }}
                    {{ passwordCheck }}
                    {{  }}
                    {{ departement }}
                </div>
            </div>
            <button :class="{ 'disabled' : !validateFields }" class="btn btn-primary mx-4" type="submit" @click.prevent="registerCandidat" v-if="mode == 'create'">Envoyer le formulaire</button>
            <button :class="{ 'disabled' : !validateFields }" class="btn btn-primary mx-4" type="submit" @click.prevent="loginCandidat" v-else>Connexion</button>
            <button class="btn btn-primary" type="reset">Effacer le formulaire</button>
        </form>

    </div>
</template>

<script>
import { validateForm, changeClassForm, displayPassword} from '../js/validateForm'
import { mapGetters } from 'vuex'

export default {
    name: 'Login',
    data(){
        return {
            mode: 'create',
            lastName: '',
            firstName: '',
            password: '',
            passwordCheck: '',
            neph: '',
            email: '',
            mobile: '',
            departement: '',
            regexNom: /^[a-zA-z]{2,20}$/,
            regexPassword: /[\w.-]{8,16}/,
            regexNeph: /^[a-zA-Z0-9]{9,15}$/,
            regexEmail: /[\w.-]+@[\w-]+\.\w{2,6}/,
            regexTel: /^[0-9]{10}$/,
            regexText: /[0-9a-zA-Z éèêàêôûùïî-]{5,50}$/,
            regexVille: /[0-9a-zA-Z éèêàêôûùïî-]{2,50}$/,
            regexCompl: /[0-9a-zA-Z éèêàêôûùïî-]{0,50}$/,
            regexPostal: /^[0-9]{5}$/,
            regexDepartement: /^[a-zA-Z0-9]{2}$/,
        }
    },
    created(){
        if(this.$store.state.data.departements.length == 0){
            this.$store.dispatch('getDepartement')
        }
    },
    computed: {
        validateFields() {
            if (this.mode == 'login'){
                if(this.regexEmail.test(this.email) && this.regexPassword.test(this.password)){
                    return true
                } else {
                    return false
                }
            } else {
                if((this.regexNeph.test(this.neph) && this.regexNom.test(this.firstName) && this.regexNom.test(this.lastName) && this.regexPassword.test(this.password) && this.regexEmail.test(this.email)  && this.regexTel.test(this.mobile) && this.regexDepartement.test(this.departement)) && this.password === this.passwordCheck){
                    return true
                } else {
                    return false
                }
            }
        },
        ...mapGetters(['gettersDepartements'])
    },
    methods: {
        changeClassForm,
        validateForm,
        displayPassword,
        switchToCreateAccount: function() {
            this.mode = 'create';
        },
        switchToLogin: function() {
            this.mode = 'login';
        },
        registerCandidat(){
            let candidat = {
                nomNaissance: this.lastName,
                prenom: this.firstName,
                password: this.password,
                codeNeph: this.neph,
                email: this.email,
                portable: this.mobile,
                departement: this.departement
            }
            this.$store.dispatch('registerNewCandidat', candidat)
        },
        loginCandidat(){
            let candidat = {
                password: this.password,
                email: this.email,
            }
            this.$store.dispatch('loginCandidat', candidat)
            console.log('loginCandidat :', candidat)
        }
    }



}
</script>

<style lang="scss" scoped>

.login{
    &__title{

    }
    &__subtitle{

    }
    &__action{
        cursor: pointer;
    }
}
.password-container{
    position: relative;
    .password-icon{
        display: flex;
        align-items: center;
        position: absolute;
        top: 50%;
        right: 45px;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        transition: all 0.2s;
        i{
            width: 100%;
            height: 100%;
            padding-top: 6px;
        }
        i:hover{
            cursor: pointer;
        }
    }
}

.fa-eye-slash{
    display: none;
}
</style>