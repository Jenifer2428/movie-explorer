import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Star } from "lucide-react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function Details() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://www.omdbapi.com/",
          {
            params: {
              apikey: API_KEY,
              i: id,
              plot: "full"
            }
          }
        );

        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error || "Movie not found.");
        }
      } catch (err) {
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return <p className="message">Loading movie details...</p>;
  }

  if (error) {
    return (
      <div className="message">
        <p className="error-message">{error}</p>
        <Link to="/" className="back-btn">Go Home</Link>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <main className="details-container">
      <Link to="/" className="back-btn">
        <ArrowLeft size={18} /> Back to Search
      </Link>

      <div className="details-content">
        <img
          className="details-poster"
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/300x450/20283a/ffffff?text=No+Poster"
          }
          alt={movie.Title}
        />

        <div className="details-info">
          <h1>{movie.Title}</h1>

          <p className="subtitle">
            {movie.Year} | {movie.Runtime} | {movie.Rated}
          </p>

          <div className="rating">
            <Star size={21} fill="gold" color="gold" />
            <strong>
              {movie.imdbRating !== "N/A"
                ? movie.imdbRating
                : "Not available"}
            </strong>
            <span>/ 10 IMDb</span>
          </div>

          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Released:</strong> {movie.Released}</p>

          <h3>Plot</h3>
          <p className="plot">{movie.Plot}</p>
        </div>
      </div>
    </main>
  );
}

export default Details;