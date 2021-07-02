const User = require('../models/user')

const createUser = async (req, res) => {
    let user = new User(req.body)
    try {
        let newUser = await create(user)
        res.status(200).json({"message":"success","user":newUser})
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// Updating One
const updateUser = async (req, res) => {
    try {
        // if (role === 1) {
            let updatedUser = await update(req.params.id, req.body)
            res.status(200).send({"message":"updated","user":updatedUser})
        // } else {
        //     res.status(400).json({
        //         'message': 'Sorry,you dont have authorization to access this'
        //     })
        // }
    } catch (error) {
        return res.status(400).json({
            message: err.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).send("NOT FOUND")
        }
        res.status(200).send({"message":"get by id","user":user})
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).send("NOT FOUND")
        }else{
            User.findByIdAndRemove(req.params.id).then((found) =>{
                res.status(200).send({"message":"successfully deleted","user":found})
            })
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const getAllUser = (req, res) => {
    // let {
    //     role
    // } = req.userData
    // if (role === 2 || role === 3) {
        User.find({}).then((data) => {
            res.status(200).json({
                'message': 'list all user',
                'data': data
            })
        })
    // } else {
    //     res.status(400).json({
    //         'message': 'Sorry,you dont have authorization to access this'
    //     })
    // }
}

//internal function
async function create(user) {
    return user.save()
}

async function update(id, body) {
    const user = await User.findById(id)

    if (body.email != null) {
        user.email = body.email
    }
    if (body.name != null) {
        user.name = body.name
    }
    if (body.jobFamily != null) {
        user.jobFamily = body.jobFamily
    }
    if (body.grade != null) {
        user.grade = body.grade
    }
    if (body.dateOfBirth != null) {
        user.dateOfBirth = body.dateOfBirth
    }
    if (body.role_id != null) {
        user.role_id = body.role_id
    }

    return user.save()
}

module.exports = {
    //module
    createUser,updateUser,getAllUser,getUserById,deleteUserById,
    //function
    create,update
}