const { Router } = require('express');
const { qr } = require ('../controllers/qr');

const router = Router();

router.post( '/', [], qr );

module.exports = router;