import { Container } from "react-bootstrap";
import JumboCarousel from "../components/Carousels/JumboCarousel";
import React from "react";


const Home = () => {
    const slides = [
        {
            title: 'Welcome to Our Site',
            text: 'We offer the best services and products to meet your needs.',
            backgroundColor: '#007bff' // Optional custom background color for each slide
        },
        {
            title: 'Explore Our Features',
            text: 'Check out our amazing features and functionality.',
            backgroundColor: '#6c757d'
        },
        {
            title: 'Get Started Today',
            text: 'Join us now and experience the future!',
            backgroundColor: '#28a745'
        }
    ];


    return (
      <div>
          <JumboCarousel slides={slides} interval={5000} />
      </div>
    )
}

export default Home;







