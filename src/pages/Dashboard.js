import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Image } from 'react-bootstrap';
import { getMovies, createMovie, updateMovie, deleteMovie } from '../api/movie-api';
import DashboardHeader from '../components/DashboardHeader';

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({ 
    id: '', 
    name: '', 
    year: '', 
    director: '', 
    genre: '', 
    imageUrl: '',
    price: '',
    showtimes: [''] // Mảng các giờ chiếu
  });
  const [newShowtime, setNewShowtime] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
    };

    fetchMovies();
  }, []);

  const handleShowModal = (movie = { 
    id: '', 
    name: '', 
    year: '', 
    director: '', 
    genre: '', 
    imageUrl: '',
    price: '',
    showtimes: ['']
  }) => {
    setCurrentMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleShowtimeChange = (e, index) => {
    const updatedShowtimes = [...currentMovie.showtimes];
    updatedShowtimes[index] = e.target.value;
    setCurrentMovie({...currentMovie, showtimes: updatedShowtimes});
  };

  const addShowtime = () => {
    setCurrentMovie({
      ...currentMovie,
      showtimes: [...currentMovie.showtimes, '']
    });
  };

  const removeShowtime = (index) => {
    const updatedShowtimes = [...currentMovie.showtimes];
    updatedShowtimes.splice(index, 1);
    setCurrentMovie({
      ...currentMovie,
      showtimes: updatedShowtimes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Chuẩn bị dữ liệu movie
    const movieData = {
      ...currentMovie,
      price: Number(currentMovie.price),
      showtimes: currentMovie.showtimes.filter(time => time !== '') // Loại bỏ giờ chiếu trống
    };

    if (currentMovie.id) {
      await updateMovie(currentMovie.id, movieData);
    } else {
      await createMovie(movieData);
    }
    
    const moviesData = await getMovies();
    setMovies(moviesData);
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete movie?");
    if (isConfirmed) {
      await deleteMovie(id);
      const moviesData = await getMovies();
      setMovies(moviesData);
    }
  };

  return (
    <div className='container'>
      <DashboardHeader />
      <Container fluid className="my-5">
        <h1 className="mb-4">Movie Dashboard</h1>
        <Button variant="primary" onClick={() => handleShowModal()}>Add Movie</Button>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Year</th>
              <th>Director</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Showtimes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <Image src={movie.imageUrl} rounded style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </td>
                <td>{movie.name}</td>
                <td>{movie.year}</td>
                <td>{movie.director}</td>
                <td>{movie.genre}</td>
                <td>{movie.price} VND</td>
                <td>
                  {movie.showtimes && movie.showtimes.join(', ')}
                </td>
                <td>
                  <Button variant="warning" onClick={() => handleShowModal(movie)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(movie.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{currentMovie.id ? 'Edit Movie' : 'Add Movie'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentMovie.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  name="year"
                  value={currentMovie.year}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  value={currentMovie.director}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={currentMovie.genre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price (VND)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentMovie.price}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  value={currentMovie.imageUrl}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Showtimes</Form.Label>
                {currentMovie.showtimes.map((showtime, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="time"
                      value={showtime}
                      onChange={(e) => handleShowtimeChange(e, index)}
                      required
                    />
                    {currentMovie.showtimes.length > 1 && (
                      <Button 
                        variant="danger" 
                        className="ms-2"
                        onClick={() => removeShowtime(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  variant="secondary" 
                  onClick={addShowtime}
                  className="mt-2"
                >
                  Add Showtime
                </Button>
              </Form.Group>
              
              <Button variant="primary" type="submit">
                {currentMovie.id ? 'Update Movie' : 'Add Movie'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}