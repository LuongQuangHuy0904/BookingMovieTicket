import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../api/booking-api";
import { getUsers } from "../api/user-api";
import { getMovies } from "../api/movie-api";
import DashboardHeader from "../components/DashboardHeader";

export default function BookingDashboard() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({
    id: "",
    userId: "",
    movieId: "",
    bookingDate: "",
    bookingTime: "",
    seats: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const bookingsData = await getBookings();
      const usersData = await getUsers();
      const moviesData = await getMovies();
      setBookings(bookingsData);
      setUsers(usersData);
      setMovies(moviesData);
    };

    fetchData();
  }, []);

  const handleShowModal = (
    booking = {
      id: "",
      userId: "",
      movieId: "",
      bookingDate: "",
      bookingTime: "",
      seats: "",
    }
  ) => {
    setCurrentBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentBooking.seats <= 0) {
      alert("The number of seats must be greater than 0.");
      return;
    }

    if (currentBooking.id) {
      await updateBooking(currentBooking.id, currentBooking);
    } else {
      await createBooking(currentBooking);
    }

    const bookingsData = await getBookings();
    setBookings(bookingsData);
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete booking?"
    );
    if (isConfirmed) {
      await deleteBooking(id);
      const bookingsData = await getBookings();
      setBookings(bookingsData);
    }
  };

  return (
    <div className="container">
      <DashboardHeader />
      <Container fluid className="my-5">
        <h1 className="mb-4">Booking Dashboard</h1>
        <Button variant="primary" onClick={() => handleShowModal()}>
          Add Booking
        </Button>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Movie Name</th>
              <th>Booking Date</th>
              <th>Showtime</th>
              <th>Seats</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Payment ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const user = users.find((u) => u.id === booking.userId) || {};
              const movie = movies.find((m) => m.id === booking.movieId) || {};
              return (
                <tr key={booking.id}>
                  <td>{user.name}</td>
                  <td>{movie.name}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.bookingTime}</td>
                  <td>{booking.seats}</td>
                  <td>{booking.totalPrice} VND</td>
                  <td>{booking.paymentStatus}</td>
                  <td>{booking.paymentId || "N/A"}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowModal(booking)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {currentBooking.id ? "Edit Booking" : "Add Booking"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Control
                  as="select"
                  name="userId"
                  value={currentBooking.userId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Movie</Form.Label>
                <Form.Control
                  as="select"
                  name="movieId"
                  value={currentBooking.movieId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Movie</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Booking Date</Form.Label>
                <Form.Control
                  type="date"
                  name="bookingDate"
                  value={currentBooking.bookingDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Seats</Form.Label>
                <Form.Control
                  type="number"
                  name="seats"
                  value={currentBooking.seats}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {currentBooking.id ? "Update Booking" : "Add Booking"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
