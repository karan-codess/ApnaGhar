import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";

import {
  HiUser,
  HiOutlineChatAlt2,
  HiHome,
  HiMail,
  HiPhone,
  HiCalendar,
  HiCheckCircle,
  HiExternalLink,
} from "react-icons/hi";

const MyInquiries = () => {
  const { user, token } = useAuth();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      if (!user) return;

      try {
        const endpoint =
          user?.role === "seller" ? "seller" : "my";

        const res = await axios.get(
          `${API_URL}/api/inquiry/${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInquiries(res.data.inquiries || []);
      } catch (err) {
        console.error("Error fetching inquiries:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load inquiries."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user, token]);

  // Mark inquiry as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/api/inquiry/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === id
            ? { ...inq, isRead: true }
            : inq
        )
      );
    } catch (err) {
      console.error("Failed to mark read:", err);
    }
  };

  // Start chat
  const handleStartChat = async (inq) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/chat/start`,
        {
          propertyId: inq.property?._id,
          buyerId: inq.buyer?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/chat-messages", {
        state: {
          chat: res.data,
        },
      });
    } catch (err) {
      console.error("Error starting chat:", err);
      alert("Failed to start chat. Please try again.");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="loader-full-page">
        <div className="loader"></div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div
        className={
          user?.role !== "seller"
            ? "bg-bg-alt min-h-screen"
            : "bg-transparent min-h-screen"
        }
      >
        <div className="container py-12 text-center w-full mx-auto">
          <div className="card-premium py-16 px-4 md:px-8">
            <h2 className="text-[var(--danger)] mb-4">
              Error
            </h2>

            <p className="mb-8">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSeller = user?.role === "seller";

  return (
    <div
      className={
        isSeller
          ? "bg-transparent min-h-screen"
          : "bg-bg-alt min-h-screen"
      }
    >
      <div
        className={`container fade-in w-full max-w-full px-4 sm:px-6 lg:px-8 overflow-hidden ${
          isSeller ? "pt-0" : "py-12 pt-12"
        }`}
      >
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-[2rem] md:text-[2.5rem] mb-2 font-extrabold">
            {isSeller ? "Customer Inquiries" : "My Inquiries"}
          </h1>

          <p className="text-text-muted text-sm md:text-base">
            {isSeller
              ? "Review and respond to interest in your properties"
              : "Track the status of your property inquiries"}
          </p>
        </div>

        {/* No inquiries */}
        {inquiries.length === 0 ? (
          <div className="card-premium py-16 px-6 md:py-24 md:px-8 text-center">
            <div className="bg-[#f8fafc] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#94a3b8]">
              <HiOutlineChatAlt2 size={40} />
            </div>

            <h2 className="mb-4 text-xl md:text-2xl font-bold">
              No Inquiries {isSeller ? "received" : "sent"}
            </h2>

            <p className="text-[#64748b] mb-8 text-sm md:text-base">
              {isSeller
                ? "You have not received any inquiries yet. Better listings get more attention!"
                : "You have not contacted any seller yet. Interested in a property? Send an inquiry!"}
            </p>

            <Link to="/" className="btn btn-primary">
              {isSeller
                ? "Improve My Listings"
                : "Discover Properties"}
            </Link>
          </div>
        ) : (
          /* Inquiry List */
          <div className="flex flex-col gap-4 md:gap-6 w-full">
            {inquiries.map((inq) => (
              <div
                key={inq._id}
                className="card-premium p-5 md:p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-stretch gap-6 overflow-hidden"
              >
                {/* Main */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 flex-1 w-full min-w-0">
                  
                  {/* Property Icon */}
                  <div className="bg-primary-light p-3 md:p-4 rounded-xl text-primary h-fit shrink-0">
                    <HiHome className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <div className="flex-1 min-w-0 w-full">

                    {/* Title */}
                    <div className="flex items-start md:items-center justify-between md:justify-start gap-3 mb-3 flex-wrap">
                      <h3 className="text-[1.1rem] md:text-[1.25rem] font-bold text-text-main break-words">
                        {inq.property?.title}
                      </h3>

                      <span
                        className={`badge shrink-0 px-2 py-1 text-xs whitespace-nowrap ${
                          inq.isRead
                            ? "bg-[#f1f5f9] text-[#64748b]"
                            : "bg-[#eff6ff] text-[#2563eb]"
                        }`}
                      >
                        {inq.isRead ? "Read" : "New"}
                      </span>
                    </div>

                    {/* Buyer Info */}
                    {isSeller && (
                      <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-5 p-3 md:p-4 bg-[#f8fafc] rounded-xl flex-wrap w-full">
                        
                        <div className="flex items-center gap-2 text-[0.85rem] md:text-sm text-[#475569] break-all sm:break-normal min-w-0">
                          <HiUser className="text-[#94a3b8] shrink-0" />
                          <span className="font-semibold text-text-main">
                            {inq.buyer?.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[0.85rem] md:text-sm text-[#475569] break-all sm:break-normal min-w-0">
                          <HiMail className="text-[#94a3b8] shrink-0" />
                          {inq.buyer?.email}
                        </div>

                        <div className="flex items-center gap-2 text-[0.85rem] md:text-sm text-[#475569] break-all sm:break-normal min-w-0">
                          <HiPhone className="text-[#94a3b8] shrink-0" />
                          {inq.buyer?.phone || "No phone provided"}
                        </div>

                      </div>
                    )}

                    {/* Message */}
                    <p className="text-[#334155] text-[0.95rem] md:text-base italic mb-5 pl-3 border-l-[3px] border-[#e2e8f0] break-words">
                      "{inq.message}"
                    </p>

                    {/* Meta */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-[0.8rem] md:text-[0.8125rem] text-[#64748b] font-medium w-full flex-wrap">
                      
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <HiCalendar size={16} />

                        {isSeller ? "Received" : "Sent"} on{" "}

                        {new Date(
                          inq.createdAt
                        ).toLocaleDateString()}
                      </div>

                      {isSeller && (
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <HiCheckCircle size={16} />

                          {inq.isRead
                            ? "Seller Viewed"
                            : "Waiting for seller"}
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-[160px] lg:shrink-0 lg:ml-6 pt-4 lg:pt-0 border-t border-[#f1f5f9] lg:border-t-0 justify-center">

                  <Link
                    to={`/property/${inq.property?._id}`}
                    className="btn btn-outline py-2.5 px-4 md:py-3 w-full justify-center flex items-center gap-2 text-sm"
                  >
                    View Property
                    <HiExternalLink />
                  </Link>

                  {isSeller && !inq.isRead && (
                    <button
                      onClick={() => markAsRead(inq._id)}
                      className="btn btn-primary py-2.5 px-4 md:py-3 w-full justify-center text-sm"
                    >
                      Mark as read
                    </button>
                  )}

                  {isSeller && (
                    <button
                      onClick={() => handleStartChat(inq)}
                      className="btn py-2.5 px-4 md:py-3 w-full justify-center bg-[#2563eb] text-white hover:bg-[#1d4ed8] flex items-center gap-2 text-sm rounded-xl font-semibold shadow-sm"
                    >
                      <HiOutlineChatAlt2 />
                      Message
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInquiries;
