import React, { useEffect, useState } from "react";
import { Building2, House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";

const categories = [
  {
    title: "Flats",
    type: "flat",
    key: "flat",
    icon: <Building2 size={32} />,
  },
  {
    title: "Villas",
    type: "house", // option value="house" hai isliye
    key: "villa",
    icon: <House size={32} />,
  },
  {
    title: "Penthouse",
    type: "penthouse",
    key: "penthouse",
    icon: <Building2 size={32} />,
  },
  {
    title: "Apartment",
    type: "apartment",
    key: "apartment",
    icon: <Building2 size={32} />,
  },
];

const Category = () => {

  const navigate = useNavigate();
  // const [counts, setCounts] = useState(DEFAULT_COUNTS);
  const [loading, setLoading] = useState(true);

  const [propertyCount, setPropertyCount] = useState({
    flat: 0,
    villa: 0,
    penthouse: 0,
    apartment: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);


  const fetchCounts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/property/counts`);
      if (res.data.success) {
        setPropertyCount(res.data.counts);
      }
    } catch (err) {
      console.error("failed to fetch property counts:", err);
    }finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-slate-900">
          Browse by Category
        </h2>

        <p className="mt-5 text-gray-600 max-w-xl text-lg leading-8">
          Explore curated collections of properties tailored to your specific
          lifestyle and needs.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-14">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/properties?type=${item.type}`)}
              className="bg-white border border-gray-200 rounded-[28px] h-[225px] flex flex-col justify-center items-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mt-8 text-3xl font-bold text-slate-900">
                {item.title}
              </h3>

              {/* Property Count */}
              <p className="mt-3 text-gray-500 text-lg">
                {loading
                  ? "..."
                  : `${(propertyCount[item.key] ?? 0).toLocaleString()} Properties`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
