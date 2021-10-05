<template>
  <div class="sm:fixed sm:w-full sm:h-full flex justify-center bg-gray-300">
        <div class="bg-white h-full sm:h-3/4 my-12 rounded-3xl shadow text-gray-700 p-2 sm:p-8">
            <h1 class="font-extrabold text-3xl mb-6 text-center" v-if="mode == 'login'">
                Connexion
            </h1>
            <h1 class="font-extrabold text-3xl mb-6 text-center" v-else>
                Inscription
            </h1>
            <p class="flex flex-wrap justify-center items-center" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="btn-rounded btn-blue-white transition-500 mt-1 sm:mt-0" @click="switchToCreateAccount()">Créer un compte</span></p>
            <p class="flex flex-wrap justify-center items-center" v-else-if="mode == 'create'">Tu a déjà un compte ? <span class="btn-rounded btn-blue-white transition-500 mt-1 sm:mt-0" @click="switchToLogin()">Se connecter</span></p>

            <form class="mt-6" action="#">
                <div class="flex flex-col sm:flex-row items-start justify-center px-4 mb-1" v-if="mode == 'create'">
                    <label for="neph" class="label-form-right-gray sm:text-right">NEPH : </label>
                    <input class="input-form-border-bottom-blue w-full" type="text" name="neph" id="neph" placeholder="093496239512" v-model="neph"
                    @change="validateForm('neph')"/>
                </div>
                <div class="flex flex-col sm:flex-row items-start w-full px-4 mb-1" v-if="mode == 'create'">
                    <label for="lastName" class="label-form-right-gray sm:text-right">Nom de Naissance : </label>
                    <input class="input-form-border-bottom-blue w-full" type="text" name="lastName" id="lastName" placeholder="Dupond" v-model="lastName"
                    @change="validateForm('lastName')">
                </div>                               
                <div class="flex flex-col sm:flex-row items-start w-full px-4 mb-1" v-if="mode == 'create'">
                    <label for="firstName" class="label-form-right-gray sm:text-right">Prénom : </label>
                    <input class="input-form-border-bottom-blue w-full" type="text" name="firstName" id="firstName" placeholder="Jean" v-model="firstName"
                    @change="validateForm('firstName')">
                </div>
                <div class="flex flex-col sm:flex-row items-start w-full px-4 mb-1">
                    <label for="email" class="label-form-right-gray sm:text-right">E-mail : </label>
                    <input class="input-form-border-bottom-blue w-full" type="mail" name="email" id="email" placeholder="jean.dupond@gmail.com" v-model="email"
                    @change="validateForm('email')">
                </div>
                <div class="flex flex-col sm:flex-row items-start w-full px-4 mb-1 relative">
                    <label for="password" class="label-form-right-gray sm:text-right">Mot de passe : </label>
                    <input class="input-form-border-bottom-blue w-full" type="password" name="password" id="password" placeholder="Mot de passe" v-model="password"
                    @change="validateForm('password')">
                    <div class="flex items-center">
                        <EyeIcon class="eye w-5 cursor-pointer absolute right-3 top-1/2 sm:top-2" @click="displayPassword('eye1')"/>
                        <EyeOffIcon class="eye-off w-5 cursor-pointer absolute right-3 top-1/2 sm:top-2 hidden" @click="displayPassword('eyeOff1')"/>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-start w-full px-4 mb-1 relative" v-if="mode == 'create'">
                    <label for="passwordCheck" class="label-form-right-gray sm:text-right">Mot de passe:</label>
                    <input class="input-form-border-bottom-blue w-full" type="password" name="passwordCheck" id="passwordCheck" placeholder="Confirmation du mot de passe" v-model="passwordCheck"
                    @change="validateForm('passwordCheck')">
                    <div class="flex items-center">
                        <EyeIcon class="eye w-5 cursor-pointer absolute right-3 top-1/2 sm:top-2 " @click="displayPassword('eye2')"/>
                        <EyeOffIcon class="eye-off w-5 cursor-pointer absolute right-3 top-1/2 sm:top-2 hidden" @click="displayPassword('eyeOff2')"/>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-start w-full px-4 mb-1" v-if="mode == 'create'">
                    <label for="mobile" class="label-form-right-gray sm:text-right">Portable : </label>
                    <input class="input-form-border-bottom-blue w-full" type="tel" name="mobile" id="mobile" placeholder="0601234567" v-model="mobile"
                    @change="validateForm('mobile')">
                </div>
                <div class="flex flex-col sm:flex-row items-start w-full px-4 mb-1" v-if="mode == 'create'">
                    <label for="departement" class="label-form-right-gray sm:text-right">Departement : </label>
                    <select v-model="departement" name="departement" id="departement" class="select-form-border-bottom-blue w-full" @change="validateForm('departement')">
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
            </div>
            <div class="flex justify-center mt-8">
                <button :class="{ 'btn-disabled' : !validateFields }" class="btn-rounded btn-blue-white" type="submit" @click.prevent="registerCandidat" v-if="mode == 'create'">
                    Envoyer
                </button>
                <button :class="{ 'btn-disabled' : !validateFields }" class="btn-rounded btn-blue-white mx-4" type="submit" @click.prevent="loginCandidat" v-else>
                    Connexion
                </button>
                <button class="btn-rounded btn-blue-white" type="reset">
                    Effacer
                </button>
            </div>
            </form>
            <div id="errorLogin" v-if="mode != 'create'"
            class="alert-red flex my-4 opacity-0 transition-all duration-500">
                <ExclamationCircleIcon class="w-10 mr-4" />
                <p>
                    L'utilisateur n'a pas été trouvé.<br/>
                    Vérifiez le mail et/ou le mot de passe.<br/>
                    Etes vous déjà inscrit ?
                </p>
            </div>
            <div id="errorEmail" v-if="mode == 'create'" class="alert-red flex my-4 opacity-0 transition-all duration-500">
                <ExclamationCircleIcon class="w-10 mr-4" />
                <p>
                    L'email est déjà enregistré.<br/>
                    Veuillez vous connecter
                </p>
            </div>
        </div>
</div>
</template>

<script>
import { validateForm, changeClassForm, displayPassword} from '../js/validateForm'
import { EyeIcon, EyeOffIcon, ExclamationCircleIcon } from '@heroicons/vue/outline'
import { mapGetters } from 'vuex'

export default {
    name: 'Login',
    components: {
        EyeIcon,
        EyeOffIcon,
        ExclamationCircleIcon,
    },
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
                departement: this.departement,
            }
            this.$store.dispatch('registerNewCandidat', candidat)
        },
        loginCandidat(){
            let candidat = {
                password: this.password,
                email: this.email,
            }
            this.$store.dispatch('loginCandidat', candidat)
        }
    }
}
</script>

<style scoped src="../css/style.css"></style>