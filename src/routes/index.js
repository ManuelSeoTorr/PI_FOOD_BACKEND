const { Router } = require('express');


//Importar los controlers;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require("./recipesRouter");
const dietsRouter = require("./dietsRouter");

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use("/recipes",recipesRouter);
mainRouter.use("/diets",dietsRouter);


module.exports = mainRouter;
