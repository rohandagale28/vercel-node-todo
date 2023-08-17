const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    check: {
        type: Boolean,
        required: true
    },
    task: {
        type: String,
        require: true
    }
})

//create schema in mongoDB
const User = mongoose.model('task', userSchema)
console.log(User)

module.exports = User