const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
    {
        app: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            require: true,
        },
        priority: String,
        description: {
            type: String,
            required: true,
        },
        resolved: Date,
        status: String,
        assigned: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
)

ticketSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

ticketSchema.methods.getPriority = function getPriority() {
    const priority = this.priority === 'L' ? 'Low' : this.priority === 'M' ? 'Medium' : 'High'
    return priority
}

module.exports = mongoose.model('Ticket', ticketSchema)
