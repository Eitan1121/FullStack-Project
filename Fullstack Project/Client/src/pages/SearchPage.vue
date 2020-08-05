<template>
  <div class="searchcontainer">
      <div>
        <b-form @submit.prevent="handleSearch" id="search-component">
        <div class="active-cyan-3 active-cyan-4 mb-4" id="query" >
          <font-awesome-icon icon="search" size="md"/> SERACH
          <input class="form-control" v-model="searchForm.query" type="text" 
          placeholder="" aria-label="Search" id="search-field" required>
        </div> 
        <div class="row">
          <div class="col-3">
            <b-form-group class = form
              id="group-for-cusine"
              label-cols-sm="4"
              description=""
              label="Cusine"
              label-for="cusines"
              >
            <b-form-select id="cusines" v-model="searchForm.cusine" :options="cusines"></b-form-select>
          </b-form-group>
          </div>
          <div class="col-3">
            <b-form-group class = form
              id="group-for-diet"
              label-cols-sm="4"
              description=""
              label="Diet"
              label-for="diets"
            >
            <b-form-select id="diets" v-model="searchForm.diet" :options="diets"></b-form-select>
            </b-form-group>
          </div>
          <div class="col-4">
          <b-form-group class = form
            id="group-for-intolerance"
            label-cols-sm="5"
            description=""
            label="Intolerance"
            label-for="intolerance"
          >
          <b-form-select id="intolerance" v-model="searchForm.intolorence" :options="intolerances"></b-form-select>
          </b-form-group>
          </div>
          <div class="col-2">
          <b-form-group
          id="group-for-amount"
          label-cols-sm="6"
          description=""
          label="Results"
          label-for="amount"
          >
          <b-form-select id="amount" v-model="searchForm.amount" :options="amounts"></b-form-select>
          </b-form-group>
          </div>
        </div> 
        
        <div style="width: 50%; margin-left: 24.1%;">
          <input class="btn btn-primary" type="submit" value="Search" id="register">   
          <input class="btn btn-primary" type="reset" value="Reset" id="reset">
        </div>
        </b-form>
      </div>
      <br>
      <hr>
      <br>
     <b-dropdown id="sort" text="sort by" class="m-md-2">
        <b-dropdown-item @click= "sortByPopularity">Popularity</b-dropdown-item>
        <b-dropdown-item @click= "sortByPreperationTime">Preperation Time</b-dropdown-item>
      </b-dropdown>  
    <div v-if="this.recipes.length != 0" class="results">
      <RecipePreview class="recipe-pers"
        v-for="r in recipes"
        :key="r.id"
        :recipe = "r"
      />
    </div>
    <div v-else-if="this.recipes.length == 0" class="results">
      <RecipePreview class="recipe-pers"
        v-for="r in lastSearchResults"
        :key="r.id"
        :recipe = "r"
      />
    </div>
  </div>
</template>

<script>
  import cusineArr from "../assets/cusine";
  import dietArr from "../assets/diet";
  import intoleranceArr from "../assets/intolorences.js";
  import RecipePreview from "../components/RecipePreview";
