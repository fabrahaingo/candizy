<template>
    <div class="inscription container">
        <h1>Inscription</h1>
        <form action="#">
            <div class="form-group row my-2">
                <label for="neph" class="col-sm-3 col-form-label text-start">NEPH : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="neph" id="neph" placeholder="093496239512">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="lastName" class="col-sm-3 col-form-label text-start">Nom de Naissance : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="lastName" id="lastName" placeholder="Dupond">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="firstName" class="col-sm-3 col-form-label text-start">Prénom : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="firstName" id="firstName" placeholder="Jean">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="email" class="col-sm-3 col-form-label text-start">Courriel : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="mail" name="email" id="email" placeholder="jean.dupond@gmail.com">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="mobile" class="col-sm-3 col-form-label text-start">Portable : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="tel" name="mobile" id="mobile" placeholder="0601234567">
                </div>
            </div>
            <div class="form-group row my-2">
                <label for="departement" class="col-sm-3 col-form-label text-start">Departement : </label>
                <div class="col-sm-9">
                    <input class="form-control" type="text" name="departement" id="departement" placeholder="26">
                </div>
            </div>
            <button class="btn btn-primary mx-4" type="submit">Valider le formulaire</button>
            <button class="btn btn-primary" type="reset">Effacer le formulaire</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data () {
        return {
            neph: '',
            firstName: '',
            LastName: '',
            email: '',
            mobile: '',
            departement: '',

        }
    },
    created(){
        this.$store.dispatch('getDepartement')
    },
    computed() {

    }
}
</script>
