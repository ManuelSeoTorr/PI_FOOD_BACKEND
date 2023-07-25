const { getDiets } = require("../controlers/getDiets");

const getDietsHandler = async (req, res) => {
    try {
        const allDiets = await getDiets();
        res.status(200).json(allDiets);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = getDietsHandler;