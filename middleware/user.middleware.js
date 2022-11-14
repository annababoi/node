const {fileService} = require("../service");
const ApiError = require("../error/ApiError")


module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userID} = req.params;

            const users = await fileService.reader();

            const user = users.find((u) => u.id === +userID);

            if (!user) {
                throw  new ApiError ('User not found', 503);
            }
                req.users = users;
                req.user = user;
                next();
        } catch (e) {
            next(e)
        }
    },

}