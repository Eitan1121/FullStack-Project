<template>
  <div id="family-page">
    <h1 style="text-align: center;">Family Recipes</h1>
    <br />
    <br />
    <div v-if="isFull">
      <div class="results">
        <FamilyRecipePreview v-for="r in recipes" :key="r.id" :recipe="r" />
      </div>
    </div>
    <div v-if="isEmpty" id>
      <h1>There is no Family Recipes</h1>
    </div>
  </div>
</template>

<script>
import FamilyRecipePreview from "../components/FamilyRecipePreview";
export default {
  components: {
    FamilyRecipePreview
  },
  data() {
    return {
      recipes: [],
      isFull: false,
      isEmpty: false
    };
  },
  mounted() {
    this.getFamilyRecipes();
  },
  methods: {
    async getFamilyRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/profiles/family"
        );
        if (response.data) {
          const recipes = response.data.data;
          this.recipes = [];
          this.recipes.push(...recipes);
          this.isFull = true;
        } else {
          this.isEmpty = true;
        }
      } catch (error) {
        console.log(error);
      }
    }
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