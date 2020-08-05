<template>
  <div id="app">
    <Menu/>
    <router-view class="content"/>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
export default {
  name: "App",
  components: {
    Menu
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import url('https://fonts.googleapis.com/css2?family=Palanquin+Dark:wght@500&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  background-color: whitesmoke;
  min-height: 100vh;
  padding-top: 90px;
}

html{
  background-color: whitesmoke;
}
</style>
