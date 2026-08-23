import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";
import PropertyCard from "../../components/common/PropertyCard";
import axios from "axios";
import { Link } from "react-router-dom"; // इम्पोर्ट जोड़ा गया
import { HiOutlineExternalLink, HiOutlineTrash } from "react-icons/hi";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/properties`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const props = Array.isArray(res.data)
          ? res.data
          : res.data.properties || [];
        setProperties(props);
        setLoading(false);
      } catch (err) {
        console.error("failed to load properties:", err);
        setLoading(false);
      }
    };
    fetchProperties();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("are you sure you want to delete this property?"))
      return;

    try {
      await axios.delete(`${API_URL}/api/admin/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // सही फ़िल्टर लॉजिक ताकि डिलीट होने पर प्रॉपर्टी लिस्ट से हट जाए
      setProperties(properties.filter((p) => p._id !== id));
    } catch (err) {
      alert("failed to delete property");
    }
  };

  if (loading)
    return (
      <div className="loader-full-page">
        <div className="loader"></div>
      </div>
    );

  return (
    <>
      <div className="mb-12">
        <h1 className="text-[2rem] font-extrabold text-text-main mb-2">Property</h1>
        <p className="text-text-muted">Review and manage all property</p>
      </div>
      <div className="mb-12">
        {properties.length === 0 ? (
          <div className="card-premium p-16 text-center text-[#64748b]">
            No properties pending moderation.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 justify-items-center max-sm:grid-cols-1 max-sm:px-4">
            {properties.map((p) => (
              <PropertyCard
                key={p._id}
                property={p}
                renderActions={() => (
                  <div className="flex-1 flex gap-2 items-center">
                    <div className="text-[0.75rem] text-[#64748b] flex-1">
                      <div className="font-bold">
                        Seller: {p.seller?.name || "Unknown"}
                      </div>
                      <div className="text-[0.7rem]">{p.seller?.email}</div>
                    </div>
                    <div className="flex gap-1">
                      <Link to={`/property/${p._id}`} className="btn btn-outline p-2">
                        <HiOutlineExternalLink size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="btn bg-[#fef2f2] text-[#dc2626] p-2 border border-[#fee2e2] hover:bg-red-100"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </div>
                )}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProperties;