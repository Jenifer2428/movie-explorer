import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://placehold.co/300x450/20283a/ffffff?text=No+Poster"
        }
        alt={movie.Title}
      />

      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>

        <div className="movie-bottom">
          <span>{movie.Type}</span>

          <Link to={`/movie/${movie.imdbID}`} className="details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;