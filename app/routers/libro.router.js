
let express = require('express');
let router = express.Router();
 
const libro = require('../controllers/controller.book.js');

router.post('/api/libro/crear', libro.create);
router.get('/api/libro/all', libro.retrieveAllbooks);
router.get('/api/libro/onebyid/:id', libro.getBookById);
router.put('/api/libro/update/:id', libro.updateById);
router.delete('/api/libro/delete/:id',libro.deleteById);

module.exports = router;