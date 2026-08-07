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
    </div>
  );
};

export default PropertyDetails;
