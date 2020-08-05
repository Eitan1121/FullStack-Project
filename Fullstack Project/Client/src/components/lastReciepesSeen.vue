<template>
<div>
    <h1>Last Viewed Recipes</h1>
    <div class = "last-viewed">
        <b-row id="lasts" v-for="r in lastViewdRecipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
    </div>
</div>
  
</template>

<script>
import RecipePreview from "../components/RecipePreview";
export default {
    components: {
        RecipePreview
    },
    data() {
        return {
            lastViewdRecipes: []
        };
    },
    methods:{
        async getLastViewedRecipes(){
            let respone;
            try{
                this.axios.defaults.withCredentials = true;
                respone = await this.axios.get("http://localhost:3000/profiles/last");
                if(respone.data === "No recepies viewed"){
                    this.isEmpty = true;
                    return;
                }else{
                    this.lastViewdRecipes= [];
                    this.lastViewdRecipes.push(...respone.data.data)
                    this.isFull = true;
                }
            }catch(err){
                console.log(err)
            }
        }
    },
    mounted() {
        this.getLastViewedRecipes();
    },
}
</script>

<style>
#lasts {
  align-items: center;
  justify-content: center;
  padding: 2% 8%;
}
</style>