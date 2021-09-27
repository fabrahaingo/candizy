<template>
        <div class="login container">
        <h1>login</h1>

        <form action="#">
            <div class="form-group row my-2">
                <label for="email" class="col-sm-3 col-form-label text-start">E-mail : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="mail" name="email" id="email" placeholder="jean.dupond@gmail.com" v-model="email">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="password" class="col-sm-3 col-form-label text-start">Mot de passe : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="password" name="password" id="password" placeholder="Mot de passe" v-model="password">
                </div>
            </div>
            <button :class="{ 'disabled' : !validateFields }" class="btn btn-primary mx-4" type="submit" @click.prevent="loginCandidat">Connexion</button>
            <button class="btn btn-primary" type="reset">Effacer le formulaire</button>
        </form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Login',
    data(){
        return {
            email: '',
            password: '',
            regexPassword: /[\w.-]{8,16}/,
            regexEmail: /[\w.-]+@[\w-]+\.\w{3,6}/,
        }
    },
    computed: {
        validateFields() {
            if(this.regexEmail.test(this.email) && this.regexPassword.test(this.password)){
                return true
            } else {
                return false
            }
        },
        ...mapGetters(['gettersDepartements'])
    },
    methods: {
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

<style>

</style>