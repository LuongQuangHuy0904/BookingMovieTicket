import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ControlledCarousel from '../components/ControlledCarousel';
import { Col, Row, Form } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import { getMovies } from '../api/movie-api';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
    };

    fetchMovies();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const getUniqueGenres = (movies) => {
    const genres = movies.map(movie => movie.genre);
    return [...new Set(genres)];
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === '' || movie.genre === selectedGenre)
    );
  });

  const uniqueGenres = getUniqueGenres(movies);

  return (
    <div>
      <Header />
      <div className="container min-vh-100">
        <ControlledCarousel />
        <div>
          <h1 className="my-5">Movie List</h1>
          <Form className="mb-4">
            <Row>
              <Col md={6}>
                <Form.Group controlId="search">
                  <Form.Control
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="genre">
                  <Form.Control as="select" value={selectedGenre} onChange={handleGenreChange}>
                    <option value="">All Genres</option>
                    {uniqueGenres.map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row md={4} className="g-4">
            {filteredMovies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
}
