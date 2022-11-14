const {userService} = require('../service');
const User = require ('../DB/User');
const oauthService = require("../service/oauth.service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findByParams();
            res.json(users);
        }catch (e){
            next(e)
        }
    },
    // getUserById: async (req, res, next) => {
    //     try {
    //         res.json(req.user);
    //     } catch (e) {
    //         next(e)
    //     }
    // },
    getUserByIdWithCars: async (req, res, next) => {
        try {
            const user = await userService.findByIdWithCar(req.user._id);
            res.json(user);
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const {userID} = req.params;

           const user = await userService.updateOne(userID, newUserInfo);

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }

    },
    createUser: async (req, res, next) => {
        try {

            const hashPassword = await oauthService.hashPassword(req.body.password)

        await userService.create({...req.body, password:hashPassword});

            res.status(201).json('ok');
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {

        await userService.deleteOne(req.params.userID);

        res.sendStatus(204).send('ok');
        } catch (e) {
            next(e)
        }
    }
}