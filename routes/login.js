const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require ('../controllers/login');
const { fieldsValidator } = require('../middlewares/filedsValidatos');

const router = Router();

router.post( '/', [
    check( 'username', 'El username no es valido').not().isEmpty(),
    check('password', 'La password es requerida').not().isEmpty(),
    fieldsValidator
],
login );

module.exports = router;