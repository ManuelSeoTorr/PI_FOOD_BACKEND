const  postRecipe  = require("../controlers/postRecipe");
const  getRecipeById  = require("../controlers/getRecipeById");
const  getRecipes  = require("../controlers/getRecipes.js");


const getRecipesHandler = async (req, res) => {
    try {
        const { name } = req.query;
        if (name) { // si tengo name llamo al controler getRecipes con name como parametro para que traiga solo las recetas con ese name
            const recipes = await getRecipes(name);
            res.status(200).json(recipes);
        } 
        else{// si no tengo name llamo al controler getRecipes para que traiga todas las recetas
            const allRecipes = await getRecipes();
            res.status(200).json(allRecipes);
        }
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const getRecipeByIdHandler = async (req, res) => {
    try {
        const {idRecipe} = req.params;
        const recipe = await getRecipeById(idRecipe);//llamo a mi controler getRecipeById para que traiga 1 receta con ese id
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const postRecipeHandler = async (req, res) => {
    try {
        const {name, summary, healthScore, steps, imgUri, diets} = req.body;
        const newRecipe = await postRecipe(name, summary, healthScore, steps, imgUri, diets);//llamo a mi controler postRecipe que carga la nueva receta a la DB
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports={
    getRecipesHandler,
    getRecipeByIdHandler,
    postRecipeHandler,
}