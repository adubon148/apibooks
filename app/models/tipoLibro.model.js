

module.exports = (sequelize, Sequelize) => {
    tipolibro = sequelize.define('tipolibro', {	
     id: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true
   },


     tipo: {
           type: Sequelize.STRING,
           allowNull: false
     },
     descripcion: {
           type: Sequelize.STRING,
           allowNull: false
     },
     preciorenta: {
           type: Sequelize.INTEGER,
           allowNull: false
     }
   },{
       paranoid:true,
       freezeTableName:true
   })


   
   return tipolibro;
}