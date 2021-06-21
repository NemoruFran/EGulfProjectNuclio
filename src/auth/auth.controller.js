const userModel = require('../users/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const user = await userModel.search({
        email: req.body.email,
    })
    if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result)  {
            const token = jwt.sign({user},process.env.TOKEN_SECRET);
            return res.json(token);
        } else  {
            return res.status(401).json("an error has occurred");
        }
    }
    return res.status(400).json('an error has occurred')
}

module.exports = {
    login,
}
