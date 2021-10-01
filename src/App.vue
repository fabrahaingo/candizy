<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/login" v-if="userInfos.id == -1">Connexion</router-link><span v-if="userInfos.id == -1"> | </span> 
    <router-link to="/space" v-if="userInfos.id != -1">Mon espace</router-link> 
  </div>
  <router-view/>
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #0d6efd;
    }
  }
}
</style>
