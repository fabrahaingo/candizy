<template>
    <div class="space container">
        <h1>Mon Espace</h1>

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
