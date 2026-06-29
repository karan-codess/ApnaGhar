import React from 'react'
import { Zap, Video, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Smart Search",
    icon: <Zap size={34} />,
    description:
      "Leverage our AI-driven Smart Search algorithms to find the best property matches tailored to your specific preferences.",
  },
  {
    number: "02",
    title: "Virtual Tours",
    icon: <Video size={34} />,
    description:
      "Experience your future home from anywhere with our high-definition 3D virtual tours and immersive walkthroughs.",
  },
  {
    number: "03",
    title: "Verified Trust",
    icon: <ShieldCheck size={34} />,
    description:
      "Every listing is strictly audited for ownership and condition, ensuring your peace of mind and a secure transaction.",
  },
];

const How = () => {
  return (
    <section id='process' className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Badge */}
        <div className="flex justify-center">
          <span className="bg-[#E6F9F6] text-[#14968A] font-bold text-sm px-5 py-2 rounded-full uppercase tracking-wide">
            HOW IT WORKS
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-6xl font-black mt-8 leading-tight text-slate-900">
          Our Seamless{" "}
          <span className="text-[#169A8D]">Process</span>
        </h2>

        <p className="text-center text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-9">
          We've simplified the journey of finding your dream home into three
          clear, stress-free steps.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 mt-24">

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white border border-gray-200 rounded-[32px] px-10 pt-20 pb-12 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >

              {/* Step Number */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                <div className="w-16 h-16 rounded-2xl bg-[#169A8D] text-white font-black text-3xl flex items-center justify-center shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* Icon */}
              <div className="w-20 h-20 bg-[#DFF8F5] rounded-[28px] mx-auto flex items-center justify-center text-[#169A8D]">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-4xl font-extrabold text-slate-900 mt-10">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-6 text-gray-600 text-lg leading-9">
                {step.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default How