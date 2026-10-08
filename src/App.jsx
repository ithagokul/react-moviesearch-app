import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from "./search.svg"
import MovieCard from './MovieCard'



//21148254
const API_URL = 'https://www.omdbapi.com/'
const API_KEY = '21148254'

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchMovies = async (title)=>{
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return [];

    const params = new URLSearchParams({
      apikey: API_KEY,
      s: trimmedTitle,
    });
    const response = await fetch(`${API_URL}?${params}`);
    const data = await response.json();
    const results = data.Search ?? [];

    return results.map((movie) => {
      const matchingTitle = results.find((result) =>
        movie.Title.startsWith(`${result.Title} (`) &&
        result.Poster !== "N/A"
      );

      return matchingTitle
        ? { ...movie, Poster: matchingTitle.Poster, Source: 'OMDb' }
        : { ...movie, Source: 'OMDb' }
    });
  };

  const searchMovie = async (title)=>{
    const trimmedTitle = title.trim()
    setMovies(await fetchMovies(trimmedTitle))
  };

  useEffect(()=>{
    const loadInitialMovies = async () => {
      setMovies(await fetchMovies('RRR'))
    }

    loadInitialMovies()
  }, [])

  return (
    <>
      <div className='app'>
        <h1>Movie Search APP</h1>
        <form
          className='search'
          onSubmit={(event) => {
            event.preventDefault();
            searchMovie(searchTerm);
          }}
        >
          <input placeholder='Search for Movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button type="submit" aria-label="Search movies">
            <img src={SearchIcon} alt="" />
          </button>
        </form>

        {movies.length > 0 ? (
          <div className="container">
            {movies.map((movie)=>(
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ):(
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}

      </div>
    </>
  )
}

export default App
