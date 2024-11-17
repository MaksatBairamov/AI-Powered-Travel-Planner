import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Autoplay } from "swiper";
import "../styles.css";
import { Link } from "react-router-dom";
import munichImg from "../img/munich.jpg";
import kyivImg from "../img/kyiv.jpg";
import geneveImg from "../img/geneve.jpg";

SwiperCore.use([Autoplay]); // Підключення Autoplay

const popularDestinations = [
  { name: "Munich", img: munichImg },
  { name: "Kyiv", img: kyivImg },
  { name: "Geneve", img: geneveImg },
];

const Home = () => {
  return (
    <main className="home-main">
      <h2 className="home-title">Welcome to AI Travel Planner</h2>
      <p className="home-subtitle">
        Start planning your dream trip with our AI-powered recommendations!
      </p>
      <Link to="/plan-trip">
        <button className="get-started-btn">Get Started</button>
      </Link>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        className="swiper-container"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {popularDestinations.map((destination) => (
          <SwiperSlide key={destination.name}>
            <div className="carousel-slide">
              <img
                src={destination.img}
                alt={destination.name}
                className="carousel-image"
              />
              <h3 className="carousel-title">{destination.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Home;
