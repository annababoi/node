const User = require('../DB/User')

module.exports = {
    findByParams: async (filter = {}) =>  {
        return User.find(filter);
    },
    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },
    findByIdWithCar: async (userID) => {
       const res = await User.aggregate([
            {
                $match: {
                    _id: userID
                }
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars'
                }
            }
        ]);
       return res[0];
    },
   create: async (userInfo) => {
      return User.create(userInfo);
   },
    updateOne: async (userID, newUserInfo) => {
        return User.findByIdAndUpdate(userID, newUserInfo, { new:true });
    },
   deleteOne: async (userID) => {
      return User.deleteOne({ _id: userID });
   },


}