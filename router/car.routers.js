
const router = require('express').Router();

const carController = require('../controller/car.controller')

// const mdlwr = require('../middleware/car.middleware');


router.get('/',  carController.getAllCars);
router.post('/', carController.createCar);

router.get('/:carID', carController.getCarById);
router.put('/:carID', carController.updateCar);
router.delete('/:carID',  carController.deleteCar);


module.exports = router;