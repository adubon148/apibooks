module.exports = (sequelize, Sequelize) => {
	const Prestamo = sequelize.define('prestamo', {	
	  id: {
			type: Sequelize.INTEGER,
			primaryKey: true
    },
	  fechaprestamo: {
			type: Sequelize.DATEONLY
	  },
	  estado: {
			type: Sequelize.STRING
  	},
	  idlibro: {
			type: Sequelize.INTEGER,
			references: {
				model: 'book', // Nombre del modelo relacionado
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
	  },
	  idcliente: {
			type: Sequelize.INTEGER,
			references: {
				model: 'cliente', // Nombre del modelo relacionado
				key: 'dpi'
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
	  },
	  userid: {
			type: Sequelize.STRING,
			references: {
				model: 'user', // Nombre del modelo relacionado
				key: 'Username'
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
	  }
},{
    paranoid: true,
    freezeTableName: true
})

return Prestamo;
}