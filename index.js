const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
}); 

let rtUsers = require('./app/routers/user.router.js');
let rtAutor = require('./app/routers/autor.router.js');
let rtlibro = require('./app/routers/libro.router.js');
let rtclients = require('./app/routers/cliente.router.js');
let rttipolibro = require('./app/routers/tipolibro.router.js');
let rtPrstm = require('./app/routers/prestamo.router.js');
let rtEstado = require('./app/routers/estado.router.js');



const cors = require('cors')
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/', rtUsers);
app.use('/', rtAutor);
app.use('/', rtlibro);
app.use('/', rtclients);
app.use('/', rttipolibro);
app.use('/', rtPrstm);
app.use('/',rtEstado);

app.get("/",(req,res) => {
  
  res.json({mesage:"Bienvenido a la api de creditos"});
})


// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address;
  let port = server.address().port;
  if (host === '::' || host === '0.0.0.0') {
    host = 'localhost';
  }
  console.log("App listening at http://%s:%s", host, port); 
})
