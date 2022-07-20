import { useState, useEffect } from 'react'
import TicketList from './components/TicketList'
import ticketService from './services/tickets'
import loginService from './services/login'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import TicketForm from './components/TicketForm'

import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const App = () => {
    const [tickets, setTickets] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [ticketMessage, setTicketMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    // Populate the tickets stateful array
    useEffect(() => {
        ticketService.getAll().then((tickets) => setTickets(tickets))
    }, [])

    // If user is logged in, store user token
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

    const loginForm = () => {
        return (
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-1" controlid="formUsername">
                    <Form.Label sm="2">Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlid="formPassword">
                    <Form.Label sm="2">Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mb-3">
                    login
                </Button>
            </Form>
        )
    }

    const handleAddTickets = (createdTicket) => setTickets([...tickets, createdTicket])
    const handleErrorMessage = (message) => setErrorMessage(message)
    const handleTicketMessage = (message) => setTicketMessage(message)
    const handleLogOut = () => {
        setUser(null)
        window.localStorage.clear()
    }
    return (
        <div>
            <Notification message={errorMessage} />
            <Notification message={ticketMessage} />
            {user === null ? (
                <Container className="mt-2">
                    <Row>
                        <h2>log in to the application</h2>
                    </Row>

                    <Row> {loginForm()}</Row>
                </Container>
            ) : (
                <Navigation user={user} handleLogOut={handleLogOut} />
            )}
            <Container>
                <h1>Issue Tracker</h1>
                {user !== null && (
                    <TicketForm
                        tickets={tickets}
                        handleAddTickets={handleAddTickets}
                        handleErrorMessage={handleErrorMessage}
                        handleTicketMessage={handleTicketMessage}
                    />
                )}
                <TicketList tickets={tickets} />
            </Container>
        </div>
    )
}

export default App
