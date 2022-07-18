const Ticket = ({ ticket }) => {
    return (
        <tr>
            <td>{ticket.app}</td>
            <td>{ticket.description}</td>
        </tr>
    )
}

export default Ticket