export default {
  components: {
    RecipePreview,
  },
  data() {
      return {
        recipes:[],
        lastSearchResults:[],
        searchForm:{
          query:null,
          amount:null,
          cusine:null,
          intolorence:null,
          diet:null
        },
        cusines: [{ value: null, text: "", disabled: true }],
        diets: [{ value: null, text: "", disabled: true }],
        intolerances: [{ value: null, text: "", disabled: true }],
        amounts: [{ value: null, text: "", disabled: true }],
     }
  },
  mounted(){
      this.cusines.push("");
      this.cusines.push(...cusineArr);
      this.diets.push("");
      this.diets.push(...dietArr);
      this.intolerances.push("");
      this.intolerances.push(...intoleranceArr);
      this.amounts.push(5);
      this.amounts.push(10);
      this.amounts.push(15);
      this.searchForm.amount = 5;
       if (this.$root.store.username){
        if (localStorage.getItem("lastSearchFormByUser") != undefined) {
        this.searchForm = JSON.parse(localStorage.getItem("lastSearchFormByUser"));
        } 
        this.lastSearchResults = JSON.parse(localStorage.getItem("lastSearchByUser"));
      }
  },
  methods:{
    async handleSearch(){ 
      let respone;
      try{
        respone = await this.axios.get("http://localhost:3000/recipes/search/query/" 
        + this.searchForm.query + "/number/" 
        + this.searchForm.amount,
        {
          params:{
            cuisine: this.searchForm.cusine,
            diet: this.searchForm.diet,
            intolerances: this.searchForm.intolorence
          }
        });
        this.recipes = [];
        this.lastSearchResults = [];
        this.recipes.push(...respone.data.data);
        if(this.recipes.length == 0){
          alert("No Recipes Found")
        }
        if (this.$root.store.username) {
          this.$root.store.saveLastSearchFormByUser(this.searchForm);
          this.$root.store.saveLastSearchByUser(this.recipes);
          this.lastSearchResults = JSON.parse(localStorage.getItem("lastSearchByUser"));
        }
      }catch(err){
        console.log(err);
      }
    },
    handleReset(){
      this.searchForm.query = null;
      this.searchForm.diet = null;
      this.searchForm.intolorence = null;
      this.searchForm.cusine = null;
      this.searchForm.amount = 5;
    },
    sortByPopularity(){
      if(this.recipes && this.recipes.length !=0){
        this.recipes.sort(function(a,b){
          return a.aggregateLikes - b.aggregateLikes
        });
      }else if(this.lastSearchResults && this.lastSearchResults.length != 0){
        this.lastSearchResults.sort(function(a,b){
          return a.aggregateLikes - b.aggregateLikes
        });
      }
    },
    sortByPreperationTime(){
       if(this.recipes && this.recipes.length !=0){
        this.recipes.sort(function(a,b){
          return a.readyInMinutes - b.readyInMinutes
        });
       }else if(this.lastSearchResults && this.lastSearchResults.length != 0){
        this.lastSearchResults.sort(function(a,b){
          return a.readyInMinutes - b.readyInMinutes
        });
      }
    }
  }
}
</script>

<style>
.results{
  display: grid;
  grid-template-columns: repeat(3, 23%);
  grid-template-rows: repeat(3, auto);
  grid-gap: 4%;
  width: 100%;
  justify-items: center;
  align-items: center;
  justify-content: center;
}
  hr{
   height: 1px;
   background-color: #333333;
  }
  #search-component {
    font-family: 'Palanquin Dark';
    color: #333333;
    background-color: whitesmoke;
    /* -webkit-box-shadow: 1px 6px 7px 4px rgba(120,120,120,1);
    -moz-box-shadow: 1px 6px 7px 4px rgba(120,120,120,1);
    box-shadow: 1px 6px 7px 4px rgba(120,120,120,1); */
    padding: 2%;
    margin-left: 10%;
    text-align: center;
    width: 80% !important;
  }
  #search-field {
    /* min-width: 550px; */
    width: 87%;
    margin-left: 8%;
    border: #333333 1px solid !important;
  }
  #query {
    margin: 0 25% !important;
    margin-bottom: 20px !important;
  }
  .searchcontainer {
    width: 90% !important;
    margin-left: 5% !important;
    margin-right: 5% !important;
    max-width: 90% !important;
  }
  h3 {
    text-align: center;
    margin-bottom: 30px;
  }
  h1 {
    text-align: center;
  }
  #search-component{
    font-size: 115%;
  }

  #search-component select:focus,
  #search-component input:focus,
  #search-component select:active,
  #search-component input:active,
  #search-component select,
  #search-component input{
    border: none;
    outline: none !important;
    background-color: transparent !important;
    box-shadow: none; 
  }

  #search-component input:focus,
  #search-component input{
    border-bottom: #333333 1px solid; 
    border-radius: 0; 
  }

  #search-component select:focus,
  #search-component select{
    border-bottom: #333333 1px solid; 
    border-radius: 0; 
  }

  input:internal-autofill-selected{
    background-color: whitesmoke;
  }

  #search-component #register,
  #search-component #register:focus,
  #search-component #reset:focus,
  #search-component #reset {
    width: 40%;
    margin-left: 5%;
    font-size: 115%;
    outline: none;
    border: none;
    box-shadow: none;
  }

  #search-component #register {
    background-color: #333333 !important;
  }

  #search-component #reset {
    background-color: #333333 !important;
  }
</style>