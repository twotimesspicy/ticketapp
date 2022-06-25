const http = require('http')
const express = require ('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)
    .then(result => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB', error.message))

const ticketSchema = new mongoose.Schema({
    app: String,
    user: Number,
    priority: String,
    description: String,
    created: Date,
    resolved: Date,
    status: String,
    assigned: Number
})

ticketSchema.methods.getPriority = function getPriority() {
    const priority = this.priority === 'L' ? "Low"
        : this.priority === 'M' ? "Medium"
        : "High"
    return priority
}

ticketSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

app.use(cors())
app.use(express.json())

app.get('/api/tickets', (req, res) => {
    Ticket
        .find({})
        .then(tickets => {
            res.json(tickets)
        })
})

app.post('/api/tickets', (req, res) => {
    const ticket = new Ticket(req.body)

    ticket
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})

const PORT = config.PORT

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})
