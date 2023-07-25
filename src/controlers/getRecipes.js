const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;

const getRecipes = async (name) => {
  let recipesDB;
  let filteredRecipesAPI;
  const allRecipesAPI = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`
    // "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
  ); //traigo 100 recetas de la API

  if (name) {
    recipesDB = await Recipe.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [
        {
          model: Diet,
          attributes: ["name"], //solo se incluirá la propiedad "name" del modelo "Diet"
          through: { attributes: [] }, //evita incluir las relaciones asociadas
        },
      ],
    }); // busco coincidencias en mi DB
    filteredRecipesAPI = allRecipesAPI.data.results.filter((recipe) =>
      recipe.title.toLowerCase().includes(name.toLowerCase())
    ); // busco coincidencias en mi API
  } else {
    recipesDB = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"], //solo se incluirá la propiedad "name" del modelo "Diet"
          through: { attributes: [] }, //evita incluir las relaciones asociadas
        },
      ],
    }); //traigo todo de mi DB
    filteredRecipesAPI = allRecipesAPI.data.results; //traigo todo de mi API
  }

  //le doy formato a la data traida de la API
  const recipesAPI = filteredRecipesAPI.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary?.replace(/<\/?[^>]+(>|$)/g, ""),
      healthScore: recipe.healthScore,
      steps: recipe.analyzedInstructions[0]?.steps.map((data) => data.step),
      imgUri: recipe.image,
      diets:
        recipe.diets && recipe.diets.length ? recipe.diets : ["Not specified"],
    };
  });

  const allRecipes = [...recipesAPI, ...recipesDB];

  if (!allRecipes.length) throw new Error("Recipes not found");

  return allRecipes;
};
module.exports = getRecipes;
