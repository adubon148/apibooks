

module.exports = (sequelize, Sequelize) => {
	 autor = sequelize.define('autor', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },


	  Nombre: {
			type: Sequelize.STRING,
            allowNull: false
	  },
	  Nacionalidad: {
			type: Sequelize.STRING,
            allowNull: false
  	},
	  FechaNac: {
			type: Sequelize.DATEONLY,
            allowNull: false
	  }
	},{
        paranoid:true,
        freezeTableName:true
    })

 
	
	return autor;
}