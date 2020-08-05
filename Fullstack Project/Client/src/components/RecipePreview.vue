<template>
<div class="recipe-preview">
    <div class="recipe-body">
      <router-link  v-if="!this.personalRecipeId"
      :to="{ name: 'recipe', params:{recipe_id: recipe.id}}"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      >
      <img :src="recipe.image" class="recipe-image" />
      </router-link>
      <router-link  v-else-if="this.personalRecipeId"
      :to="{ name: 'personalRecipesFull', params:{title: recipe.title}}"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      >
      <img :src="recipe.image" class="recipe-image" />
      </router-link>
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
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
        <font-awesome-icon @click="addToFavorites" v-if="!recipe.favorite && !personalRecipeId" :icon="['far', 'star']" size="2x" class="info green"/>
        <font-awesome-icon v-else-if="recipe.favorite && !personalRecipeId" :icon="['fas', 'star']" size="2x" class="info green"/>
      </div>
      <ul class="recipe-overview">
        <li>
          <font-awesome-icon id="prepDuration" :icon="['far', 'clock']" size="lg"/>
          {{ recipe.readyInMinutes }} mins
        </li>
        <li>
          <font-awesome-icon id="likes" icon="heart" size="lg"/>
          {{ recipe.aggregateLikes }} likes
        </li>
      </ul>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      image_load: false,
      hover: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    personalRecipeId: {
      type: String,
      required: false,
      default() {
        return undefined;
      },
    },
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
  }
  
};
</script>

<style scoped>
.recipe-preview {
  font-family: 'Palanquin Dark';
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  -webkit-box-shadow: 6px 6px 10px -1px rgba(0,0,0,0.56);
  -moz-box-shadow: 6px 6px 10px -1px rgba(0,0,0,0.56);
  box-shadow: 6px 6px 10px -1px rgba(0,0,0,0.56);
  cursor: pointer;
  /* border: rgb(122, 122, 122) solid 1px; */
}
.recipe-preview:hover {
  transition-duration: 0.5s;
  transform: scale(1.05);
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}
.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover; 
  
}
.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 16pt;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: #333333;
  margin-bottom: 1%;
}
.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  color: #333333;
}

.recipe-info{
  text-align: center;
  margin-top: 3%;
  margin-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  font-size: 80%;
  color: #333333;
}

a:hover { 
  text-decoration: none; 
}

#likes,
#prepDuration{
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 5px;
}

.green {
  color: rgba(39, 129, 39, 0.801);
}

.red {
  color: rgba(129, 39, 39, 0.801);
}

.blue {
  color: rgba(39, 67, 129, 0.801);
}

.info {
  margin-left: 10px;
  margin-right: 10px;
}
</style>