const express = require('express')

const users =require('../models/User')

const router = express.Router()


const {
    registerUser,
    loginUser
}=require("../controllers/usercontroller")


router.get('/',loginUser)


router.post('/',registerUser)


module.exports = router