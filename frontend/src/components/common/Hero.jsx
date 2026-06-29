import React, { useEffect, useState } from "react";
import { Home } from "lucide-react";
import motion from "../../assets/motion.mp4";
import { Search } from "lucide-react";
import { Shield } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import API_URL from "../../config";

const Hero = () => {

  const navigate=useNavigate();
  const {user,token}=useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("Select Type");
  const [propertyCount, setPropertyCount] = useState({
    flat:0,
    villa:0,
    penthouse:0,
    commercial:0
  });

  const [wishlistedIds, setWishlistedIds] = useState([]);


  useEffect(() => {
    fetchProperties();
    fetchCounts();
    if (user) {
      fetchWishlistedIds();
    }
  },[user]);

  const fetchWishlist=async () => {
    try{
      const res=await axios.get(`${API_URL}/api/wishlist`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setWishlistedIds(res.data
        .filter((item)=>item.property)
        .map((item)=>String(item.property._id))
      );
    }catch(err){
      console.error("Error fetching wishlist:", err);
    }
  }

    const handleToggleWishlist = async (propertyId) => {
      try{
        const isWishlisted=wishlistedIds.includes(propertyId);
        if(isWishlisted){
          await axios.delete(`${API_URL}/api/wishlist/${propertyId}`,{
            headers:{ Authorization : `Bearer ${token}` },
        })
        setWishlistedIds((prev)=>prev.filter((id)=>id!==propertyId));
      }else{
        await axios.post(`${API_URL}/api/wishlist`,{ propertyId },{
          headers:{ Authorization : `Bearer ${token}` },
        })
        setWishlistedIds((prev)=>[...prev,propertyId]);
      }
    }catch(err){
      console.error("Error toggling wishlist:", err);
    }
  }
      
    const fetchCounts=async () => {
    try{
      const res=await axios.get(`${API_URL}/api/property/counts`);
      if(res.data.success){
        setPropertyCount(res.data.counts);
      }
    }catch(err){
      console.error("failed to fetch property counts:", err);
    }
  }


    const fetchProperties = async () => {
      try{
        setLoading(true);
        const res=await axios.get(`${API_URL}/api/property?city=${search}`)
        setProperties(res.data.properties ||res.data|| []);
        setError(null)

      }catch(err){
        setError("Failed to fetch properties");
      }finally{
        setLoading(false);
      }
    }
  


  const handleSearch = () => {
    // e.preventDefault();
    const params=new URLSearchParams();
    if(searchTerm) params.append("city",searchTerm);
    if(propertyType && propertyType!=="Select Type") params.append("type",propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={motion} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full w-full px-30 flex">
        <div className="max-w-3xl mt-40 text-white ">
          {/* Badge */}
          <span className="inline-block mb-2 rounded-full bg-blue-800 px-3 py-1 text-white backdrop-blur-md text-[14px] font-body tracking-wide">
            <div className="flex gap-2 items-center">
              <Home size={18} />
              <h5>Direct Connect. Genuine Deals</h5>
            </div>
          </span>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-black">
            Find Your <span className="text-blue-800">Perfect Place</span>
            <br />
            To Call Home.
          </h1>

          {/* Paragraph */}
          <p className="mt-3 text-[17px] max-w-xs font-medium leading-relaxed font-body text-gray-900 text-shadow-gray-900">
            Your ideal home is just a search away. Start exploring today.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-xl flex items-center max-w-4xl py-1 mt-20">
            {/* Location */}
            <div className="px-6">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Where
              </p>

              <input
                type="text"
                placeholder="Location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-lg outline-none text-black"
              />
            </div>

            {/* Divider */}
            <div className="w-px h-16 bg-gray-300"></div>

            {/* Property Type */}
            <div className="flex-1 px-4">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Property Type
              </p>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full text-black text-lg outline-none bg-transparent"
              >
                <option value="Select Type">Select Type</option>
                <option value="house">House/Vila</option>
                <option value="flat">Flat/Apartment</option>
                <option value="penthouse">Penthouse</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="w-px h-16 bg-gray-300"></div>
            {/* Search Button */}
            <div className="px-3">
              <button
                onClick={handleSearch}
                className="bg-blue-800 text-white rounded-lg px-6 py-2 flex items-center gap-2 hover:bg-blue-900 transition"
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center gap-8 mt-4 px-2">
            <h5 className="flex items-center leading-none gap-1 text-[11px]"><Shield size={10} />Verified Properties</h5>
            <h5 className="flex items-center leading-none gap-1 text-[11px]"><Shield size={10} />Trusted Sellers</h5>
            <h5 className="flex items-center leading-none gap-1 text-[11px]"><Shield size={10} />Direct Buyer-Seller Connect</h5>
            <h5 className="flex items-center leading-none gap-1 text-[11px]"><Shield size={10} />Transparent Pricing</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
