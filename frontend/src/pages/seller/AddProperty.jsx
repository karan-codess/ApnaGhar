import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiUpload, HiX } from "react-icons/hi";

const AddProperty = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    area: "",
    pincode: "",
    propertyType: "flat",
    bhk: "",
    bathrooms: "",
    areaSize: "",
    furnishing: "unfurnished",
    status: "sale",
    amenities: [],
    securityDeposit: "",
    maintenance: "",
  });

  const commonAmenities = [
    "Parking",
    "Pool",
    "Gym",
    "Security",
    "Wifi",
    "Power Backup",
    "Club House",
    "Garden",
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      const current = prev.amenities || [];

      if (current.includes(amenity)) {
        return {
          ...prev,
          amenities: current.filter((a) => a !== amenity),
        };
      }

      return {
        ...prev,
        amenities: [...current, amenity],
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 10) {
      setError("You can only upload up to 10 images.");
      return;
    }

    setError(null);

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setImagePreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "amenities") {
        formData[key].forEach((amenity) => {
          data.append("amenities", amenity);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      await axios.post(`${API_URL}/api/property`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in px-4 py-8 md:py-12 w-full mx-auto dashboard-content">

      <div className="max-w-[900px] w-full mx-auto">

        {/* HEADER */}
        <div className="mb-12 text-center">

          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] mb-4 text-text-main font-extrabold">
            List Your Property Here
          </h1>

          <p className="text-text-muted text-base">
            Fill in the details below to reach thousands of buyers
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="card-premium p-6 md:p-10"
        >

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-8">
              {error}
            </div>
          )}

          {/* CONTENT & DESCRIPTION */}
          <div className="mb-12">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-1 h-6 bg-primary rounded-sm"></div>

              <h3 className="text-xl font-extrabold text-text-main">
                Content & Description
              </h3>

            </div>

            <div className="flex flex-col gap-6">

              <div>
                <label className="block mb-2.5 text-sm font-bold text-text-main">
                  Property Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Luxury 3BHK apartment in downtown"
                  className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block mb-2.5 text-sm font-bold text-text-main">
                  Detailed Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the property"
                  className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors h-[120px] resize-none leading-relaxed"
                  required
                />
              </div>

            </div>
          </div>

          {/* PROPERTY + PRICING */}
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mb-12">

            {/* PROPERTY DETAILS */}
            <div>

              <div className="flex items-center gap-4 mb-6">

                <div className="w-1 h-6 bg-primary rounded-sm"></div>

                <h3 className="text-xl font-extrabold text-text-main">
                  Property Details
                </h3>

              </div>

              <div className="flex flex-col gap-5">

                {/* PROPERTY TYPE */}
                <div>

                  <label className="block mb-2 text-sm font-bold text-text-main">
                    Property Type
                  </label>

                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="flat">
                      Flat/Apartment
                    </option>

                    <option value="villa">
                      Independent House/Villa
                    </option>

                    <option value="penthouse">
                      Penthouse
                    </option>

                    <option value="commercial">
                      Commercial
                    </option>
                  </select>

                </div>

                {/* BHK / BATHROOM / AREA */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <div>
                    <label className="block mb-2 text-sm font-bold text-text-main">
                      BHK
                    </label>

                    <input
                      type="number"
                      name="bhk"
                      value={formData.bhk}
                      onChange={handleInputChange}
                      placeholder="e.g. 3"
                      className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold text-text-main">
                      Bathrooms
                    </label>

                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="e.g. 3"
                      className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold text-text-main">
                      Area (Sq.ft)
                    </label>

                    <input
                      type="number"
                      name="areaSize"
                      value={formData.areaSize}
                      onChange={handleInputChange}
                      placeholder="e.g. 1500"
                      className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                      required
                    />
                  </div>

                </div>

                {/* FURNISHING / STATUS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block mb-2 text-sm font-bold text-text-main">
                      Furnishing
                    </label>

                    <select
                      name="furnishing"
                      value={formData.furnishing}
                      onChange={handleInputChange}
                      className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="unfurnished">
                        Unfurnished
                      </option>

                      <option value="semi-furnished">
                        Semi-Furnished
                      </option>

                      <option value="furnished">
                        Fully Furnished
                      </option>
                    </select>

                  </div>

                  <div>

                    <label className="block mb-2 text-sm font-bold text-text-main">
                      Listing Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="sale">
                        For Sale
                      </option>
                    </select>

                  </div>

                </div>

              </div>
            </div>

            {/* PRICING & LOCATION */}
            <div>

              <div className="flex items-center gap-4 mb-6">

                <div className="w-1 h-6 bg-primary rounded-sm"></div>

                <h3 className="text-xl font-extrabold text-text-main">
                  Pricing & Location
                </h3>

              </div>

              <div className="flex flex-col gap-5">

                <div>

                  <label className="block mb-2 text-sm font-bold text-text-main">
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 500000"
                    className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                    required
                  />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block mb-2 text-sm font-bold text-text-main">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                      required
                    />

                  </div>

                  <div>

                    <label className="block mb-2 text-sm font-bold text-text-main">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 400001"
                      className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                      required
                    />

                  </div>

                  <div>

                    <label className="block mb-2 text-sm font-bold text-text-main">
                      Specific Area
                    </label>

                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. Worli"
                      className="w-full py-3.5 px-4 rounded-xl border border-[#e2e8f0] outline-none bg-white text-[0.9375rem] focus:border-primary transition-colors"
                      required
                    />

                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* AMENITIES */}
          <div className="mb-12">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-1 h-6 bg-primary rounded-sm"></div>

              <h3 className="text-xl font-extrabold text-text-main">
                Amenities
              </h3>

            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">

              {commonAmenities.map((amenity) => {

                const active =
                  formData.amenities.includes(amenity);

                return (
                  <label
                    key={amenity}
                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-200 ${
                      active
                        ? "bg-primary-light border-primary"
                        : "bg-[#f8fafc] border-[#e2e8f0]"
                    }`}
                  >

                    <input
                      type="checkbox"
                      className="accent-primary w-4 h-4"
                      checked={active}
                      onChange={() =>
                        handleAmenityChange(amenity)
                      }
                    />

                    <span
                      className={`text-sm font-semibold ${
                        active
                          ? "text-primary"
                          : "text-text-main"
                      }`}
                    >
                      {amenity}
                    </span>

                  </label>
                );
              })}

            </div>
          </div>

          {/* IMAGES */}
          <div className="mb-12">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-1 h-6 bg-primary rounded-sm"></div>

              <h3 className="text-xl font-extrabold text-text-main">
                Property Images
              </h3>

            </div>

            <div className="border-2 border-dashed border-[#cbd5e1] p-12 rounded-xl text-center cursor-pointer relative bg-[#f8fafc] transition-colors hover:border-primary">

              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />

              <div className="flex justify-center mb-4">
                <HiUpload size={40} />
              </div>

              <h4 className="mb-2 text-text-main font-bold">
                Upload up to 10 high quality images
              </h4>

              <p className="text-sm text-text-muted">
                PNG, JPG supported
              </p>

            </div>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 mt-8">

                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden border border-[#f1f5f9] shadow-sm"
                  >

                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-[#dc2626] text-white border-none rounded-full w-5 h-5 flex items-center justify-center cursor-pointer z-10 shadow-md"
                    >
                      <HiX size={12} />
                    </button>

                  </div>
                ))}

                {images.length < 10 && (
                  <div className="aspect-square border-2 border-dashed border-[#cbd5e1] rounded-xl flex flex-col items-center justify-center cursor-pointer relative bg-[#f8fafc] transition-colors hover:border-primary">

                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />

                    <HiUpload size={20} />

                    <span className="text-xs font-bold text-[#64748b] mt-1.5">
                      Add More
                    </span>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className="mt-12 flex justify-center flex-wrap gap-5 border-t border-[#f1f5f9] pt-10">

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn btn-outline py-3.5 px-10 font-bold min-w-[140px]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary py-3.5 px-12 font-bold min-w-[180px]"
            >
              {loading
                ? "Publishing..."
                : "Publish Listing"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProperty;