
let express = require('express');
let router = express.Router();
 
const estado = require('../controllers/controller.estado');

router.post('/api/estado/crear', estado.create);
router.get('/api/estado/all', estado.retrieveAllestados);
router.get('/api/estado/onebyid/:id', estado.getById);
router.put('/api/estado/update/:id', estado.updateById);
router.delete('/api/estado/delete/:id',estado.deleteById);

module.exports = router;