import React, { useState, Component, useEffect } from 'react';

const MovieCreateForm = (props) => {
    const [isInitialDataloaded, setIsInitialDataLoaded] = useState(false)

    useEffect(() => {
        if (props.initialData) {
            setForm(props.initialData)
            setIsInitialDataLoaded(true)
        }
        // }
        // setForm(props.initialData)
    }, [isInitialDataloaded])

    const [form, setForm] = useState({
        id: '',
        name: '',
        description: '',
        rating: '',
        image: '',
        cover: '',
        longDesc: '',

    })

    const handleChange = (event) => {
        const target = event.target
        const name = target.name

        setForm({
            ...form,
            [name]: target.value
        })
    }

    const handleGenreChange = (event) => {
        const { options } = event.target
        const optionsLength = options.length
        let value = []

        for (let i = 0; i < optionsLength; i++) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }

        setForm({
            ...form,
            genre: value.toString()
        })
    }

    const submitForm = () => {
        //create movie from props
        props.handleFormSubmit({ ...form })
    }

    return (
        <form>
            {JSON.stringify(form)}
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={form.name} name="name" type="text" className="form-control" id="name" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input onChange={handleChange} value={form.description} name="description" type="text" className="form-control" id="description" placeholder="Somewhere in Middle-earth..." />
            </div>
            <div className="form-group">
                <label htmlFor="description">Rating</label>
                <input onChange={handleChange} value={form.rating} name="rating" type="number" max="5" min="0" class="form-control" id="rating" placeholder="3" />
                <small id="emailHelp" className="form-text text-muted">Max: 5, Min: 0 </small>
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input onChange={handleChange} value={form.image} name="image" type="text" className="form-control" id="image" placeholder="http://....." />
            </div>
            <div className="form-group">
                <label htmlFor="cover">Cover</label>
                <input onChange={handleChange} id="cover" name="cover" type="text" className="form-control" id="cover" placeholder="http://......" />
            </div>
            <div className="form-group">
                <label htmlFor="longDesc">Long Description</label>
                <textarea onChange={handleChange} value={form.logDesc} name="longDesc" className="form-control" id="longDesc" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select onChange={handleGenreChange} multiple class="form-control" id="genre">
                    <option>drama</option>
                    <option>music</option>
                    <option>adventure</option>
                    <option>historical</option>
                    <option>action</option>
                </select>
            </div>
            <button
                onClick={submitForm}
                type="button"
                className="btn btn-primary mt-2">{props.submitButton || 'Crate'}
            </button>

        </form>
    );
}

export default MovieCreateForm;