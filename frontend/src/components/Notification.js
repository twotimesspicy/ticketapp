const Notification = ({ message }) => {
    if (message) {
        return (
            <div>
                <li className="error">{message}</li>
            </div>
        )
    }
}

export default Notification
