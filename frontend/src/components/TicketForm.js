import { useState } from 'react'

import { Form, Button } from 'react-bootstrap'
import ticketService from '../services/tickets'

const TicketForm = ({ tickets, handleAddTickets, handleErrorMessage, handleTicketMessage }) => {
    const [newTicket, setNewTicket] = useState({ app: '', description: '' })

    const handleTicket = async (event) => {
        event.preventDefault()
        try {
            const createdTicket = await ticketService.create({ app: newTicket.app, description: newTicket.description })
            console.log([...tickets, createdTicket])
            handleAddTickets(createdTicket)
            setNewTicket({ app: '', description: '' })
            handleTicketMessage('Ticket successfully Added!')
            setTimeout(() => {
                handleTicketMessage(null)
            }, 5000)
        } catch (exception) {
            handleErrorMessage('Something went wrong')
            setTimeout(() => {
                handleErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <Form onSubmit={handleTicket} className="mb-3">
            <Form.Group className="mb-3" controlid="formAppName">
                <Form.Label sm="2">App name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Example project"
                    value={newTicket.app}
                    onChange={({ target }) => setNewTicket((newTicket) => ({ ...newTicket, app: target.value }))}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlid="formDescription">
                <Form.Label sm="2">Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Describe your issue"
                    value={newTicket.description}
                    onChange={({ target }) =>
                        setNewTicket((newTicket) => ({ ...newTicket, description: target.value }))
                    }
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3">
                save ticket
            </Button>
        </Form>
    )
}

export default TicketForm
