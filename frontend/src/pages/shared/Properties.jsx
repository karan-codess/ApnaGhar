import React, { useEffect, useRef, useState } from 'react'
import {useAuth} from "../../context/AuthContext"
import Navbar from "../../components/common/Navbar"
import {HiFilter} from "react-icons/hi"
import {useLocation, useNavigate} from "react-router-dom"
import axios from 'axios'
import API_URL from '../../config'

const Properties = () => {
  const navigate=useNavigate()
  const {user,token}=useAuth()
  const location=useLocation()
  const [properties,setProperties]=useState([])
  const [wishlistedIds,setWishlistedIds]=useState([])


  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  const[viewMode,setViewMode]=useState("grid")

const [filters, setFilters] = useState({
    city: "",
    propertyType: [],
    bhk: "",
    maxPrice: 100000000,
    amenities: [],
    furnishing: [],
    sort: "latest",
  });

  const propertyTypes = [
    { label: "Flat/Apartment", value: "flat" },
    { label: "Independent House/Villa", value: "villa" },
    { label: "Penthouse", value: "penthouse" },
    { label: "Commercial", value: "commercial" },
  ];
  const bhkOptions = ["1", "2", "3", "4", "5+"];
  const furnishingOptions = [
    { label: "Furnished", value: "furnished" },
    { label: "Semi-Furnished", value: "semi-furnished" },
    { label: "Unfurnished", value: "unfurnished" },
  ];

  useEffect(()=>{
    const queryParams=new URLSearchParams(location.search)
    const city=queryParams.get("city") || ""
    const type=queryParams.get("type") || ""
    const bhk=queryParams.get("bhk") || ""

    const initialFilters={
      ...filters,
      city,
      propertyType: type ? [type] : [],
      bhk,
    }

    setFilters(initialFilters)
    fetchProperties(initialFilters)
    if(user){
      fetchWishlist()
    }
  },[location.search,user])


  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistedIds(
        res.data
          .filter((item) => item.property)
          .map((item) => String(item.property._id)),
      );
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

    const handleToggleWishlist = async (propertyId) => {
    try {
      const isWishlisted = wishlistedIds.includes(propertyId);
      if (isWishlisted) {
        await axios.delete(`${API_URL}/api/wishlist/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlistedIds((prev) => prev.filter((id) => id !== propertyId));
      } else {
        await axios.post(
          `${API_URL}/api/wishlist`,
          { propertyId },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setWishlistedIds((prev) => [...prev, propertyId]);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };


  //SOME ERRORS===========================================================


  const fetchProperties = async (currentFilters) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (currentFilters.city) params.append("city", currentFilters.city);
      if (currentFilters.propertyType.length > 0)
        params.append("propertyType", currentFilters.propertyType.join(","));
      if (currentFilters.bhk) params.append("bhk", currentFilters.bhk);
      if (currentFilters.maxPrice)
        params.append("maxPrice", currentFilters.maxPrice);
      if (currentFilters.furnishing && currentFilters.furnishing.length > 0)
        params.append("furnishing", currentFilters.furnishing.join(","));
      if (currentFilters.sort) params.append("sort", currentFilters.sort);

      const res = await axios.get(
        `${API_URL}/api/property?${params.toString()}`,
      );
      setProperties(res.data.properties);
      setError(null);
    } catch (err) {
      setError("Failed to load properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTimer = useRef(null);



  
  const debouncedFetch = (updatedFilters) => {
    if (fetchTimer.current) clearTimeout(fetchTimer.current);
    fetchTimer.current = setTimeout(() => {
      fetchProperties(updatedFilters);
    }, 500);
  };

  const handleCheckboxChange = (category, value) => {
    const current = [...(filters[category] || [])];
    const index = current.indexOf(value);
    if (index === -1) {
      current.push(value);
    } else {
      current.splice(index, 1);
    }
    const updatedFilters = { ...filters, [category]: current };
    setFilters(updatedFilters);
    fetchProperties(updatedFilters);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const updatedFilters = { ...filters, maxPrice: value };
    setFilters(updatedFilters);
    debouncedFetch(updatedFilters);
  };

  const handleBhkSelect = (value) => {
    const updatedFilters = {
      ...filters,
      bhk: filters.bhk === value ? "" : value,
    };
    setFilters(updatedFilters);
    fetchProperties(updatedFilters);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const updatedFilters = { ...filters, sort: newSort };
    setFilters(updatedFilters);
    fetchProperties(updatedFilters);
  };

  const applyFilters = () => {
    if (fetchTimer.current) clearTimeout(fetchTimer.current);
    fetchProperties(filters);
  };

  const resetFilters = () => {
    if (fetchTimer.current) clearTimeout(fetchTimer.current);
    const reset = {
      city: "",
      propertyType: [],
      bhk: "",
      maxPrice: 100000000,
      amenities: [],
      furnishing: [],
      sort: "latest",
    };
    setFilters(reset);
    navigate("/properties");
    fetchProperties(reset);
  };

  const [showMobileFilters, setShowMobileFilters] = useState(false);



  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 pt-32 max-lg:pt-28">
        <Navbar />

        <div className='container'>
          <div className='mobile-filter-btn hidden mb-6 max-[1024px]:block'>
            <button onClick={()=>setShowMobileFilters(true)} 
              className='btn btn-outline w-full flex justify-center gap-3 bg-white py-4'>

                <HiFilter />Show Filters &Search

            </button>

          </div>

        </div>
    </div>
  )
}

export default Properties