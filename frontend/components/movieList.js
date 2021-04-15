import React, { Component } from 'react';
import Link from 'next/link'

class MovieList extends Component {

    shorten = (text, maxLength) => {
        if (text && text.length >= maxLength) {
            return text.substr(0, 100) + '...'
        }
        return text
    }

    renderMovies() {
        const { movies } = this.props

        return movies.map((movie) =>
            (
                <div className="col-lg-4 col-md-6 mb-4" key={movie.id}>
                    <div className="card h-100">
                        <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
                            <a><img className="card-img-top" src={movie.image} alt="" /></a>
                        </Link>
                        <div className="card-body">
                            <h4 className="card-title">
                                <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
                                    <a className="movie-genre">{movie.name}</a>
                                </Link>
                            </h4>
                            <h5>$24.99</h5>
                            <p className="card-text">
                                {this.shorten(movie.description, 99)}
                                <hr></hr>
                                {movie.genre}
                            </p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">{movie.rating}</small>
                            <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                        </div>
                    </div>
                </div>
            )
        )
    }

    render() {
        return (
            <React.Fragment>
                { this.renderMovies()}
            </React.Fragment>
        );
    }
}

export default MovieList;
