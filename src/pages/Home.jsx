import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    if (!API_KEY) {
      setError("API key not found. Please check your .env file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMovies([]);

      const response = await axios.get(
        "https://www.omdbapi.com/",
        {
          params: {
            apikey: API_KEY,
            s: search.trim()
          }
        }
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
      } else {
        setError(response.data.Error || "No movies found.");
      }
    } catch (err) {
      setError("Unable to connect. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies =
    category === "all"
      ? movies
      : movies.filter((movie) => movie.Type === category);

  return (
    <main className="home-container">
      <section className="hero">
        <h1>Discover Your Next Favourite Movie</h1>
        <p>Search movies, explore details and check IMDb ratings.</p>

        <form className="search-form" onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            <Search size={20} />
            Search
          </button>
        </form>
      </section>

      <section className="results-section">
        <div className="filter-buttons">
          {["all", "movie", "series", "episode"].map((type) => (
            <button
              key={type}
              className={category === type ? "active" : ""}
              onClick={() => setCategory(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {loading && (
          <div className="message">
            <div className="spinner"></div>
            <p>Searching movies...</p>
          </div>
        )}

        {!loading && error && (
          <p className="error-message">{error}</p>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <h2>Search Results</h2>

            {filteredMovies.length > 0 ? (
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="message">
                No {category} results found.
              </p>
            )}
          </>
        )}

        {!loading && !error && movies.length === 0 && (
          <p className="message">
            Search for your favourite movies to get started.
          </p>
        )}
      </section>
    </main>
  );
}

export default Home;