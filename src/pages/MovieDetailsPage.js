import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { getMovieById } from '../api/movie-api';
import { createBooking } from '../api/booking-api';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
const [selectedShowtime, setSelectedShowtime] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovieById(id);
      setMovie(movieData);
    };
    
    fetchMovie();
  }, [id]);
 useEffect(() => {
    if (movie && seats) {
      setTotalPrice(movie.price * seats);
    }
  }, [seats, movie]);
  const handleBooking = async () => {
    if (!selectedShowtime) {
      alert('Please select a showtime');
      return;
    }

    const booking = {
      userId,
      movieId: id,
      bookingDate,
      bookingTime: selectedShowtime,
      seats,
      paymentStatus: 'pending',
      totalPrice
    };

    try {
      await createBooking(booking);
      alert(`You have successfully booked ${seats} seats for ${movie.name} on ${bookingDate} at ${bookingTime}`);
      navigate(`/your-booking/${userId}`);
    } catch (error) {
      console.error(error);
      alert('An error occurred while booking. Please try again.');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Container className="my-5">
        <Row>
          <Col md={4}>
            <img src={movie.imageUrl} alt={movie.name} className="img-fluid rounded" />
          </Col>
          <Col md={8}>
            <h1>{movie.name}</h1>
            <p>Price: {movie.price} VND</p>
            <p>Directed by: {movie.director}</p>
            <p>Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
            
            {
              userId ? (
                <Form className="mt-4">
                  <Form.Group as={Row} controlId="formSeats">
                    <Form.Label column sm="2">Seats</Form.Label>
                    <Col sm="10">
                      <Form.Control 
                        type="number" 
                        value={seats} 
                        onChange={(e) => setSeats(e.target.value)} 
                        min="1" 
                        max="10" 
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formBookingDate">
                    <Form.Label column sm="2">Booking Date</Form.Label>
                    <Col sm="10">
                      <Form.Control 
                        type="date" 
                        value={bookingDate} 
                        onChange={(e) => setBookingDate(e.target.value)} 
                        min={today} // Set minimum date to today's date
                        required 
                      />
                    </Col>
                  </Form.Group>
                  
                   <Form.Group as={Row} controlId="formShowtime">
                <Form.Label column sm="2">Showtime</Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="select"
                    value={selectedShowtime}
                    onChange={(e) => setSelectedShowtime(e.target.value)}
                    required
                  >
                    <option value="">Select showtime</option>
                    {movie.showtimes.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              
              <Form.Group as={Row} controlId="formTotalPrice">
                <Form.Label column sm="2">Total Price</Form.Label>
                <Col sm="10">
                  <Form.Control 
                    type="text" 
                    value={`${totalPrice} VND`} 
                    readOnly 
                  />
                </Col>
              </Form.Group>
              
              <Button variant="primary" onClick={handleBooking} className="mt-3">
                Proceed to Payment
              </Button>
                  <Button variant="primary" onClick={handleBooking} className="mt-3">
                    Book Now
                  </Button>
                </Form>
              ) : (
                <Button variant="primary" onClick={() => navigate("/login")}>Login to book</Button>
              )
            }
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}
