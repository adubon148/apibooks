module.exports = (sequelize, Sequelize) => {
	const cliente = sequelize.define('cliente', {	
	  dpi: {
			type: Sequelize.INTEGER,
			primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING
	  },
	  apellido: {
			type: Sequelize.INTEGER
  	},
	  edad: {
			type: Sequelize.INTEGER
	  },
	  direccion: {
			type: Sequelize.STRING
	  }
      ,
	  Nacionalidad: {
			type: Sequelize.STRING
	  },
	  telefono: {
			type: Sequelize.INTEGER
	  },
	  email: {
			type: Sequelize.STRING
	  },
	  estadocivil: {
			type: Sequelize.STRING
	  },
	  nit: {
			type: Sequelize.INTEGER
	  }
},{
    paranoid: true,
    freezeTableName: true
})

return cliente;
}