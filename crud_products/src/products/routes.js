const { Router } = require('express');
const controller = require('./controller.js'); 

const router = Router();


router.get('/', controller.getProducts);

router.get('/:id', controller.getUniqueProduct);


module.exports = router;