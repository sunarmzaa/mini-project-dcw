import React, { Component } from 'react';
import Router from 'next/router'
import MovieCreateForm from '../../../components/movieCreateForm'
import { getMoviesById, updateMovie } from '../../../actions'

class EditMovie extends Component {

    static async getInitialProps({ query }) {
        const movie = await getMoviesById(query.id)
        return { movie }
    }

    handleUpdateMovie = (movie) => {
        updateMovie(movie).then((updatedMovie) => {
            console.log(JSON.stringify(movie))
            Router.push('/movies/[id]', `/movies/${movie.id}`)
        })
    }

    render() {
        const { movie } = this.props
        return (
            <div className="container my-5">
                <h1>Edit the Movie</h1>
                <MovieCreateForm
                    initialData={movie}
                    handleFormSubmit={this.handleUpdateMovie}
                    submitButton="update"
                />
            </div>
        )
    }
}


export default EditMovie