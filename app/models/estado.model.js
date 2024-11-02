module.exports = (sequelize, Sequelize) => {
	const estado = sequelize.define('estado', {	
	  
	id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
            autoIncrement:true
	},
	  estado: {
			type: Sequelize.STRING
  	},
	  descripcion: {
			type: Sequelize.STRING
	  }
	},{
		paranoid: true,
		freezeTableName: true
	});
	
	return estado;
}