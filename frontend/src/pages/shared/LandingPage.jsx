import React from "react";
import Navbar from "../../components/common/Navbar";
import Hero from "../../components/common/Hero";
import Category from "../../components/common/Category";
import Features from "../../components/common/Features";
import How from "../../components/common/How";
import Collection from "../../components/common/Collection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-slate-50">
      <Navbar />
      <Hero />
      <Category />
      <Features />
      <How />
      <Collection />

    </div>
  );
};

export default LandingPage;