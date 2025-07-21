import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { getMovieById } from '../api/movie-api';
import { getBookingByUserId, updateBooking } from '../api/booking-api';
import Header from '../components/Header';
import { deleteBooking } from '../api/booking-api';


export default function YourBooking() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingData = await getBookingByUserId(id);
      console.log(bookingData);
      setBookings(bookingData);

      // Fetch corresponding movie details
      const movieDetails = await Promise.all(
        bookingData.map(booking => getMovieById(booking.movieId))
      );
      const movieDetailsMap = movieDetails.reduce((acc, movie) => {
        acc[movie.id] = movie;
        return acc;
      }, {});
      setMovies(movieDetailsMap);
    };

    fetchBookings();
  }, [id]);
  
  const handleDelete = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to delete this booking?");
    if (confirmed) {
      const success = await deleteBooking(bookingId);
      if (success) {
        // Xóa booking khỏi UI
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        alert("Booking deleted successfully");
      } else {
        alert("Failed to delete booking. Please try again.");
      }
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      // Generate a random payment ID
      const paymentId = `PAY-${Date.now()}`;
      
      // Update booking with payment info
      const updatedBooking = {
        ...bookings.find(b => b.id === bookingId),
        paymentStatus: 'paid',
        paymentId,
        paymentDate: new Date().toISOString()
      };

      await updateBooking(bookingId, updatedBooking);
      
      // Refresh bookings
      const bookingData = await getBookingByUserId(id);
      setBookings(bookingData);
      
      alert(`Payment successful! Your payment ID: ${paymentId}`);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // ...existing code...
return (
  <>
    <Header />
    <Container className="my-5">
      <h1 className="mb-4">Your Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center text-muted my-5" style={{ fontSize: '1.5rem' }}>
          Không có movie nào được thêm vào
        </div>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col md={6} key={booking.id} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      {movies[booking.movieId] && (
                        <img
                          src={movies[booking.movieId].imageUrl}
                          alt={movies[booking.movieId].name}
                          className="img-fluid rounded booking-img"
                          style={{ height: "100%", objectFit: "cover" }}
                        />
                      )}
                    </Col>
                    <Col md={8}>
                      {movies[booking.movieId] && (
                        <>
                          <Card.Title className="h3">{movies[booking.movieId].name}</Card.Title>
                          <Card.Text className="h5">Directed by: {movies[booking.movieId].director}</Card.Text>
                          <Card.Text className="h5">Year: {movies[booking.movieId].year}</Card.Text>
                          <Card.Text className="h5">Genre: {movies[booking.movieId].genre}</Card.Text>
                        </>
                      )}
                      <ListGroup.Item>
                        <strong>Total Price:</strong> {booking.totalPrice} VND
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Payment Status:</strong> {booking.paymentStatus}
                      </ListGroup.Item>
                      {booking.paymentId && (
                        <ListGroup.Item>
                          <strong>Payment ID:</strong> {booking.paymentId}
                        </ListGroup.Item>
                      )}
                    </Col>
                  </Row>
                  {booking.paymentStatus === 'pending' && (
                    <Button 
                      variant="success" 
                      className="mt-3 me-2"
                      onClick={() => handlePayment(booking.id)}
                    >
                      Pay Now
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={() => handleDelete(booking.id)}
                  >
                    {booking.paymentStatus === 'pending' ? 'Cancel' : 'Delete'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  </>
);
}