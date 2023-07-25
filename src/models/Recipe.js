const { DataTypes } = require('sequelize');
const name_length = 50;
const summary_length = 600;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('Recipe', {
    //id de las nuevas recetas
    id:{
      type: DataTypes.UUID, //crea un id unica
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    //nombre de las nuevas recetas
    name: {
      type: DataTypes.STRING(name_length),
      allowNull: false,
      validate:{
        lengthValidator(value){
          if(value.length > name_length){
            throw new Error("Name too long")
          }
        }
      },
    },
    // resumen del plato de las nuevas recetas
    summary:{
      type: DataTypes.STRING(summary_length),
      allowNull: false,
      validate: {
        lengthValidator(value){
          if(value.length > summary_length){
            throw new Error("Sumary too long")
          }
        }
      }
    },
    // nivel de comida saludable de las nuevas recetas
    healthScore:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        rangeValidator(value){
          if(value > 100 || value < 0){
            throw new Error("HealthScore invalid")
          }
        }
      }
    },
    // paso a paso de las nuevas recetas
    steps:{
      type: DataTypes.ARRAY(DataTypes.STRING), //es un array de strings
      allowNull: false,
    },
    // imagen de las nuevas recetas
    imgUri: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        isJPGFile(value) {
          if (!/\.(jpg|jpeg|png|gif|bmp)$/.test(value)) {//verifico que sea un archivo .jpg, jpeg,png, gif o bmp
            throw new Error("Only image files are allowed");
          }
        },
      } 
    },
  },{
    timestamps: false
    }
  );
};
