var express = require("express");
var router = express.Router();
const axios = require("axios");
const preview = require("./utils/preview");
const updateViews = require("./utils/updateViews");
const DButils = require("../DB_modules/DButils");

const api_domain = "https://api.spoonacular.com/recipes";

router.get("/random", async (req, res, next) => {
  try {
    const {limitLicense, tags} = req.query;
    const random_response = await axios.get(`${api_domain}/random`, {
      params: {
        number: 3,
        apiKey: process.env.spooncular_apiKey
      }
    });
    let data = await preview.recipe_preview(req, random_response.data.recipes);
    res.status(200).send({data: data});
  }
  catch(err) {
    next (err)
  }
});

router.get("/Information", async (req, res, next) => {
  try {
    const recipe = await getRecipeInfo(req.query.recipe_id);
    updateViews.updateViews(req, recipe);
    const fullrecipe = await getFullRecipe(req, recipe);
    res.send({ data: fullrecipe});
  } catch (error) {
    next(error);
  }
});

router.get("/search/query/:query/number/:number", async (req, res, next) => {
  try {
    const { cuisine, diet, intolerances} = req.query;
    const { query, number } = req.params;
    const search_response = await axios.get(`${api_domain}/search`, {
      params: {
        query: query,
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances,
        number: number,
        instructionsRequired: true,
        apiKey: process.env.spooncular_apiKey
      }
    });
    let recipes = await Promise.all(
      search_response.data.results.map((recipe_raw) =>
         getRecipeInfo(recipe_raw.id)
      )
    );
    let data = await preview.recipe_preview(req, recipes);
    res.send({ data: data });
  } catch (error) {
    next(error);
  }
});

async function getRecipeInfo(id) {
  let data = await axios.get(`${api_domain}/${id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey
    }
  });
  data = data.data;
  data.id = id;
  return data;
}

async function getBulkRecipes(ids) {
  let id_string = '';
  ids.forEach(id => id_string += id + ',');
  id_string = id_string.slice(0, -1); 
  let data = await axios.get(`${api_domain}/informationBulk`, {
    params: {
      ids: id_string,
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey
    }
  });
  return data;
}

async function getFullRecipe(req, recipe) {
  let recipes = [recipe]
  let data = await preview.recipe_preview(req, recipes);
  data[0].servings = recipe.servings;
  data[0].ingredients = ''; 
  recipe.extendedIngredients.forEach((ingredient) => {
    data[0].ingredients += ingredient.originalString + `   ~   `;
  });
  data[0].instructions = recipe.instructions
  return data;
}

module.exports = router;