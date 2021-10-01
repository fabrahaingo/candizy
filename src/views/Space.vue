<template>
    <div class="space container">
        <h1>Mon Espace</h1>
        <h2>
            Mes données personnelles
        </h2>
        <hr>
        <div class="row space__infos">
            <div class="space__infos__field col-3">
            <p>Nom de naissance :</p>
            <p>Prénom :</p>
            <p>Code NEPH :</p>
            </div>
            <div class="space__infos__value col-3">
            <p> {{ userInfos.nomNaissance }}</p>
            <p> {{ userInfos.prenom }}</p>
            <p> {{ userInfos.codeNeph }}</p>
            </div>
            <div class="space__infos__field col-3">
            <p>E-mail :</p>
            <p>Mobile :</p>
            <p>Departement :</p>
            </div>
            <div class="space__infos__value col-3">
            <p> {{ userInfos.email }}</p>
            <p> {{ userInfos.portable }}</p>
            <p> {{ userInfos.departement }}</p>
            </div>
            <hr>
        </div>
        <div class="row space__check alert alert-danger">
            <p>Veuillez vérifier vos informations ci-dessus avant de réaliser la préinscription sur Candilib</p>
        </div>
        <div class="space__pre-inscription" v-if="!gettersUserInfos.preInscription">
            <h3>
                Pré-inscription sur Candilib
            </h3>
            <p>
                Cliquez ici pour vous pré-inscrire sur Candilib :
            </p>
            <button class="btn btn-primary" @click="preInscription">Pré-Inscription</button>
        </div>
        <div class="jumbotron">
        {{ userInfos }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Space',
    data() {
        return {
            userInfos: {},
        }
    },
    created(){
        this.userInfos = this.gettersUserInfos
    },
    computed: {
        ...mapGetters(['gettersUserInfos'])
    },
    methods: {
        preInscription(){
            this.$store.dispatch('preInscriptionCandidat', this.gettersUserInfos)
        }

    }


}
</script>

<style lang="scss" scoped>

.space{
    &__infos{
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            text-align: left;
        }
        &__field{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
        &__value{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
    }
    &__pre-inscription{
        display: flex;
        justify-content: center;
        align-items: baseline;
        flex-wrap: wrap;
        h3{
            width: 100%;
        }
        button{
            margin-left: 5%;
        }                                                                       
    }
}

.col-3{
    //border: 1px solid black;
}
    
</style>