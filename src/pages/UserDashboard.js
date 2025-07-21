import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { getUsers, createUser, updateUser, deleteUser } from '../api/user-api';
import DashboardHeader from '../components/DashboardHeader';

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', email: '', role: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleShowModal = (user = { id: '', name: '', email: '', role: '' }) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser.id) {
      await updateUser(currentUser.id, currentUser);
    } else {
      await createUser(currentUser);
    }
    const usersData = await getUsers();
    setUsers(usersData);
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    const usersData = await getUsers();
    setUsers(usersData);
  };

  return (
    <div className='container'>
      <DashboardHeader />
      <Container fluid className="my-5">
        <h1 className="mb-4">User Dashboard</h1>
        <Button variant="primary" onClick={() => handleShowModal()}>Add User</Button>
        <Table striped bordered hover className="mt-4 ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="warning" onClick={() => handleShowModal(user)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentUser.id ? 'Edit User' : 'Add User'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={currentUser.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="guest">Guest</option>
                  <option value="manager">Manager</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                {currentUser.id ? 'Update User' : 'Add User'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
