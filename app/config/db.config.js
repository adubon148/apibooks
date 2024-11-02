const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.autor = require('../models/autor.models.js')(sequelize, Sequelize);
db.book = require('../models/book.model.js')(sequelize, Sequelize);
db.cliente = require('../models/cliente.models.js')(sequelize, Sequelize);
db.tipolibro = require('../models/tipoLibro.model.js')(sequelize, Sequelize);
db.Prestamo = require('../models/Prestamo.model.js')(sequelize, Sequelize);
db.estado = require('../models/estado.model.js')(sequelize, Sequelize);

module.exports = db;