import React from 'react'

import {
  ShieldCheck,
  Zap,
  BadgeDollarSign,
  Video,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Verified Trust",
    desc: "Every listing is strictly audited for ownership, condition, and legality.",
  },
  {
    icon: <Zap size={28} />,
    title: "Smart Search",
    desc: "Our AI-driven algorithms help you find the best matches based on preferences.",
  },
  {
    icon: <BadgeDollarSign size={28} />,
    title: "Best Value",
    desc: "Direct-from-owner listings and zero-commission options to ensure competitive prices.",
  },
  {
    icon: <Video size={28} />,
    title: "Virtual Tours",
    desc: "High-definition 3D tours allow you to experience the property from home.",
  },
];

const benefits = [
  "Direct connection with certified agents",
  "Real-time market valuation data",
  "Secure document management system",
  "24/7 Premium customer support",
];

const Features = () => {
  return (
    
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-[28px] p-9 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#DFF8F5] flex items-center justify-center text-[#169A8D]">
                  {item.icon}
                </div>

                <h3 className="text-3xl font-extrabold text-slate-900 mt-8">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-lg leading-8 mt-5">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

          {/* Right Side */}
          <div>

            <h2 className="text-6xl font-black leading-tight text-slate-900">
              Why RealEstate
              <br />
              is the{" "}
              <span className="text-[#169A8D]">
                Preferred Choice.
              </span>
            </h2>

            <p className="text-gray-600 text-xl leading-10 mt-8">
              We've reinvented the property search experience from the ground
              up. By focusing on transparency, technological precision, and
              user-centric design, we help you find not just a house, but a
              home.
            </p>

            <div className="space-y-8 mt-12">

              {benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-5">

                  <div className="text-[#169A8D]">
                    <Zap fill="currentColor" size={18} />
                  </div>

                  <p className="text-2xl font-semibold text-slate-900">
                    {item}
                  </p>

                </div>
              ))}

            </div>

            <a href="#process" className="group mt-14 text-[#169A8D] text-2xl font-bold border-b-2 border-[#169A8D] pb-2 flex items-center gap-2 hover:gap-4 transition-all">
              Learn more about our process
              <ArrowRight size={22} />
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Features