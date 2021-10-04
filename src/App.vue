<template>
    <div class="w-screen bg-black bg-gradient-to-t from-gray-600 h-14">
        <Header />
    </div>
        <router-view/>
</template>

<script>
import Header from './components/header/Header.vue'

export default{
    name: 'App',
    components: {
        Header,
    },
}
</script>