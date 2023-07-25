const axios = require("axios");
const { API_KEY } = process.env;
const { Diet } =require("../db");

const getDiets = async () => {
    const allDiets = await Diet.findAll() //traigo todas las diets en mi DB 
    return allDiets;
};

const setDiets = async () => {
    // try {
    //     const {data} = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`) //traigo 100 recetas de la API
    //     const filteredDiets = data.results.map(({diets})=> diets )//armo un array con los arrays de las diets
    //     const uniqueDiets = new Set (filteredDiets.flat())//new Set no permite duplicados, el flat une los arrays
    //     const dietsObj =[...uniqueDiets].map((diet) => ({ name: diet }));//mapeo para agregarle la propiedad name
    //     await Diet.bulkCreate(dietsObj);
    //     return dietsObj;
    // } catch (error) {
    //     console.log(error.message);    
    // }
    try {
        const allDiets = await Diet.findAll()
        if(allDiets.length) return;
        const {data} = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`) //traigo 100 recetas de la API
        const filteredDiets = data.results.map(({diets})=> diets )//armo un array con los arrays de las diets
        const uniqueDiets = new Set (filteredDiets.flat())//new Set no permite duplicados, el flat une los arrays
        uniqueDiets.forEach(diet => {
            Diet.findOrCreate ({
                where: {name:diet}
            })
        });
        const dietsObj = await Diet.findAll();
        console.log(dietsObj);
        return dietsObj;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getDiets,
    setDiets
}