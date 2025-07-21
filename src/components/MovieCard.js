import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  console.log(movie)
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate("/movies/"+movie?.id)}>
        <Card.Img variant="top" src={movie.imageUrl} alt={movie.name} style={{
          height: "400px",
        }} />
        <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
        <Card.Text>
            Directed by: {movie.director}
        </Card.Text>
        <Card.Text>
            Year: {movie.year}
        </Card.Text>
        <Card.Text>
            Genre: {movie.genre}
        </Card.Text>
        </Card.Body>
    </Card>
  );
}
