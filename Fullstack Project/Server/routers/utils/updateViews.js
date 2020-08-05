const DButils = require("../../DB_modules/DButils");

async function updateViews(req, response) {
  try {
    if (req.session && req.session.id){
      let visited_recipe = await DButils.execQuery(
        `SELECT * FROM User_Visited 
          WHERE userName='${req.user_id}' AND recepie_Id='${req.query.recipe_id}'`
      );
      if (visited_recipe.length == 0){
        await DButils.execQuery(
          `INSERT INTO User_Visited VALUES ('${req.user_id}', '${req.query.recipe_id}')`
        );
      }
      let last_visited = await DButils.execQuery(
        `SELECT * FROM User_Last_Visited 
          WHERE userName='${req.user_id}'`
      );
      if (last_visited.length == 0) {
        await DButils.execQuery(
          `INSERT INTO User_Last_Visited 
            VALUES ('${req.user_id}', '${req.query.recipe_id}', null, null)`
        );
      } else {
        if (last_visited[0].recepie_Id_2 == null) {
          if (!(last_visited[0].recepie_Id_1 == req.query.recipe_id)){
            await DButils.execQuery(
              `UPDATE User_Last_Visited 
                SET recepie_Id_1='${req.query.recipe_id}',
                recepie_Id_2='${last_visited[0].recepie_Id_1}',
                recepie_Id_3=null
                WHERE userName='${req.user_id}'`
            );
          }
        } else {
          if (!(last_visited[0].recepie_Id_1 == req.query.recipe_id || last_visited[0].recepie_Id_2 == req.query.recipe_id)){
            await DButils.execQuery(
              `UPDATE User_Last_Visited 
                SET recepie_Id_1='${req.query.recipe_id}',
                recepie_Id_2='${last_visited[0].recepie_Id_1}',
                recepie_Id_3='${last_visited[0].recepie_Id_2}'
                WHERE userName='${req.user_id}'`
            );
          }
        }
      }
    } 
  } catch (error) {
    next(error);
	}
}

exports.updateViews = updateViews;