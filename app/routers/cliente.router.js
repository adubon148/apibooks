
let express = require('express');
let router = express.Router();
 
const cliente = require('../controllers/controller.cliente.js');

router.post('/api/cliente/crear', cliente.create);
router.get('/api/cliente/all', cliente.retrieveAllclients);
router.get('/api/cliente/onebyid/:dpi', cliente.getClienteById);
router.put('/api/cliente/update/:dpi', cliente.updateById);
router.delete('/api/cliente/delete/:dpi',cliente.deleteById);

module.exports = router;