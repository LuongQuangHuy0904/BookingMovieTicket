import axios from 'axios';

const baseUrl = 'http://localhost:9999/movies';

// Get all movies
export const getMovies = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Get a single movie by ID
export const getMovieById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Create a new movie
export const createMovie = async (movie) => {
    try {
        let randomId = Math.floor(Math.random() * 1000).toString();
        movie.id = randomId;
        const response = await axios.post(baseUrl, movie);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Update an existing movie
export const updateMovie = async (id, movie) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, movie);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete a movie
export const deleteMovie = async (id) => {
    try {
        await axios.delete(`${baseUrl}/${id}`);
    } catch (error) {
        console.error(error);
    }
};
