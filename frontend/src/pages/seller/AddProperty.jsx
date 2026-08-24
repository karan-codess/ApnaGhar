import React, { useState } from 'react'
import{useAuth} from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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


  const handleInputChange=(e)=>{
    setFormData({
        ...formData,[e.target.name]:e.target.value
    })
  }

    const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      const current = prev.amenities || [];
      if (current.includes(amenity)) {
        return { ...prev, amenities: current.filter((a) => a !== amenity) };
      } else {
        return { ...prev, amenities: [...current, amenity] };
      }
    });
  };


  const handleImageChange=(e)=>{
    const files=Array.from(e.target.files);
    if(images.length +files.length>10){
        setError("You can only upload upto 10 images. ")
        return
    }
    setImages((prev)=>[...prev,...files]);
    const previews=files.map((file)=>URL.createObjectURL(file))
    setImagePreviews((prev)=>[...prev,...previews])
  }


  const removeImage=(index)=>{
    setImages((prev)=>prev.filter((_,i)=>i!==index))
    setImagePreviews((prev)=>prev.filter((_,i)=> i!==index))
  }


  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    setError(null)

    const data=new FormData()
    Object.keys(formData).forEach((key)=>{
        if(key==="amenities"){
            formData[key].forEach((a)=>data.append("amenities",a))
        }else{
            data.append(key,formData[key]);
        }
    })
    images.forEach((img)=>data.append("images",img))

    try {
        await axios.post(`${API_URL}/api/property`,data,{
            headers:{
                "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
            }
            
        })
        navigate("/dashboard")
    } catch (err) {
        setError(err.response?.data?.message ||"Failed to add property")
        setLoading(false)
    }
  }
  return (
    <div className='outerContainer'>
        <div className='innerContainer'>
            <div className='header'>
                <h1 className='heading'>List Your property here</h1>
                <p className='subHeading'>fill in the details below to reach thousand of buyer</p>
            </div>

            <form onSubmit={handleSubmit} className='form'>
                {error &&<div className='error'>{error}</div>}
                <div className='section'>
                    <div className='${sectionHeader} ${sectionHeaderLargeMargin}'>
                        <div sectionBar></div>
                        <h3 className='setionTitle'>Content & description</h3>
                    </div>
                    <div className='contentGroupLarge'>
                        <div>
                            <label className='label'>property title</label>
                            <input type="text" name='title' value={formData.title} onChange={handleInputChange} placeholder='e.g. Luxury 3BHK appartment in downtown' className='input' required/>
                        </div>
                        <div>
                            <label className='label'>Detailed Desc</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder='describe the property' className={`$(input) $(textarea)`} required>                               
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className='twoColumnGrid'>
                    <div>
                        <div className='{${sectionHeader} {${sectionHeaderSmallMargin}'>
                            <div className='sectionBar'></div>
                            <h3 className='sectionTitle'>Property Detail</h3>
                            
                        </div>
                        <div className='contetGroupMedium'>
                            <div>
                                <label className='labelSmallMargin'>Property Type</label>
                                <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className='${input} ${select}' >
                                    <option value="flat">Flat/Apartment</option>
                    <option value="villa">Independent House/Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="commercial">Commercial</option>
                                </select>

                            </div>

                            <div className='gridThreeCol'>
                                <div>
                                    <label className='labelSmallMargin'>BHK</label>
                                    <input type="number" name='bhk' value={formData.bhk} onChange={handleInputChange} placeholder='e.g. 3' className='input'/>
                                </div>
                                <div>
                                    <label className='labelSmallMargin'>Bathrooms</label>
                                    <input type="number" name='bathrooms' value={formData.bathrooms ||""} onChange={handleInputChange} placeholder='e.g. 3' className='input'/>
                                </div>
                                <div>
                                    <label className='labelSmallMargin'>Area{Sq.ft}</label>
                                    <input type="number" name='area' value={formData.areaSize} onChange={handleInputChange} placeholder='e.g. 1500' className='input' required/>
                                </div>

                            </div>
                            <div className='gridTwoCol'>
                                <div>
                                    <label className='labelSmallMargin'>Furnishing</label>
                                    <select name="furnishing" value={formData.furnishing} onChange={handleInputChange} className='${input} ${select}'>
                                        <option value="unfurnished">Unfurnished</option>
                      <option value="semi-furnished">Semi-Furnished</option>
                      <option value="furnished">Fully Furnished</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='labelSmallMargin'>Listing Status</label>
                                    <select name="status" value={formData.status} onChange={handleInputChange} className='${input}${select}'>
                                        <option value="sale">For Sale</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div>
                        <div className=''>

                        </div>
                    </div>

                </div>
            </form>

        </div>

    </div>
  )
}

export default AddProperty