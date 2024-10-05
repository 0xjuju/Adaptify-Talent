import { Carousel } from 'react-bootstrap';
import React from "react";

const JumboCarousel = ({ slides, interval }) => {
    return (
        <Carousel interval={ interval || 3000} controls={true} indicators={true}>
            {
                slides.map((slide, index) => (
                    <Carousel.Item key={index}>
                        <div className="carousel-slide"
                             style={{backgroundColor: slide.backgroundColor || '#eee', height: '400px'}}>
                            <div
                                className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <h3>{slide.title}</h3>
                                <p>{slide.text}</p>
                            </div>
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default JumboCarousel;