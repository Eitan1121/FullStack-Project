<template>
   <div>
    <div v-if="isExist" id="fav">
    <div>
      <h1 style="text-align: center;">Favorites Recipes</h1>
      <br><br>
      <div class="results">
        <RecipePreview v-for="r in recipes" :key="r.id" :recipe="r" />
      </div>
    </div>
    </div>
    <div v-else-if="notExist" id="no-favorites" >
        <br>
        <br>
        <h1>You Dont Have Favorites Recipes</h1>
    </div>
   </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
export default {
    components: {
        RecipePreview   
    },
    data(){
        return{
            recipes:[],
            isExist:false,
            notExist:false
        };
    },
    methods:{
        async getFaves(){
            this.recipes = [];
            let respone;
            this.axios.defaults.withCredentials = true;
            try{
                respone = await this.axios.get("http://localhost:3000/profiles/favorites");
                console.log(respone)
                if(respone.data){
                    this.recipes.push(...respone.data.data);   
                    this.isExist = true;
                }else{
                    this.notExist = true;
                }
            }catch(err){
                console.log(err);
                 this.$router.replace("/NotFound");
            }
        }
    },
    mounted(){
        this.getFaves();
    }
}
</script>

<style>
.results{
  display: grid;
  grid-template-columns: repeat(3, 23%);
  grid-template-rows: repeat(3, auto);
  grid-gap: 4%;
  width: 80%;
  margin-left: 10%;
  justify-items: center;
  align-items: center;
  justify-content: center;
}
h1 {
    font-family: 'Palanquin Dark' !important;
    color: #333333;
}
</style>