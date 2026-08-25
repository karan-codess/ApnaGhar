import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/property/${id}`);
        const p = res.data.property;
        setFormData({
          title: p.title || "",
          description: p.description || "",
          price: p.price || "",
          city: p.city || "",
          area: p.area || "",
          pincode: p.pincode || "",
          propertyType: p.propertyType || "flat",
          bhk: p.bhk || "",
          bathrooms: p.bathrooms || "",
          areaSize: p.areaSize || "",
          furnishing: p.furnishing || "unfurnished",
          status: p.status || "sale",
          amenities: p.amenities || [],
          securityDeposit: p.securityDeposit || "",
          maintenance: p.maintenance || "",
        });
        setExistingImages(p.images || []);
        setLoading(false);
      } catch (err) {
        setError("failed to fetch the property...");
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      const current = prev.amenities || [];
      if (current.includes(amenity)) {
        return {
          ...prev,
          amenities: current.filter((a) => a !== amenity),
        };
      } else {
        return { ...prev, amenities: [...current, amenity] };
      }
    });
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.targe.files);
    if (existingImages.length + newImages.length + files.length > 10) {
      setError("Total images cannot exceed 10");
      return;
    }
    setNewImagePreviews((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeExistingImage = (url) => {
    setExistingImages(existingImages.filter((img) => img !== url));
  };
  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "amenities") {
        data.append("amenities", JSON.stringify(formData[key]));
      } else if (key === "securityDeposit" || key === "maintenance") {
        data.append(key, formData[key] || 0);
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append("existingImages", JSON.stringify(existingImages));
    newImages((img) => data.append("images", img));

    try {
      await axios.put(`${API_URL}/api/property/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update property");
      setSubmitting(false);
    }
  };

  if (loading) {
    <div className="loader-full-page">
      <div className="loader"></div>
    </div>;
  }

  return (
    <div className="pageContainer">
      <div className="innerContainer">
        <div className="headerWRapper">
          <h1 className="pageTitle">Edit property</h1>
          <p className="pageSubTiile">
            Update your property details and manage
          </p>
        </div>
        <form onSubmit={handleSubmit} className="formContainer">
          {error && (
            <div
              style={{
                padding: "1rem",
                background: "#fee2e2",
                color: "#dc2626",
                borderRadius: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              {error}
            </div>
          )}

          <div className="section">
            <div className="sectionHeader">
              <div className="sectionIndicator"></div>
              <h3 className="sectionTitle">Content & Description</h3>
            </div>
            <div className="sectionContent">
              <div>
                <label className="label">Property Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input"
                  required
                  placeholder="e.g. Luxury 3bhk Appartment"
                />
              </div>
              <div>
                <label className="label">Detaled Desc</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the property highLight.."
                  className="textarea"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className={s.twoColumnGrid}>
            {/* Section 2: Property Details */}
            <div>
              <div className={s.sectionHeader}>
                <div className={s.sectionIndicator}></div>
                <h3 className={s.sectionTitle}>Property Details</h3>
              </div>
              <div className={s.sectionContent}>
                <div>
                  <label className={s.label}>Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className={s.select}
                  >
                    <option value="flat">Flat/Apartment</option>
                    <option value="villa">Independent House/Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div className={s.threeColumnGrid}>
                  <div>
                    <label className={s.label}>BHK</label>
                    <input
                      type="number"
                      name="bhk"
                      value={formData.bhk}
                      onChange={handleInputChange}
                      placeholder="e.g. 3"
                      className={s.input}
                    />
                  </div>
                  <div>
                    <label className={s.label}>Bathrooms</label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. 2"
                      className={s.input}
                    />
                  </div>
                  <div>
                    <label className={s.label}>Area (Sq.Ft)</label>
                    <input
                      type="number"
                      name="areaSize"
                      value={formData.areaSize}
                      onChange={handleInputChange}
                      placeholder="e.g. 1500"
                      className={s.input}
                      required
                    />
                  </div>
                </div>
                <div className={s.twoColumnGridInner}>
                  <div>
                    <label className={s.label}>Furnishing</label>
                    <select
                      name="furnishing"
                      value={formData.furnishing}
                      onChange={handleInputChange}
                      className={s.select}
                    >
                      <option value="unfurnished">Unfurnished</option>
                      <option value="semi-furnished">Semi-Furnished</option>
                      <option value="furnished">Fully Furnished</option>
                    </select>
                  </div>
                  <div>
                    <label className={s.label}>Listing Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={s.select}
                    >
                      <option value="sale">For Sale</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Pricing & Location */}
            <div>
              <div className={s.sectionHeader}>
                <div className={s.sectionIndicator}></div>
                <h3 className={s.sectionTitle}>Pricing & Location</h3>
              </div>
              <div className={s.sectionContent}>
                <div>
                  <label className={s.label}>Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 5000000"
                    className={s.input}
                    required
                  />
                </div>

                <div className={s.twoColumnGridInner}>
                  <div>
                    <label className={s.label}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className={s.input}
                      required
                    />
                  </div>
                  <div>
                    <label className={s.label}>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 400001"
                      className={s.input}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className={s.label}>Specific Area</label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g. Worli"
                    className={s.input}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="sectionHeader">
              <div className="sectionIndicator"></div>
              <h3 className="sectionTitle">Amenities</h3>
 
            </div>
            <div className="amenitiesGrid">
              {commonAmenities.map((amenity)=>(
                <label key={amenity} className="amenityLabel(formData.amenities.includes(amenity))">
                  <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={()=>handleAmenityChange(amenity)} className="amenityCheckbox" />
                  <span className="amenityText(formData.amenities.includes(amenity))">
                    {amenity}

                  </span>
                </label>
              ))}

            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
