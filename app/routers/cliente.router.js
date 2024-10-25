
let express = require('express');
let router = express.Router();
 
const cliente = require('../controllers/controller.cliente.js');

router.post('/api/cliente/crear', cliente.create);
router.get('/api/cliente/all', cliente.retrieveAllclients);
router.get('/api/cliente/onebyid/:id', cliente.getClienteById);
router.put('/api/cliente/update/:id', cliente.updateById);
router.delete('/api/cliente/delete/:id',cliente.deleteById);

module.exports = router;