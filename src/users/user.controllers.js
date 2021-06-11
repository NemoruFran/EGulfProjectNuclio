const userModel = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { json } = require('body-parser');


const create = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const entities = await userModel.create ({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, salt)
    });
    const token = jwt.sign({id: entities.id},process.env.TOKEN_SECRET);
    res.status(201).json(token);

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



module.exports = {
    create,
    upDate,
}