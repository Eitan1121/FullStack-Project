<template>
  <div class="container" id="main">
    <br>
    <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    {{ !$root.store.username }} -->
    <div class="row">
    <div class="col-lg-5" id="explore">
      <h1>Explore New Flavors 
      <b-button size="lg"  @click="getRandomRecipes">
        <font-awesome-icon :icon="[ 'fas', 'sync-alt' ]" size="lg"/>
      </b-button>
      </h1>
      <b-row id = "randoms" v-for="r in RandomRecipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
      </b-row>
    </div>
    <div class="col-lg-2"></div>
    <div class="col-lg-5">
      <div>
        <lastReciepesSeen v-if="this.$root.store.username"/>
      </div>
      <div class = "last-viewed" v-if="!this.$root.store.username">
        <br><br><br>
        <h2>To See Last Viewed Recipes Please Log In First</h2>
        <Login/>
      </div>
    </div>
  </div>
  <br>
  <br>
</div>
</template>

<script>
import Login from "../pages/LoginPage";
import RecipePreview from "../components/RecipePreview";
import lastReciepesSeen from "../components/lastReciepesSeen";
export default {
  components: {
    RecipePreview,
    Login,
    lastReciepesSeen
  },
  data(){
    return{
      RandomRecipes:[],
      isEmpty:false,
      isFull:false
    }
  },
  methods:{
    async getRandomRecipes(){
      console.log("EEEEitan")
      let respone;
      try{
        respone = await this.axios.get("http://localhost:3000/recipes/random");
        this.RandomRecipes= [];
        this.RandomRecipes.push(...respone.data.data);
      }catch(err){
        console.log(err)
      }
    },
  },
  mounted(){
    this.getRandomRecipes();
  }
};
</script>

<style lang="scss" scoped>
#main {
  font-family: 'Palanquin Dark';
  color: #333333;
  background-color: whitesmoke;
  text-align: center;
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
#randoms {
  align-items: center;
  justify-content: center;
  padding: 2% 8%; 
}
.fa-input {
  font-family: FontAwesome;
}
</style>
