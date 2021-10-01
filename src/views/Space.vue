<template>
    <div class="space container">
        <h1>Mon Espace</h1>
        <h2>
            {{ userInfos.nomNaissance + ' ' + userInfos.prenom}} 
        </h2>
        <h3>
            Pré-inscription sur Candilib
        </h3>
        <div class="space">

        </div>

        {{ userInfos }}
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

    }


}
</script>
