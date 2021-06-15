const router = require('express').Router();
const productsCtrl = require('../controllers/productsCtrl');

router.get('/', productsCtrl.getProducts);

router.post('/add', productsCtrl.createProduct);

router.get('/update/:id', productsCtrl.getProduct);

router.post('/update/:id', productsCtrl.updateProduct);

router.get('/delete/:id', productsCtrl.deleteProduct);

module.exports = router