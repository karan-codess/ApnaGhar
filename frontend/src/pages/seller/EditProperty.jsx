import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

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

  useEffect(()=>{
    const fetchProperty=async()=>{
        try {
            const res=await axios.get(`${API_URL}/api/property/${id}`)
            const p=res.data.property;
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
        setExistingImages(p.images ||[])
        setLoading(false);

        } catch (err) {
            setError("failed to fetch the property...")
            setLoading(false)
        }
    }
    fetchProperty()
  },[id])

const handleInputChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}
const handleAmenityChange=(amenity)=>{
    setFormData((prev)=>{
        const current=prev.amenities ||[];
        if(current.includes(amenity)){
            return{
                ...prev,amenities:current.filter((a)=>a!==amenity)}
        }else{
              return  {...prev,amenities:[...current,amenity]}
            }
    })
}

const handleNewImageChange=(e)=>{
  const files=Array.from(e.targe.files)
  if(existingImages.length+newImages.length+files.length>10){
    setError("Total images cannot exceed 10");
    return;
  }
  setNewImagePreviews((prev)=>[...prev,...files])
  const previews=files.map((file)=>URL.createObjectURL(file))
  setNewImagePreviews((prev)=>[...prev,...previews])
}


  return (
    <div className='pageContainer'>
        <div className='innerContainer'>
            <div className='headerWRapper'>
                <h1 className='pageTitle'>Edit property
                </h1>
                <p className='pageSubTiile'>
                    Update your property details and manage
                </p>

            </div>

        </div>

    </div>
  )
}

export default EditProperty