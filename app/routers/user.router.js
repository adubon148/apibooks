
let express = require('express');
let router = express.Router();
 
const users = require('../controllers/controller.users.js');

router.post('/api/users/crear', users.create);
router.get('/api/users/all', users.retrieveAllUsers);
router.get('/api/users/onebyid/:Username', users.getUserById);
router.put('/api/users/update/:Username', users.updateById);
router.delete('/api/users/delete/:Username',users.deleteById);

module.exports = router;