const { Router } = require('express');
const controller = require('./controller.js'); 

const router = Router();


router.get('/', controller.getProducts);

router.get('/:id', controller.getUniqueProduct);

router.post('/postProduct', controller.postProduct);

router.put('/:id', controller.putProduct);

router.delete('/:id', controller.deleteProduct)


module.exports = router;