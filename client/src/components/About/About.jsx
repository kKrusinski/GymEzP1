import React from "react";
import Navbar from "../Navbar/Navbar";
import HeaderBanner from "../HeaderBanner/HeaderBanner";
import Footer from "../Footer/Footer";
import "./about.css";

const About = () => {
  return (
    <>
      <Navbar />
      <HeaderBanner />
      <main className="about">
        <section className="about__section">
          <h2>How it works</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
            consequatur maiores cumque ipsam nam fugiat. Voluptatum vitae hic
            omnis porro deleniti quo, sapiente incidunt iusto distinctio
            asperiores ea laborum odio. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Unde, consequatur maiores cumque ipsam nam fugiat.
            Voluptatum vitae hic omnis porro deleniti quo, sapiente incidunt
            iusto distinctio asperiores ea laborum odio. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Unde, consequatur maiores cumque
            ipsam nam fugiat. Voluptatum vitae hic omnis porro deleniti quo,
            sapiente incidunt iusto distinctio asperiores ea laborum odio. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Unde, consequatur
            maiores cumque ipsam nam fugiat. Voluptatum vitae hic omnis porro
            deleniti quo, sapiente incidunt iusto distinctio asperiores ea
            laborum odio.
          </p>
        </section>
        <section className="about__section">
          <h2>How it works</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
            consequatur maiores cumque ipsam nam fugiat. Voluptatum vitae hic
            omnis porro deleniti quo, sapiente incidunt iusto distinctio
            asperiores ea laborum odio. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Unde, consequatur maiores cumque ipsam nam fugiat.
            Voluptatum vitae hic omnis porro deleniti quo, sapiente incidunt
            iusto distinctio asperiores ea laborum odio. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Unde, consequatur maiores cumque
            ipsam nam fugiat. Voluptatum vitae hic omnis porro deleniti quo,
            sapiente incidunt iusto distinctio asperiores ea laborum odio. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Unde, consequatur
            maiores cumque ipsam nam fugiat. Voluptatum vitae hic omnis porro
            deleniti quo, sapiente incidunt iusto distinctio asperiores ea
            laborum odio.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
