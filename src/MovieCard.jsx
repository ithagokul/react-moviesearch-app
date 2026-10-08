import { useState } from 'react'
import moviePlaceholder from './assets/movie-placeholder.svg'

const MovieCard = ({ movie:{Year,Poster,Title,Type,Source} }) => {
  const [poster, setPoster] = useState(
    Poster && Poster !== 'N/A' ? Poster : moviePlaceholder
  )

  return (
      <div className='movie'>
          <div>
            <p>{Year}</p>
          </div>
          <div>
            <img
              src={poster}
              alt={Title}
              onError={() => {
                if (poster !== moviePlaceholder) {
                  setPoster(moviePlaceholder)
                }
              }}
            />
          </div>
          <div>
            {Source && <span>{Source}</span>}
            <span>{Type}</span>
            <h3>{Title}</h3>
          </div>
        </div>
  )
}

export default MovieCard
