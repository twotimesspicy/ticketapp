const ticketsRouter = require('express').Router()
const Ticket = require('../models/ticket')

ticketsRouter.get('/', async (req, res) => {
    const tickets = await Ticket.find({})
    res.json(tickets)
})

ticketsRouter.get('/:id', async (req, res, next) => {
    const ticket = await Ticket.findById(req.params.id)
    ticket ? res.json(ticket) : res.status(404).end()
})

ticketsRouter.post('/', async (req, res, next) => {
    const body = req.body
    const ticket = new Ticket({
        app: body.app,
        priority: body.priority || 'L',
        description: body.description
    })

    const savedTicket = await ticket.save()
    res.json(savedTicket)
})

ticketsRouter.delete('/:id', async (req, res, next) => {
    await Ticket.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

ticketsRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const ticket = {
        priority: body.priority,
        description: body.description
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, ticket, { new: true })
    res.json(updatedTicket)
})

module.exports = ticketsRouter
