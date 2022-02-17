const express = require('express');
const usersController = require('../controllers/usersController');
const {userRequeriments} = require('../Validate_schema/schemaRequeriments')
const validator = require('express-joi-validation').createValidator();

const routes = (User) => {
    const userRouter = express.Router();

    const {
        getUsers,
        getUserById,
        createUser,
        updateUserById,
        loginUser,
        deleteUser,
        getUserByName,
        getUserByUsername } = usersController(User);

    userRouter.route('/users')
        .get(getUsers)
        .post(validator.body(userRequeriments), createUser)

    userRouter.route('/login')
        .post(loginUser)
        
    userRouter.route('/users/searchByUsername')
        .get(getUserByUsername)

    userRouter.route('/users/:userId')
        .get(getUserById)
        .put(updateUserById)
        .delete(deleteUser)
    
    
    return userRouter;
}
module.exports = routes;