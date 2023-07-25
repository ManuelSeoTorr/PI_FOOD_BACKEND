const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
const { API_KEY } = process.env;


const isUUID = (id) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(id);
};
const getRecipeById = async (idRecipe) => {
  let recipeId;
  if (!isNaN(idRecipe)) {
    //verifico si la id es un nro busco en la API(numero)
    const { data } = await axios(
       `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`
      // "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
    );
    recipeId = {
      id: data.id,
      name: data.title,
      summary: data.summary?.replace(/<\/?[^>]+(>|$)/g, ""),
      healthScore: data.healthScore,
      steps: data.analyzedInstructions[0]?.steps.map((data) => data.step),
      imgUri: data.image,
      diets: data.diets && data.diets.length ? data.diets : ["Not specified"],
    };
  } else if (isUUID(idRecipe)) {
    //verifico si la id es un UUID busco en la DB(UUID)
    recipeId = await Recipe.findByPk(idRecipe, {
      include: [
        {
          model: Diet,
          attributes: ["name"], //solo se incluirá la propiedad "name" del modelo "Diet"
          through: { attributes: [] }, //evita incluir las relaciones asociadas
        },
      ],
    });
    
    // recipeId.diets = recipeId.diets.map((diet) => diet.name);
  } else throw new Error("Id invalid");
  // const dietsRecipeId = recipeId.toJSON().Diets.map((diet) => diet.name)
  // recipeId.Diets = dietsRecipeId;


  if (!recipeId) throw new Error("Recipe not found");
  return recipeId;
};

module.exports = getRecipeById;
