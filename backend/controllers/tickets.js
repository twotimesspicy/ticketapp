const ticketsRouter = require('express').Router()
const Ticket = require('../models/ticket')

ticketsRouter.get('/', async (req, res) => {
    const tickets = await Ticket.find({})
    res.json(tickets)
})

ticketsRouter.get('/:id', async (req, res, next) => {
//   Ticket.findById(req.params.id)
//     .then(ticket => {
//       if (ticket) {
//         res.json(ticket)
//       } else {
//         res.status(404).end()
//       }
//     })
//     .catch(error => next(error))
    try {
        const ticket = await Ticket.findById(req.params.id)
        ticket ? res.json(ticket) : res.status(404).end()
    } catch (error) {
        next(error)
    }
})

ticketsRouter.post('/', async (req, res, next) => {
    const body = req.body

    const ticket = new Ticket({
        app: body.app,
        priority: body.priority || 'L',
        description: body.description
    })
    try {
        const savedTicket = await ticket.save()
        res.json(savedTicket)
    } catch (error) {
        next(error)
    }
})

ticketsRouter.delete('/:id', async (req, res, next) => {
    try {
        await Ticket.findByIdAndRemove(req.params.id)
        res.status(204).end()
    }
    catch {
        next(error)
    }

})

ticketsRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const ticket = {
        priority: body.priority,
        description: body.description
    }

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, ticket, { new: true })
        res.json(updatedTicket)
    }
    catch {
        next(error)
    }
})

module.exports = ticketsRouter
