
let express = require('express');
let router = express.Router();
 
const autor = require('../controllers/controller.autor.js');

router.post('/api/autor/crear', autor.create);
router.get('/api/autor/all', autor.retrieveAllautores);
router.get('/api/autor/onebyid/:id', autor.getAutorById);
router.put('/api/autor/update/:id', autor.updateById);
router.delete('/api/autor/delete/:id',autor.deleteById);

module.exports = router;