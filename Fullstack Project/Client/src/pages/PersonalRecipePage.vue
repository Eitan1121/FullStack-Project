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
      let title;
        if (this.$route.params.title)
            this.$root.store.saveRecipeTitle(this.$route.params.title);
        title = localStorage.getItem('recipe_title');
      let response;
      try {
        this.axios.defaults.withCredentials = true;
        response = await this.axios.get(
          "http://localhost:3000/profiles/private/full",
          {
            params: { title: title }
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
