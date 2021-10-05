<template>
    <div class="relative w-full h-full flex items-center justify-start sm:justify-center">
        <div class="ml-2">
            <h1 class="text-4xl font-bold sm:font-extrabold">
                <span class="text-blue-500">CAN</span>
                <span class="text-white">DI</span>
                <span class="text-red-500">ZY</span>
            </h1>
        </div>
        <div class="absolute top-1 right-1 w-30 h-full flex justify-center items-center">
            <router-link to="/">
            <HomeIcon class="w-8 text-white mr-2"/>
            </router-link>
            <router-link to="/login" v-if="gettersUserInfos.id == -1">
            <LoginIcon class="w-8 text-white mr-2"/>
            </router-link>
            <router-link to="/space" v-else>
            <UserCircleIcon class="w-8 text-white mr-2"/>
            </router-link>
            <LogoutIcon class="w-8 text-white mr-0 cursor-pointer" @click="logout" v-if="gettersUserInfos.id != -1"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HomeIcon, LoginIcon, UserCircleIcon, LogoutIcon } from '@heroicons/vue/outline'

export default {
    name: 'Header',
    components: {
        HomeIcon,
        LoginIcon,
        UserCircleIcon,
        LogoutIcon,
    },
    computed:{
        ...mapGetters(['gettersUserInfos'])
    },
    methods:{
        logout() {
            if(confirm('Etes-vous certains de vouloir vous déconnecter ?')){
                this.$store.dispatch('logout')
            } else {
                return
            }
        }
    }
}
</script>
