import { useState, useEffect } from 'react'
import Ticket from './components/Ticket'
import ticketService from './services/tickets'
import loginService from './services/login'

// import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const App = () => {
    const [tickets, setTickets] = useState([])
    const [newTicket, setNewTicket] = useState({ app: '', description: '' })
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [ticketMessage, setTicketMessage] = useState(null)

    useEffect(() => {
        ticketService.getAll().then((tickets) => setTickets(tickets))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedTicketappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            ticketService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedTicketappUser', JSON.stringify(user))
            ticketService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleTicket = async (event) => {
        event.preventDefault()
        try {
            const ticket = await ticketService.create({ app: newTicket.app, description: newTicket.description })
            setTickets([...tickets, ticket])
            setNewTicket({ app: '', description: '' })
            setTicketMessage('Ticket successfully Added!')
            setTimeout(() => {
                setTicketMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('Something went wrong')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => {
        return (
            <Form onSubmit={handleLogin}>
                <Form.Group as={Row} className="mb-3" controlid="formUsername">
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlid="formPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <button type="submit">login</button>
                </Form.Group>
            </Form>
        )
    }

    const ticketForm = () => {
        return (
            <Form onSubmit={handleTicket} className="mb-3">
                <Form.Group as={Row} className="mb-1" controlid="formAppName">
                    <Form.Label column sm="2">
                        App name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            placeholder="Example project"
                            value={newTicket.app}
                            onChange={({ target }) =>
                                setNewTicket((newTicket) => ({ ...newTicket, app: target.value }))
                            }
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlid="formDescription">
                    <Form.Label column sm="2">
                        Description
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={newTicket.description}
                            onChange={({ target }) =>
                                setNewTicket((newTicket) => ({ ...newTicket, description: target.value }))
                            }
                        />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    save ticket
                </Button>
            </Form>
        )
    }

    return (
        <div className="container">
            <Notification message={errorMessage} />
            <Notification message={ticketMessage} />

            {user === null ? (
                <div>
                    <h2>log in to the application</h2>
                    {loginForm()}
                </div>
            ) : (
                <div>
                    <p>{user.name} logged in</p>
                    {ticketForm()}
                </div>
            )}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>App name</th>
                        <th>Issue</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <Ticket key={ticket.id} ticket={ticket} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const Notification = ({ message }) => {
    if (message) {
        return (
            <div>
                <li className="error">{message}</li>
            </div>
        )
    }
}

export default App
