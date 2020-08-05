var express = require("express");
var router = express.Router();
const axios = require("axios");
const preview = require("./utils/preview");
const DButils = require("../DB_modules/DButils");

const api_domain = "https://api.spoonacular.com/recipes";

router.use(function requireLogin(req, res, next) {
  if (!req.user_id) {
    next({ status: 401, message: "unauthorized" });
  } else {
    next();
  }
});

router.get("/last", async (req, res, next) => {
  try {
    const last_visited = await DButils.execQuery(`SELECT * FROM User_Last_Visited WHERE userName='${req.user_id}'`);
    if (last_visited.length == 0){
      res.status(200).send('No recepies viewed');
    } 
    else {
      let ids;
      if (last_visited[0].recepie_Id_2 == null) {
        ids = [last_visited[0].recepie_Id_1];
      } else if (last_visited[0].recepie_Id_3 == null) {
        ids = [last_visited[0].recepie_Id_1, last_visited[0].recepie_Id_2];
      } else {
        ids = [last_visited[0].recepie_Id_1, last_visited[0].recepie_Id_2, last_visited[0].recepie_Id_3];
      }
      let last_response = await getBulkRecipes(ids);
      let data = await preview.recipe_preview(req, last_response.data);
      res.status(200).send({data: data});
    }
  }
  catch(error) {
    next (error)
  }
});

router.post("/favorites", async (req, res, next) => {
  try {
    const recipeID = req.body.recipe;
    const is_favorite = await DButils.execQuery(`
    SELECT * FROM User_Favorites 
    WHERE userName='${req.user_id}' AND recepie_Id=${recipeID}
    `);
    if(is_favorite.length == 0) {
      await DButils.execQuery(`INSERT INTO User_Favorites VALUES ('${req.user_id}', ${recipeID})`);
      res.status(200).send('Added to favorites');
    }else {
      res.status(200).send('Already in favorites');
    }
  }   catch (error) {
    next(error);
  }
});

router.get("/favorites", async (req, res, next) => {
  try {
    const favorites = await DButils.execQuery(`
    SELECT * FROM User_Favorites 
    WHERE userName='${req.user_id}'
    `);
    if(favorites.length == 0) {
      res.status(204).send('There is no favorites');
    }else {
      let ids = [];
      favorites.forEach(row => {
        ids.push(row.recepie_Id);
      })
      let last_response = await getBulkRecipes(ids);
      let data = await preview.recipe_preview(req, last_response.data);
      res.status(200).send({data: data});
    }
  }   catch (error) {
    next(error);
  }
});

router.get("/family", async (req, res, next) => {
  try {
    const family = await DButils.execQuery(`
    SELECT * FROM Family_Recipes 
    WHERE userName='${req.user_id}'
    `);
    if(family.length == 0) {
      res.status(204).send('There is no family recipes');
    } else {
      let data = await preview.family_preview(family);
      res.status(200).send({data: data});
    }
  } catch (error) {
    next(error);
  }
});

router.get("/family/full", async (req, res, next) => {
  try {
    const title = req.query.title;
    const family = await DButils.execQuery(`
    SELECT * FROM Family_Recipes 
    WHERE userName='${req.user_id}' AND title='${title}'
    `);
    if(family.length == 0) {
      res.status(204).send(`There is no recipe called ${title}`);
    } else {
      res.status(200).send({data: family});
    }
  } catch (error) {
    next(error);
  }
});

router.get("/private", async (req, res, next) => {
  try {
    const private = await DButils.execQuery(`
    SELECT * FROM Private_Recipes 
    WHERE userName='${req.user_id}'
    `);
    if(private.length == 0) {
      res.status(204).send('There is no private recipes');
    } else {
      let data = await preview.recipe_preview(req, private);
      res.status(200).send({data: data});
    }
  } catch (error) {
    next(error);
  }
});

router.get("/private/full", async (req, res, next) => {
  try {
    const title = req.query.title;
    const private = await DButils.execQuery(`
    SELECT * FROM Private_Recipes 
    WHERE userName='${req.user_id}' AND title='${title}'
    `);
    if(private.length == 0) {
      res.status(204).send(`There is no recipe called ${title}`);
    } else {
      res.status(200).send({data: private});
    }
  } catch (error) {
    next(error);
  }
});

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

module.exports = router;
