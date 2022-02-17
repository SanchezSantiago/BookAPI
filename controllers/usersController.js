const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usersController = (User) => {

    const getUsers = async (req, res) => {
        const {query} = req;
        const response = await User.find(query);

        res.json(response);
    }
    const createUser = async (req, res) => {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 10);

        await user.save();

        res.json(user);
    }

    const getUserById = async (req, res) => {
        const {params} = req;
        const response = await User.findById(params.userId);

        res.json(response);
    }

    const updateUserById = async (req, res) => {
        const {body} = req;
        const response = await User.updateOne({
            _id: req.params.userId
        }, {
            $set: {
                firstName: body.firstName,
                lastName: body.lastName,
                userName: body.userName,
                password: await bcrypt.hash(body.password, 10),
                email: body.email,
                address: body.address,
                phone: body.phone
            }
        });
        res.json(response);
    }

    const loginUser = async (req, res) => {
        const {body} = req;
        var response;

        const user = await User.findOne({
            userName: body.userName
        });

        if (user && bcrypt.compare(body.password, user.password)) {
            const token = generateToken(user);
            response = {
                message: `Welcome, ${user.userName}!`,
                token: token
            };
        } else {
            response = {
                message: 'Invalid credentials!'
            };
        }

        res.json(response);
    }

    const generateToken = user => {
        const tokenPayload = {
            firstName: user.firstName,
            userName: user.userName,
            lastName: user.lastName
        }

        return jwt.sign(tokenPayload, process.env.SECRET);
    }

    const deleteUser = async (req, res) => {
        const id = req.params.userId;

        await User.findByIdAndDelete(id);
        res.status(202).json('The user has been deleted!');
    }

    const getUserByUsername = async (req, res) => {
        const {query} = req;
        const response = await User.find(query);
        res.json(response);
    }
    return {
        getUsers,
        getUserById,
        createUser,
        updateUserById,
        loginUser,
        deleteUser,
        getUserByUsername
    };
}

module.exports = usersController;