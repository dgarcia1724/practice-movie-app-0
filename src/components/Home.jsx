import { useEffect, useState } from "react";

const KEY = "4fefc778";

function Home() {
  const [query, setQuery] = useState("");
  const [movieList, setMovieList] = useState([]);

  useEffect(
    function () {
      async function fetchMovieList() {
        try {
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!response.ok) throw new Error("Failed to fetch");

          const data = await response.json();
          if (data.Response == "False") throw new Error("Movie not found");

          console.log(data);
          setMovieList(data.Search);
        } catch (err) {
          console.error(err.message);
        }
      }
      fetchMovieList();
    },
    [query, movieList]
  );

  return (
    <div>
      <Search query={query} setQuery={setQuery} />
      <MovieList movieList={movieList} />
    </div>
  );
}

export default Home;

function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function MovieList({ movieList }) {
  return (
    <ul className="grid grid-cols-5 gap-10">
      {movieList.map((movie) => {
        return <Movie movie={movie} key={movie.imdbID} />;
      })}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <h3>{movie.Year}</h3>
    </li>
  );
}
