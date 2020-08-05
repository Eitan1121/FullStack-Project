const DButils = require("../../DB_modules/DButils");

async function recipe_preview(req, response) {
  let data = response.map((recipe) => {
    const {
      id, title, image, readyInMinutes, aggregateLikes, vegetarian, vegan, glutenFree
    } = recipe;
    return {
      id: id,
      title: title,
      image: image,
      readyInMinutes: readyInMinutes,
      aggregateLikes: aggregateLikes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
    };
  });
  if (req.session && req.session.id){
    const visited_recipes = await DButils.execQuery(`SELECT recepie_id FROM User_Visited WHERE userName='${req.user_id}'`);
    if (visited_recipes.length > 0){
      data.forEach((recipe) => {
        let isVisited = false;
        visited_recipes.forEach((id) =>{
          if(recipe.id == id.recepie_id){
            recipe.visited = true;
            isVisited = true;
          }
        });
        if(isVisited === false){
          recipe.visited = false;
        }
        // if(visited_recipes.includes(recipe.id))
        //   recipe.visited = true;
        // else
        //   recipe.visited = false;
      });
    }
    else
      data.forEach(recipe => recipe.visited = false);
    const favorites_recipes = await DButils.execQuery(`SELECT recepie_id FROM User_Favorites WHERE userName='${req.user_id}'`);
    if (favorites_recipes.length > 0){
      data.forEach((recipe) => {
        let isFavorite = false;
        favorites_recipes.forEach((id) =>{
          if(recipe.id == id.recepie_id){
            recipe.favorite = true;
            isFavorite = true;
          }
        });
        if(isFavorite === false){
          recipe.favorite = false;
        }
        // if(visited_recipes.includes(recipe.id))
        //   recipe.visited = true;
        // else
        //   recipe.visited = false;
      });
    }
    else

      data.forEach(recipe => recipe.favorite = false);
  } else {
    data.forEach(recipe => recipe.favorite = false);
    data.forEach(recipe => recipe.visited = false);
  }  
  return data;
}

async function family_preview(response) {
  let data = response.map((recipe) => {
    const {
      title, image_url, readyInMinute, recipe_owner, when_served
    } = recipe;
    return {
      title: title,
      image_url: image_url,
      readyInMinute: readyInMinute,
      recipe_owner: recipe_owner,
      when_served: when_served,
    };
  });
  return data;
}

exports.recipe_preview = recipe_preview;
exports.family_preview = family_preview;