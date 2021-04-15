import React, { Component } from 'react';

const Carousel = (props) => {
    const { images, test } = props
    return (
        <div className="mb-5">
            <h3>{test}</h3>
            <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
                <ol className="carousel-indicators">
                    {images.map((image, index) => (
                        <li
                            key={image.id}
                            data-target="#carousel-example-1z"
                            data-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                        ></li>
                    ))}
                </ol>
                <div className="carousel-inner" role="listbox">
                    {images.map((image, index) => (
                        <div key={image.id}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img
                                className="d-block w-100"
                                src={image.url}
                                alt={image.name} />
                        </div>
                    ))}
                </div>

                <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

export default Carousel;