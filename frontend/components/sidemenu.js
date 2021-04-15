import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'
import { useState } from 'react'
import { Router, useRouter } from 'next/router'
import Modal from './modal'
import MovieCreateForm from './movieCreateForm'



const SideMenu = (props) => {
    const { categories } = props
    const router = useRouter()
    let modal = null
    // const stateArray = useState(0)
    // const count = stateArray[0]
    // const setCount = stateArray[1]

    const handleCreateMovie = (movie) => {
        createMovie(movie).then(() => {
            console.log(JSON.stringify(movie))
            modal.closeModal()
            router.push('/')
        })
    }

    return (
        <div>
            <Modal ref={ele => modal = ele} hasSubmit={false}>
                <MovieCreateForm handleFormSubmit={handleCreateMovie} />
            </Modal>
            <div className="list-group start-group">
                {categories.map(category => (
                    <a href="#"
                        onClick={() => props.changeCategory(category.name)}
                        key={category.id}
                        className={`list-group-item ${props.activeCategory === category.name ? 'active' : ''}`}>{category.name}</a>
                ))}
            </div>
        </div>
    );
}

export default SideMenu
