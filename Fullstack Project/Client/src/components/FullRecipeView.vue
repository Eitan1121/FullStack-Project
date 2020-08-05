<template>
  <div class="container" id="full-recipe">
    <div v-if="recipe">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6" id="image-wrapper">
            <img :src="recipe.image" alt="Image" class="rounded-0">
          </b-col>
          <b-col md="6">
            <b-card-body id="general-info">
              <h1>{{ recipe.title }}</h1>
              <h1 id="servings">
                <!-- <font-awesome-icon id="serv-icon" icon="concierge-bell" size="lg" class="info"/> -->
                {{ recipe.servings }} servings
                <span class="seperator"></span> 
                <!-- <font-awesome-icon id="prepDuration" :icon="['far', 'clock']" size="lg" class="info"/> -->
                {{ recipe.readyInMinutes }} minutes
                <span class="seperator"></span> 
                <!-- <font-awesome-icon id="likes" icon="heart" size="lg" class="info"/> -->
                {{ recipe.aggregateLikes }} likes
              </h1>
              <b-card-text id="info-text">
                <div class="recipe-info">
                  <!-- VEGAN -->
                  <font-awesome-icon v-if="recipe.vegetarian" icon="leaf" size="2x" class="info green"/>
                  <!-- VEGETATRIAN -->
                  <font-awesome-icon v-else-if="recipe.vegan" icon="seedling" size="2x" class="info green"/>
                  <!-- GLUTEN FREE -->
                  <font-awesome-icon v-if="recipe.glutenFree" icon="ribbon" size="2x" class="info red"/>
                  <!-- VISITED -->
                  <font-awesome-icon v-if="recipe.visited" icon="eye" size="2x" class="info blue"/>
                  <!-- FAVORITE -->
                  <font-awesome-icon @click="addToFavorites" v-if="!recipe.favorite" :icon="['far', 'star']" size="2x" class="info green"/>
                  <font-awesome-icon v-else-if="recipe.favorite" :icon="['fas', 'star']" size="2x" class="info green"/>
                </div>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      <hr>
      <br>
      <div id="content" class="row">
        <b-col>
          <h2>Ingredients :</h2>
          <ul style="list-style-position: outside;">
            <li v-for="r in recipe.ingredients.split(' ~ ')" :key="r">{{ r }}</li>
          </ul>
        </b-col>
        <b-col>
          <h2 style="align-text: center;">Instructions :</h2>
          <ul style="list-style-position: outside;">
            <li  v-for="r in recipe.instructions.split('\n')" :key="r">{{ r }}</li>
          </ul>
        </b-col>
        <!-- <h1><font-awesome-icon :icon="award" size="2x"/></h1> -->
      </div>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods:{
    async addToFavorites(){
      try{
        this.axios.defaults.withCredentials = true;
        await this.axios.post(
          "http://localhost:3000/profiles/favorites",{
          recipe:this.recipe.id,
          }
        );
        this.recipe.favorite = "true";
      }catch(err){
        console.log(err)
      }
    }
  },
}
</script>

<style>
#full-recipe {
  display: flex;
  font-family: 'Palanquin Dark';
  color: #333333;
  background-color: whitesmoke;
}

#full-recipe div{
  border: none !important;
  outline: none !important;
  background-color: transparent;
}

h1 {
  font-family: 'Palanquin Dark';
  text-align: center;
}
#full-recipe img {
  border: 5px solid #333333;
  -webkit-box-shadow: 7px 8px 14px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 7px 8px 14px -2px rgba(0,0,0,0.75);
  box-shadow: 7px 8px 14px -2px rgba(0,0,0,0.75);
  max-width: 90%;
  margin: 5%;
}

#general-info {
  padding: 5%; 
  margin-top: 15%;
}

.recipe-info {
  text-align: center;
  margin-top: 3%;
  margin-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  font-size: 80%;
  color: #333333;
}

#servings .seperator {
  border-left: 2px solid #333333;
  margin: 10px;
  font-size: 80%;
}

#servings {
  font-size: 160%;
  margin-top: 20px;
}

#full-recipe .info {
  font-size: 110% !important;
  margin-right: 10px !important;
}

#info-text {
  margin: 20px;
  font-size: 170% !important;
}

#info-text .info {
  margin: 5px;
}

hr{
  height: 2px;
  background-color: #333333;
}

#content {
  font-size: 130%;
}

</style>