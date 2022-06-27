const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
        },
    ],
})

userSchema.set('toJSON', {
    transform: (document, ret) => {
        console.log(ret)
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passwordHash
        console.log(ret)
    },
})

module.exports = mongoose.model('User', userSchema)
