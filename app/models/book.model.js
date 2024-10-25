module.exports = (sequelize, Sequelize) => {
	const libro = sequelize.define('book', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Titulo: {
			type: Sequelize.STRING
	  },
	  AñoPublicacion: {
			type: Sequelize.INTEGER
  	},
	  descrpcion: {
			type: Sequelize.STRING
	  },
	  autorId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'autor', // Nombre del modelo relacionado
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'

    }, tipoid: {
        type: Sequelize.INTEGER,
        references: {
            model: 'tipolibro', // Nombre del modelo relacionado
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'

    }
},{
    paranoid: true,
    freezeTableName: true
})

return libro;
}