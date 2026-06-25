import React from "react";
import motion from "../assets/motion.mp4";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={motion} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      

    </section>
  );
};

export default Hero;