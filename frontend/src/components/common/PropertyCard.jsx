import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaHeart,
  FaEye,
  FaBed,
  FaBath,
  FaExpandArrowsAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PropertyCard = ({
  property,
  renderActions,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!property) return null;

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    if (onToggleWishlist) {
      onToggleWishlist(property._id);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link to={`/property/${property._id}`}>
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer">
        {/* Image */}
        <div className="relative h-64">
          <img
            src={property.images?.[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold">
              NEW
            </span>

            <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              VERIFIED
            </span>
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow"
          >
            <FaHeart
              className={
                isWishlisted ? "text-red-500" : "text-gray-400"
              }
            />
          </button>

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <h2 className="text-white text-3xl font-bold">
              {formattedPrice}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex justify-between items-center">
            <span className="uppercase text-teal-600 font-semibold text-sm">
              {property.type}
            </span>

            <div className="flex items-center gap-1 text-gray-500">
              <FaEye />
              <span>{property.views || 0}</span>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-2">
            {property.title}
          </h2>

          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <FaMapMarkerAlt />
            <span>{property.location}</span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-3 border-y my-5 py-4 text-center">
            <div>
              <FaBed className="mx-auto mb-2" />
              <p className="font-bold">{property.bedrooms}</p>
              <small>BEDS</small>
            </div>

            <div>
              <FaBath className="mx-auto mb-2" />
              <p className="font-bold">{property.bathrooms}</p>
              <small>BATHS</small>
            </div>

            <div>
              <FaExpandArrowsAlt className="mx-auto mb-2" />
              <p className="font-bold">{property.area}</p>
              <small>SQ FT</small>
            </div>
          </div>

          <button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/property/${property._id}`);
            }}
          >
            View Details
          </button>

          {renderActions && (
            <div className="mt-4">{renderActions(property)}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;