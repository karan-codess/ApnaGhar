import React from "react";
import Navbar from "../../components/common/Navbar";
import Hero from "../../components/Hero";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-slate-50">
      <Navbar />
      <Hero />

    </div>
  );
};

export default LandingPage;