const {DataTypes, db} = require('../db');

const User = db.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    watched: DataTypes.STRING
})

module.exports = {User};

