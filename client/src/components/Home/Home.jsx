import React from "react";
import Navbar from "../Navbar/Navbar";
import HeaderBanner from "../HeaderBanner/HeaderBanner";
import Footer from "../Footer/Footer";
import "./home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeaderBanner />
      <main className="home">
        <section className="home__section">
          <div>
            <img src="/images/dead-lift.jpg" alt="" />
          </div>
          <div className="home__section__description">
            <h2 className="home__section__title">Get in shape</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
              fugit temporibus, aperiam laboriosam veritatis, atque ducimus quo
              dolorum voluptates excepturi dolore illum cumque enim, ea
              consequatur tempora perspiciatis laborum error.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
              fugit temporibus, aperiam laboriosam veritatis, atque ducimus quo
              dolorum voluptates excepturi dolore illum cumque enim, ea
              consequatur tempora perspiciatis laborum error.
            </p>
          </div>
        </section>
        <section className="home__section">
          <div>
            <img src="/images/biceps.jpg" alt="" />
          </div>
          <div className="home__section__description">
            <h2 className="home__section__title">Get in shape</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
              fugit temporibus, aperiam laboriosam veritatis, atque ducimus quo
              dolorum voluptates excepturi dolore illum cumque enim, ea
              consequatur tempora perspiciatis laborum error.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
