const { DataTypes } = require('sequelize');
const name_length = 50;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {

  // defino el modelo -> Dieta (Tipo de dieta)
  sequelize.define('Diet', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING(name_length),
      allowNull: false,
      unique: true,
      validate:{
        lengthValidator(value){
          if(value.length > name_length){
            throw new Error("Name too long")
          }
        }
      },
    }
  },
  {
    timestamps: false
  }
)}