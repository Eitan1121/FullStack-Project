<template>
  <FullRecipeView v-if="loaded" :recipe="this.recipe"/>
</template>

<script>
import FullRecipeView from "../components/FullRecipeView.vue";
export default {
  data() {
    return {
      recipe: this.recipe,
      loaded: false
    };
  },
  components: {
    FullRecipeView
  },
  async created() {
    try {
      let response;
      try {
        response = await this.axios.get(
          "http://localhost:3000/recipes/Information",
          {
            params: { recipe_id: this.$route.params.recipe_id }
          }
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      this.recipe = response.data.data[0];
      this.loaded = true;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

</style>
