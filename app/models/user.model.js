module.exports = (sequelize, Sequelize) => {
	const user = sequelize.define('user', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Username: {
			type: Sequelize.STRING
	  },
	  password: {
			type: Sequelize.STRING
  	},
	  nombre: {
			type: Sequelize.STRING
	  }
	});
	
	return user;
}