<template>
    <div class="inscription container">
        <h1>Inscription</h1>
        <form action="#">
            <div class="form-group row my-2">
                <label for="neph" class="col-sm-3 col-form-label text-start">NEPH : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="neph" id="neph" placeholder="093496239512" v-model="neph">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="lastName" class="col-sm-3 col-form-label text-start">Nom de Naissance : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="lastName" id="lastName" placeholder="Dupond" v-model="lastName">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="firstName" class="col-sm-3 col-form-label text-start">Prénom : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="firstName" id="firstName" placeholder="Jean" v-model="firstName">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="password" class="col-sm-3 col-form-label text-start">Mot de passe : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="password" name="password" id="password" placeholder="Mot de passe" v-model="password">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="passwordCheck" class="col-sm-3 col-form-label text-start">Mot de passe: </label>
                <div class="col-sm-9">
                    <input class="form-control" type="password" name="passwordCheck" id="passwordCheck" placeholder="Confirmation du mot de passe" v-model="passwordCheck">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="email" class="col-sm-3 col-form-label text-start">E-mail : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="mail" name="email" id="email" placeholder="jean.dupond@gmail.com" v-model="email">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="mobile" class="col-sm-3 col-form-label text-start">Portable : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="tel" name="mobile" id="mobile" placeholder="0601234567" v-model="mobile">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="departement" class="col-sm-3 col-form-label text-start">Departement : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="departement" id="departement" placeholder="26" v-model="departement">
                </div>
            </div>
            <button :class="{ 'disabled' : !validateFields }" class="btn btn-primary mx-4" type="submit" @click.prevent="registerCandidat">Envoyer le formulaire</button>
            <button class="btn btn-primary" type="reset">Effacer le formulaire</button>
        </form>
        {{ firstName +' '+ lastName }}
        {{ password +' '+ passwordCheck }}
        {{ neph }}
        {{ email +' '+ mobile }}
        {{ departement }}
        {{ validateFields }}
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Register',
    data () {
        return {
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
            regexEmail: /[\w.-]+@[\w-]+\.\w{3,6}/,
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
            if((this.regexNeph.test(this.neph) && this.regexNom.test(this.firstName) && this.regexNom.test(this.lastName) && this.regexPassword.test(this.password) && this.regexEmail.test(this.email)  && this.regexTel.test(this.mobile) && this.regexDepartement.test(this.departement)) && this.password === this.passwordCheck){
                return true
            } else {
                return false
            }
        },
        ...mapGetters(['gettersDepartements'])
    },
    methods: {
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
        }
    }
}
</script>
