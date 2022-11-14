const {carService} = require('../service');


module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findByParams();
            res.json(cars);
        }catch (e){
            next(e)
        }
    },
    getCarById: async (req, res, next) => {
        try {
            const car = await carService.findOneByParams();
            res.json(car);
        } catch (e) {
            next(e)
        }
    },
    updateCar: async (req, res, next) => {
        try {
            const newCarInfo = req.body;
            const {carID} = req.params;

            const car = await carService.updateOne(carID, newCarInfo);

            res.status(201).json(car);
        } catch (e) {
            next(e)
        }

    },
    createCar: async (req, res, next) => {
        try {
            const car = await carService.create(req.body)
            res.status(201).json(car);
        } catch (e) {
            next(e)
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const {carID} = req.params;
            await carService.deleteOne(carID);

            res.sendStatus(204).send('deleted');
        } catch (e) {
            next(e)
        }
    }
}