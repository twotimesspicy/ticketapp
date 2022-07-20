const Ticket = ({ ticket }) => {
    return (
        <tr>
            <td>{ticket.status}</td>
            <td>{ticket.app}</td>
            <td>{ticket.description}</td>
            <td>{ticket.date}</td>
            <td>{ticket.priority}</td>
            <td>{ticket.comments}</td>
        </tr>
    )
}

export default Ticket
