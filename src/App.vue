<template>
  <div id="app">
    <filterMenu v-show="$store.state.showtopbarflag" />
    <topBar v-show="$store.state.showtopbarflag" />
    <MainContent msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import topBar from "./components/TopBar.vue";
import MainContent from "./components/MainContent.vue";
import filterMenu from "./components/filterMenu";

export default {
  name: "app",
  components: {
    MainContent,
    topBar,
    filterMenu
  },
  created() {
    this.$store.commit("getimgsrc");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
