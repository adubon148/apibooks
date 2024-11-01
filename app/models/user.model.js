module.exports = (sequelize, Sequelize) => {
	const user = sequelize.define('user', {	
	  
	  Username: {
			type: Sequelize.STRING,
			primaryKey: true
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