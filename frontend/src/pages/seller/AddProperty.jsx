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
                        <div className='${sectionHeader}${sectionHeaderSmallMargin}'>
                            <div className='sectionBar'></div>
                            <h3 className='sectionTitle'>Pricing & Location</h3>

                        </div>
                        <div className='contentGroupSmall'>
                            <div>
                                <label className='labelSmallMargin'>Price ()</label>
                                <input type="number" value={formData.price} placeholder='e.g. 500000' className='input' required name='price' />
                            </div>
                            <div className='gridTwoCol'>
                                <div>
                                    <label className='lebelSmallMargin'>City</label>
                                    <input type="text" name='city' value={formData.city}  onChange={handleInputChange} placeholder='e.g. Mumbai' className='input' required/>
                                </div>
                                <div>
                                    <label className='lebelSmallMargin'>Pincode</label>
                                    <input type="text" name='pincode' value={formData.pincode}  onChange={handleInputChange} placeholder='e.g. 400001' className='input' required/>
                                </div>
                                <div>
                                    <label className='lebelSmallMargin'>Specific Area</label>
                                    <input type="text" name='area' value={formData.area}  onChange={handleInputChange} placeholder='e.g. worli' className='input' required/>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className='section'>
                        <div className='${sectionHeader}${sectionHeaderSmallMargin}'>
                            <div className='sectionBar'></div>
                            <h3 className='sectionTitle'>Amenities</h3>
                        </div>
                        <div className='amenitiesGrid'>
                            {commonAmenities.map((amenity)=>(
                                <label key={amenity} className='${amenityLabelBase} ${formData.amenities.includes(amenity)?amenityLabelActive:amenityLabelInactive}'>
                                    <input type="checkbox" className='amenityCheckbox' checked={formData.amenities.includes(amenity)} onChange={()=>handleInputChange(amenity)} />
                                    <span className='${amenityTextBase} ${formData.amenities.includes(amenity)?amenityTextActive:amenityTextInactive}'>
                                        {amenity}

                                    </span>
                                </label>
                            ))}

                        </div>

                    </div>
                    <div className='section'>
                        <div className='${sectionHeader}${sectionSmallSmallMargin}'>
                            <div className='sectionBar'></div>
                            <h3 className='sectionTitle'>Propert Images</h3>
                        </div>
                        <div className='uploadArea'>
                            <input type="file" multiple onChange={handleInputChange} className='absolute inset-0 opacity-0 cursor-pointer' accept="image/*"/>
                            <div className='uploadIconWrapper'>
                                <HiUpload size={40} color="#64748b" />

                            </div>
                            <h4 className="uploadTitle">
                                upload upto 10 high quality images.. (PNG,JPG)
                            </h4>

                        </div>
                        {imagePreviews.length>0 &&(
                            <div className='previewsGrid'>
                                {imagePreviews.map((src,i)=>(
                                    <div key={i} className='previewItem' >
                                        <img src={src} alt="preview" className='w-full h-full object-cover' />
                                        <button type='button' onClick={()=>removeImage(i)}
                                            className='removeButton' style={{transform:"rotate(45deg)"}}>
                                                <HiUpload size={12}/>
                                        </button>

                                    </div>
                                ))}

                                {images.length<10 &&(
                                    <div className='addMoreBox'>
                                        <input type="file" multiple onChange={handleInputChange} className='absolute inset-0 opacity-0 cursor-pointer accept="images/*' />
                                        <HiUpload size={20} color="#64748b"/>
                                        <span className='addMoreText'>Add More</span>

                                    </div>
                                )}

                            </div>
                        )}
                        

                    </div>

                    <div className='footerButton'>
                        <button type='button' onClick={()=>navigate("/dashboard")} className='cancelButton'>
Cancel
                        </button>
                        <button type='submit' className='submitButton' disabled={loading}>
                            {loading ?"Publishing...":"Publish Listing"}

                        </button>

                    </div>

                </div>
            </form>

        </div>

    </div>
  )
}

export default AddProperty