
let express = require('express');
let router = express.Router();
 
const prstm = require('../controllers/prestamo.controller');

router.post('/api/libro/crear', prstm.create);
router.get('/api/libro/all', prstm.retrieveAll);
router.get('/api/libro/onebyid/:id', prstm.getById);
router.put('/api/libro/update/:id', prstm.updateById);
router.delete('/api/libro/delete/:id',prstm.deleteById);

module.exports = prstm;