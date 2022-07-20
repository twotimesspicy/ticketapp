import { Navbar, Button } from 'react-bootstrap'

const Navigation = ({ user, handleLogOut }) => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-3">
            <Navbar.Text className="ms-left">Home</Navbar.Text>
            <Navbar.Text className="ms-4">About</Navbar.Text>
            <Navbar.Text className="ms-auto">{user.name}</Navbar.Text>
            <div className="ml-3">
                <Button onClick={handleLogOut}>Logout</Button>
            </div>
        </Navbar>
    )
}

export default Navigation
