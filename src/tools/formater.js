//le doy formato a la data traida de la API
const formater = (fullRecipe) =>{ 
    console.log("aca te formateo")
    fullRecipe.map(recipe => { 
        return {
            id: recipe.id, 
            name: recipe.title,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions[0]?.steps.map(data => data.step),
            imgUri: recipe.image,
            diets: (recipe.diets && recipe.diets.length) ? recipe.diets : ["Not specified"]
        }
    });
}

module.exports = formater;