import { useState } from 'react'
import Ticket from './Ticket'
import { Container, Table, Nav } from 'react-bootstrap'

const TicketList = ({ tickets }) => {
    const [page, setNewPage] = useState(0)
    const numResults = 10
    const total_pages = Math.ceil(tickets.length / numResults)

    const PageNumber = (props) => {
        const results = []
        for (let i = 0; i < total_pages; i++) {
            results.push(i)
        }
        return (
            <Nav className="justify-content-end" activeKey="/home">
                {results.map((item) => (
                    <PageLink target={item} key={item} />
                ))}
            </Nav>
        )
    }

    const PageLink = ({ target }) => {
        if (target === page) {
            return (
                <Nav.Link className="ms-3 font-weight-bold" eventKey="disabled" disabled>
                    {target + 1}
                </Nav.Link>
            )
        } else {
            return (
                <Nav.Link className="ms-3" href="/#" onClick={() => setNewPage(target)}>
                    {target + 1}
                </Nav.Link>
            )
        }
    }

    return (
        <Container>
            <Table className="table-striped mb-0">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>App name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Priority</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.slice(numResults * page, numResults * (page + 1)).map((ticket) => (
                        <Ticket key={ticket.id} ticket={ticket} />
                    ))}
                </tbody>
            </Table>
            <div className="justify-content-end">
                <PageNumber page={page} total_pages={total_pages} />
            </div>
        </Container>
    )
}

export default TicketList
