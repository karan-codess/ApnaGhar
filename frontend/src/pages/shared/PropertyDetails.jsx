import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [inquiryStatus, setInquiryStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/property/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setProperty(res.data.property);
        setSimilarProperties(res.data.similarProperties || []);

        if (user && user.role === "buyer") {
          const wishRes = await axios.get(`${API_URL}/api/wishlist`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const found = wishRes.data.some((item) => item.property?._id === id);
          setIsInWishlist(found);
        }
      } catch (error) {
        setError("failed to load property details");
        setLoading(false);
      }finally{
        setLoading(false)
      }
    };
    fetchDetails();
  }, [id, user, token]);

  const handleWishlistToggle = async () => {
    if (!user) return navigate("/login");
    try {
      if (isInWishlist) {
        await axios.delete(`${API_URL}/api/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsInWishlist(false);
      } else {
        await axios.post(
          `${API_URL}/api/wishlist/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setIsInWishlist(true);
      }
    } catch (err) {
      alert("failed to update wishlist .");
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (user.role !== "buyer") return alert("only buyers can send inquiries");
    setInquiryStatus({ ...inquiryStatus, loading: true });
    try {
      await axios.post(
        `${API_URL}/api/inquiry`,
        {
          propertyId: id,
          message: inquiry.message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setInquiryStatus({ loading: false, success: true, error: null });
      setInquiry({ ...inquiry, message: "" });
    } catch (err) {
      setInquiryStatus({
        loading: false,
        success: false,
        error: "failed to send inquiry",
      });
    }
  };

  const handleChatStart = async () => {
    if (!user) return navigate("/login");
    if (user.role !== "buyer")
      return alert("only buyers can chat with sellers");
    try {
      const res = await axios.post(
        `${API_URL}/api/chat/start`,
        {
          propertyId: id,
          sellerId: property.seller._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const chat = res.data;
      await axios.post(
        `${API_URL}/api/chat/send`,
        {
          chatId: chat._id,
          text: `(Context:Interested In property "${property.title}")`,
          image: property.images[0],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      navigate("/chat-messages", { state: { chat } });
    } catch (err) {
      console.error("error starting chat:", err);
      alert("failed to start chat.");
    }
  };

  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (loading)
    return (
      <div className="loader-full-page">
        <div className="loader"></div>
      </div>
    );

  if (error || !property) return( 
  <div className="container" style={{padding:"4rem",textAlign:"center"}}>
    {error ||"Property not found"}

  </div>
  );



  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(property.price);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) => (prev + 1) % property.images.length);
  const prevImage = () =>
    setLightboxIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length,
    );

    

  return (
    <div className="bg-[#fdfdfd] min-h-screen pb-24 pt-32 max-lg:pt-28">
      <Navbar />

      <div className="px-3 md:px-6 lg:px-10 py-5">

      {/* Breadcrumb */}
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-5">
        <span>Home</span>
        <span>›</span>
        <span>Listings</span>
        <span>›</span>
        <span className="font-medium text-gray-700">
          {property.title}
        </span>
      </div>

      {/* Single Property Image */}
      <div className="w-full h-[300px] md:h-[450px] lg:h-[450px] overflow-hidden rounded-[24px] bg-amber-500">
        <img
          src={property.images[0]}
          alt="DLF"
          className="w-full h-full object-cover"
        />
      </div>


      {/* Property Information Section */}
<div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

  {/* LEFT SIDE */}
  <div>

    {/* Premium Listing */}
    <span className="inline-block border border-[#0f9d92] text-[#0f9d92] text-xs font-bold px-4 py-2 rounded-lg mb-4">
      PREMIUM LISTING
    </span>

    {/* Title */}
    <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-3">
      {property.title}
    </h1>

    {/* Location */}
    <div className="flex items-center gap-2 text-gray-500 mb-2">
      <span className="text-[#0f9d92] text-xl">●</span>
      <span>
        kanpur dehat
      </span>
    </div>

    {/* Wishlist */}
    <button
      onClick={handleWishlistToggle}
      className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-2xl text-gray-500 hover:text-[#0f9d92] transition mb-8"
    >
      {isInWishlist ? "♥" : "♡"}
    </button>

    {/* Property Features */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* Bedrooms */}
      <div className="bg-[#f7f9fb] border border-gray-100 rounded-2xl h-24 flex flex-col items-center justify-center">
        <span className="text-[#0f9d92] text-lg">⌂</span>
        <p className="font-bold text-gray-800">
          {property.bedrooms}
        </p>
        <p className="text-[10px] font-bold tracking-wider text-gray-400">
          BEDROOMS
        </p>
      </div>

      {/* Bathrooms */}
      <div className="bg-[#f7f9fb] border border-gray-100 rounded-2xl h-24 flex flex-col items-center justify-center">
        <span className="text-[#0f9d92] text-lg">♧</span>
        <p className="font-bold text-gray-800">
          {property.bathrooms}
        </p>
        <p className="text-[10px] font-bold tracking-wider text-gray-400">
          BATHROOMS
        </p>
      </div>

      {/* Furnishing */}
      <div className="bg-[#f7f9fb] border border-gray-100 rounded-2xl h-24 flex flex-col items-center justify-center">
        <span className="text-[#0f9d92] text-lg">▰</span>
        <p className="font-bold text-gray-800">
          {property.furnishing || "Furnished"}
        </p>
        <p className="text-[10px] font-bold tracking-wider text-gray-400">
          FURNISHING
        </p>
      </div>

      {/* Area */}
      <div className="bg-[#f7f9fb] border border-gray-100 rounded-2xl h-24 flex flex-col items-center justify-center">
        <span className="text-[#0f9d92] text-lg">⊞</span>
        <p className="font-bold text-gray-800">
          {property.area} Sqft
        </p>
        <p className="text-[10px] font-bold tracking-wider text-gray-400">
          LIVING AREA
        </p>
      </div>

      {/* Type */}
      <div className="bg-[#f7f9fb] border border-gray-100 rounded-2xl h-24 flex flex-col items-center justify-center">
        <span className="text-[#0f9d92] text-lg">▣</span>
        <p className="font-bold text-gray-800">
          {property.propertyType || "Flat"}
        </p>
        <p className="text-[10px] font-bold tracking-wider text-gray-400">
          TYPE
        </p>
      </div>

    </div>

    {/* Description */}
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Description
      </h2>

      <p className="text-gray-500 leading-7">
        {property.description}
      </p>
    </div>

    {/* Amenities */}
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Amenities
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5">

        {property.amenities?.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-gray-600"
          >
            <span className="text-[#0f9d92] font-bold">
              ●
            </span>

            <span>{amenity}</span>
          </div>
        ))}

      </div>
    </div>

  </div>


  {/* RIGHT SIDE */}
  <div>

    {/* Price Card */}
    <div className="bg-[#0f9d92] rounded-[24px] p-7 text-white shadow-lg">
      <p className="text-sm font-bold opacity-90">
        LISTING PRICE
      </p>

      <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
        {formattedPrice}
      </h2>

      <p className="text-sm mt-2">
        Available for Sale
      </p>
    </div>


    {/* Seller Card */}
    <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-7 mt-6">

      {/* Seller */}
      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <span className="text-2xl">✦</span>
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {property.seller?.name || "Seller"}
          </h3>

          <p className="text-sm text-[#0f9d92] font-semibold mt-1">
            ✓ Verified Seller
          </p>
        </div>

      </div>


      {/* Chat */}
      <button
        onClick={handleChatStart}
        className="w-full mt-8 py-3 font-semibold text-gray-700 hover:text-[#0f9d92] transition"
      >
        💬 Chat
      </button>


      {/* Inquiry */}
      <div className="mt-5">

        <h3 className="font-bold text-gray-800 mb-4">
          Inquire
        </h3>

        {!user ? (
          <div className="bg-[#f7f9fb] rounded-xl p-4">

            <p className="text-sm text-gray-400 text-center mb-3">
              Please login as a buyer to send inquiries.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#0f9d92] text-white py-3 rounded-xl font-bold hover:bg-[#0c8c82] transition"
            >
              Login
            </button>

          </div>
        ) : user.role === "buyer" ? (

          <form onSubmit={handleInquirySubmit} className="space-y-3">

            <textarea
              value={inquiry.message}
              onChange={(e) =>
                setInquiry({
                  ...inquiry,
                  message: e.target.value,
                })
              }
              placeholder="Write your inquiry..."
              className="w-full border rounded-xl p-3 outline-none focus:border-[#0f9d92]"
              rows="4"
            />

            <button
              type="submit"
              disabled={inquiryStatus.loading}
              className="w-full bg-[#0f9d92] text-white py-3 rounded-xl font-bold"
            >
              {inquiryStatus.loading ? "Sending..." : "Send Inquiry"}
            </button>

          </form>

        ) : (
          <div className="bg-gray-50 p-4 rounded-xl text-center text-sm text-gray-500">
            Only buyers can send inquiries.
          </div>
        )}

        {inquiryStatus.success && (
          <p className="text-green-600 text-sm mt-3">
            Inquiry sent successfully!
          </p>
        )}

        {inquiryStatus.error && (
          <p className="text-red-500 text-sm mt-3">
            {inquiryStatus.error}
          </p>
        )}

      </div>

    </div>

  </div>

</div>
    </div>
    
    </div>
  );
};

export default PropertyDetails;
