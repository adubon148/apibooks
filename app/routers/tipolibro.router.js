
let express = require('express');
let router = express.Router();
 
const tipolibro = require('../controllers/controller.tipolibro.js');

router.post('/api/tipolibro/crear', tipolibro.create);
router.get('/api/tipolibro/all', tipolibro.retrieveAlltipos);
router.get('/api/tipolibro/onebyid/:id', tipolibro.gettipoLibroById);
router.put('/api/tipolibro/update/:id', tipolibro.updateById);
router.delete('/api/tipolibro/delete/:id',tipolibro.deleteById);

module.exports = router;