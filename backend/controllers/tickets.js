const ticketsRouter = require('express').Router()
const Ticket = require('../models/ticket')

ticketsRouter.get('/', (req, res) => {
  Ticket.find({}).then(tickets => {
    res.json(tickets)
  })
})

ticketsRouter.get('/:id', (req, res, next) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      if (ticket) {
        res.json(ticket)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

ticketsRouter.post('/', (req, res, next) => {
  const body = req.body

  const ticket = new Ticket({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  ticket.save()
    .then(savedTicket => {
      res.json(savedTicket)
    })
    .catch(error => next(error))
})

ticketsRouter.delete('/:id', (req, res, next) => {
  Ticket.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

ticketsRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const ticket = {
    content: body.content,
    important: body.important,
  }

  Ticket.findByIdAndUpdate(req.params.id, ticket, { new: true })
    .then(updatedTicket => {
      res.json(updatedTicket)
    })
    .catch(error => next(error))
})

module.exports = ticketsRouter
