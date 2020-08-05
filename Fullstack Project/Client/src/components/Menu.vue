<template>
  <div id="nav" class="sticky row">
    <div id="main-section" class="col">
      <router-link :to="{ name: 'main' }" id="my-logo">
        DEV <font-awesome-icon icon="cookie-bite" size="md"/> UR
      </router-link>
      <router-link :to="{ name: 'search' }">
        <font-awesome-icon icon="search" size="sm"/> Search 
      </router-link>
      <router-link :to="{ name: 'about' }">
        <font-awesome-icon icon="user-friends" size="sm"/> About 
      </router-link>
      <!-- PRIVATE -->
      <b-dropdown v-if="$root.store.username" text="Personal" id="personal">
        <b-dropdown-item :to="{ name: 'favorites' }">My Favorites</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'personalRecipes' }">Private Recipes</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'familyRecipes' }">Family Recipes</b-dropdown-item>
      </b-dropdown>
    </div>
    
    <!-- USER SECTION -->
    <div id="user-section" class="col">
      <div v-if="!$root.store.username">
        <span class="hello"> Hello GUEST </span>
        <router-link :to="{ name: 'register' }" class="user-section">
          <font-awesome-icon icon="plus" size="sm"/> Register
        </router-link>
        <router-link :to="{ name: 'login' }" class="user-section">
          <font-awesome-icon icon="sign-in-alt" size="sm"/> Login
        </router-link>
      </div>

      <div v-else>
        <span class="hello"> Hello {{ $root.store.username }}</span>
        <button @click="Logout" id="logout-btn">
        <font-awesome-icon icon="sign-out-alt" size="sm"/>  Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "Guest",
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style>
#nav {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 0 !important;
  height: 62px;
  width: 100%;
  background-color: whitesmoke;
  font-family: 'Palanquin Dark';
  justify-content: center;
  font-size: 22px;
  -webkit-box-shadow: -2px 2px 9px 7px rgba(0,0,0,0.53);
  -moz-box-shadow: -2px 2px 9px 7px rgba(0,0,0,0.53);
  box-shadow: -2px 2px 9px 7px rgba(0,0,0,0.53);
  z-index: 10;
}

#nav a {
  color: #333333;
  padding: 10px;
  margin: 0;
}

#nav a:hover {
  opacity: 70%;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  opacity: 70%;
}

#my-logo{
  padding: 10px;
  padding-bottom: 10px;
  margin-right: 20px;
  margin-left: -15px !important;
  padding-left: 35px;
  padding-right: 25px;
  font-size: 120%;
  background-color: #333333;
  color: whitesmoke !important;
}

#my-logo:hover{
  text-decoration: none;
  opacity: 90%; 
}

#my-logo.router-link-exact-active{
  text-decoration: none;
  opacity: 100% !important;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

#user-section{
  text-align: right;
  justify-content: center;
  color: #333333;
  padding-bottom: 3px;
}

#main-section a{
  margin-left: 20px;
}

.user-section{
  margin-left: 30px;
  font-size: 22px;
}

#user-section{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#logout-btn,
#logout-btn:focus
{
  outline: none;
  border: none;
}

#logout-btn:hover {
  opacity: 70%;
}

.hello {
  padding-right: 25px;
}

#personal {
  font-family: 'Palanquin Dark';
}

#personal .dropdown-menu {
  background-color: whitesmoke;
  padding: 3px;
  border: none;
}

#personal a {
  margin-left: 0;
  font-size: 20px !important;
}

#personal button::after {
  display: none;
}

#personal button:focus,
#personal button {
  background-color: transparent;
  color: #333333;
  margin-left: 20px;
  outline: none;
  border: none;
  box-shadow: none;
  font-size: 22px;
  padding: 10px;
  padding-top: 4px;
}
</style>