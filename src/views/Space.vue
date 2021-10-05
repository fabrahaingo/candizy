<template>
    <div class="bg-white flex flex-col justify-center items-center p-2 my-12 sm:max-w-screen-md sm:mx-auto sm:rounded-3xl sm:shadow">
        <h1 class="w-full text-center text-3xl font-extrabold">Mon Espace</h1>
        <h2 class="w-full text-start font-bold mb-2">
            Mes données personnelles
        </h2>
        <div class="w-full flex flex-wrap">
            <div class="w-1/3 text-right font-bold text-gray-600">
            <p>Nom :</p>
            <p>Prénom :</p>
            <p>Code NEPH :</p>
            </div>
            <div class="w-2/3 pl-2">
            <p class="border-b border-gray-400"> {{ userInfos.nomNaissance }}</p>
            <p class="border-b border-gray-400"> {{ userInfos.prenom }}</p>
            <p class="border-b border-gray-400"> {{ userInfos.codeNeph }}</p>
            </div>
            <div class="w-1/3 text-right font-bold text-gray-600">
            <p>E-mail :</p>
            <p>Mobile :</p>
            <p>Departement :</p>
            </div>
            <div class="w-2/3 pl-2">
            <p class="border-b border-gray-400"> {{ userInfos.email }}</p>
            <p class="border-b border-gray-400"> {{ userInfos.portable }}</p>
            <p class="border-b border-gray-400"> {{ userInfos.departement }}</p>
            </div>
        </div>
        <div class="important-orange flex justify-start items-center my-4">
            <ExclamationIcon class="w-20 sm:w-16 mr-2" />
            <p>Veuillez vérifier vos informations ci-dessus avant de réaliser la préinscription sur Candilib</p>
        </div>
        <div class="w-full flex flex-col my-4" v-if="!gettersUserInfos.preInscription">
            <h3 class="w-full text-start font-bold mb-2">
                Pré-inscription sur Candilib
            </h3>
            <p>
                Cliquez ici pour vous pré-inscrire sur Candilib :
            </p>
            <button class="btn-rounded btn-blue-white mt-2 w-40 self-center" @click="preInscription">Pré-Inscription</button>
        </div>
        <div class="w-full break-words">
        {{ userInfos }}
        </div>
    </div>
</template>

<script>
import { ExclamationIcon } from '@heroicons/vue/outline' 
import { mapGetters } from 'vuex'

export default {
    name: 'Space',
    components: {
        ExclamationIcon,
    },
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
<style scoped src="../css/style.css"></style>