<template>
  <div id="app">

    <topBar v-show="$store.state.showtopbarflag"/>
    <MainContent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import topBar from './components/TopBar.vue'
import MainContent from './components/MainContent.vue'

export default {
  name: 'app',
  components: {
    MainContent,
    topBar
  },
  created () {
    this.$store.commit('getimgsrc')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
