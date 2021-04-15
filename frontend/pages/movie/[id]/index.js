import { useRouter, Router } from 'next/router'
import { getMoviesById, deleteMovie } from '../../../actions'
import Link from 'next/link'

const Movie = (props) => {
    const router = useRouter()
    const { id } = router.query
    const { movie } = props

    const handleDeleteMovie = (id) => {
        deleteMovie(id).then(() => {
            router.push('/')
        })
    }

    return (
        <div className="container">
            <h2>Movie with id: {id} </h2>
            <p>Name: {movie.name}</p>
            <p>Movie Genre: {movie.genre}</p>
            <p>Descript: {movie.description}</p>
            <hr />
            <Link href="/movies/[id]/edit" as={`/movies/${id}/edit`}>
                <button
                    className="btn btn-warning mr-3"
                    role="button">Edit</button>
            </Link>
            <button onClick={() => handleDeleteMovie(id)} className="btn btn-danger my-3">Delete</button>
        </div>);
}

Movie.getInitialProps = async (context) => {
    const movie = await getMoviesById(context.query.id)
    return { movie }
}

export default Movie;