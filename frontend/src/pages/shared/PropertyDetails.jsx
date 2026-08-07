import React, { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API_URL from '../../config';
import axios from 'axios';

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

  useEffect(()=>{
    const fetchDetails=async()=>{
        try{
            setLoading(true)
            const res=await axios.get(`${API_URL}/api/property/${id}`,
        {
            headers:token ?{Authorization: `Bearer ${token}`}:{},
        })
        setProperty(res.data.property)
        setSimilarProperties(res.data.similarProperties || [])

        if(user && user.role==="buyer"){
            const wishRes=await axios.get(`${API_URL}/api/wishlist`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            const found=wishRes.data.some((item)=>item.property ?._id ===id)
            setIsInWishlist(found)
        }
        }catch(error){
            setError("failed to load property details")
            setLoading(false)
        }
    }
    fetchDetails()
  },[id,user,token])



  return (
    <div className='bg-[#fdfdfd] min-h-screen pb-24 pt-32 max-lg:pt-28'>
        <Navbar />

    </div>
  )
}

export default PropertyDetails