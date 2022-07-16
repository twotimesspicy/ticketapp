// Using express-async-errors in place of try/catch blocks
const ticketsRouter = require('express').Router()
const Ticket = require('../models/ticket')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

ticketsRouter.get('/', async (req, res) => {
    const tickets = await Ticket.find({}).populate('user', { username: 1, name: 1 })
    res.json(tickets)
})

ticketsRouter.get('/:id', async (req, res) => {
    const ticket = await Ticket.findById(req.params.id)
    ticket ? res.json(ticket) : res.status(404).end()
})

const getTokenFrom = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

ticketsRouter.post('/', async (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const ticket = new Ticket({
        app: body.app,
        priority: body.priority || 'L',
        description: body.description,
        user: user.id,
    })

    const savedTicket = await ticket.save()
    user.tickets = user.tickets.concat(savedTicket._id)
    await user.save()

    res.json(savedTicket)
})

ticketsRouter.delete('/:id', async (req, res) => {
    await Ticket.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

ticketsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const ticket = {
        priority: body.priority,
        description: body.description,
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, ticket, { new: true })
    res.json(updatedTicket)
})

module.exports = ticketsRouter
