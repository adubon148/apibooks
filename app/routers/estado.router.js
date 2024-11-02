
let express = require('express');
let router = express.Router();
 
const estado = require('../controllers/controller.estado');

router.post('/api/pretm/crear', estado.create);
router.get('/api/pretm/all', estado.retrieveAllestados);
router.get('/api/pretm/onebyid/:id', estado.getById);
router.put('/api/pretm/update/:id', estado.updateById);
router.delete('/api/pretm/delete/:id',estado.deleteById);

module.exports = router;