
let express = require('express');
let router = express.Router();
 
const prstm = require('../controllers/prestamo.controller.js');

router.post('/api/pretm/crear', prstm.create);
router.get('/api/pretm/all', prstm.retrieveAll);
router.get('/api/pretm/onebyid/:id', prstm.getById);
router.put('/api/pretm/update/:id', prstm.updateById);
router.delete('/api/pretm/delete/:id',prstm.deleteById);

module.exports = router;