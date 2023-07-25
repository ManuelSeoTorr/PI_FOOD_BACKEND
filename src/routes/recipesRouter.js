const { Router } = require("express");

const {getRecipesHandler, postRecipeHandler, getRecipeByIdHandler} = require("../handlers/recipesHandlers");

const recipesRouter = Router();

recipesRouter.get("/", getRecipesHandler);

recipesRouter.get("/:idRecipe", getRecipeByIdHandler);

recipesRouter.post("/", postRecipeHandler);


module.exports = recipesRouter;

