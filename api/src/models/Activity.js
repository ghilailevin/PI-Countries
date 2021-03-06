const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
        type: DataTypes.STRING,
    },

    difficult: {
        type: DataTypes.STRING,
    },
    
    duration: {
        type: DataTypes.STRING
    },

    season: {
        type: DataTypes.STRING,
    }
  });
};