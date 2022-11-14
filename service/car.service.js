const Car = require('../DB/Car')

module.exports = {
    findByParams: async (filter = {}) =>  {
        return Car.find(filter);
    },
    findOneByParams: async (filter = {}) => {
        return Car.findOne(filter);
    },
    create: async (carInfo) => {
        return Car.create(carInfo);
    },
    updateOne: async (carID, newCarInfo) => {
        return Car.findByIdAndUpdate(carID, newCarInfo, { new:true });
    },
    deleteOne: async (carID) => {
        return Car.deleteOne({ _id: carID });
    },


}
