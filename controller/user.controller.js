const {fileService} = require('../service');
module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await fileService.reader();
            res.json(users);
        }catch (e){
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const {userID} = req.params;

            const users = await fileService.reader();

            const index = users.findIndex((u) => u.id === +userID);

            users[index] = {...users[index], ...newUserInfo};

            await fileService.writer(users);

            res.status(201).json(users[index]);
        } catch (e) {
            next(e)
        }

    },
    createUser: async (req, res, next) => {
        try {
        const {name, age} = req.body;

        const users = await fileService.reader();

        const newUser = ({id: users[users.length - 1].id + 1, name, age});
        users.push(newUser);

        await fileService.writer(users);
        res.json(newUser);
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
        const {userID} = req.params;

        const users = await fileService.reader();

        const index = users.find((u) => u.id === +userID);
        users.splice(index, 1);

        await fileService.writer(users);

        res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    }
}