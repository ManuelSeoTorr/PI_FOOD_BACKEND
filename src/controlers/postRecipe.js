const { Recipe } = require("../db");


const postRecipe = async (name, summary, healthScore, steps, imgUri, diets) => {
    if( !name || !summary || !healthScore || !steps || !imgUri || !diets){
        throw new Error("Missing data")
    }
    const [newRecipe] = await Recipe.findOrCreate({
        where:{
            name
        }
        ,defaults:{summary, healthScore, steps, imgUri}
    });
    await newRecipe.addDiets(diets)
    console.log(newRecipe);
    return  newRecipe;
};

module.exports = postRecipe;