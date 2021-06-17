const userModel = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { json } = require('body-parser');
const { validationResult } = require("express-validator");


const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const salt = bcrypt.genSaltSync(10);
    const entities = await userModel.create ({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, salt)
    });
    const token = jwt.sign({id: entities.id},process.env.TOKEN_SECRET);
    res.status(201).json({'token':token});

}


const upDate = async (req, res)  =>{
    const user = await userModel.upDate(req.params.id);
    const id = (req.params.id);
    if (user)  {
        const body = req.body;
        userModel.upDate(id, body);
        return res.status(200).json(body);
    }
    return res.status(404).json({ error: "user not fount" });
}

const get = async (req, res) => {
    const user = await userModel.get(req.params.id);
    const id = (req.params.id)
    if (user)  {
        return res.status(200).json(user);
    }
    return res.status(404).json({error: "user not found"})
}


module.exports = {
    create,
    upDate,
    get,
}