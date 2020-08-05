<template>
  <div>
    <div id="personal">
      <div v-if="hasPersonalRecipes">
        <h1 style="text-align: center;">Personal Recipes</h1>
        <br />
        <br />
        <div class="results">
          <RecipePreview
            class="recipePreview"
            v-for="r in recipes"
            :key="r.id"
            :recipe="r"
            :personalRecipeId="r.title"
          />
        </div>
      </div>
      <div v-else-if="dontHave">
        <h1>You Dont Have Personal Recipes</h1>
      </div>
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
      recipes: [],
      hasPersonalRecipes: false,
      dontHave: false
    };
  },
  methods: {
    async getPersonalRecipes() {
      this.recipes = [];
      let respone;
      this.axios.defaults.withCredentials = true;
      try {
        respone = await this.axios.get(
          "http://localhost:3000/profiles/private"
        );
        console.log(respone);
        if (respone.data) {
          this.recipes.push(...respone.data.data);
          this.hasPersonalRecipes = true;
        } else {
          this.dontHave = true;
        }
      } catch (err) {
        console.log(err);
        this.$router.replace("/NotFound");
      }
    }
  },
  mounted() {
    this.getPersonalRecipes();
  }
};
</script>

<style>
.results {
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
  font-family: "Palanquin Dark" !important;
  color: #333333;
}
</style>