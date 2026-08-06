import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import axios from "axios";
import API_URL from "../../config";
import { useAuth } from "../../context/AuthContext";

const Collection = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [wishlistedIds, setWishlistedIds] = useState([]);

  useEffect(() => {
    fetchProperties();
    // fetchCounts();
    if (user) {
      fetchWishlist();
    }
  }, [user]);

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

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/property`);
      setProperties(res.data.properties || res.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="bg-blue-500 text-black w-full h-auto py-16 px-4">
      <div className="flex justify-center">
        <span className="bg-[#DFF8F5] text-[#169A8D] px-5 py-2 rounded-full font-semibold text-sm">
          HANDPICKED FOR YOU
        </span>
      </div>
      <h2 className="text-center text-4xl md:text-6xl font-black mt-8 text-slate-900">
        Featured Collections
      </h2>

      <p className="text-center text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-9">
        Discover high-value properties curated by our experts for their
        exceptional design, location, and investment potential.
      </p>

      <div className="max-w-7xl mx-auto mt-12">
        {loading && (
          <div className="flex justify-center items-center py-20 min-h-[400px]">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-[#169A8D] rounded-full animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 font-semibold py-10">
            Error: {error}
          </div>
        )}
        {!loading && !error && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {properties
              .filter((p) => p)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 6)
              .map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  isWishlisted={wishlistedIds.includes(String(property._id))}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
