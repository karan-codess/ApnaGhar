import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'lucide-react';

const PropertyCard = ({
    property,
    renderActions,
    isWishlisted,
    onToggleWishlist
}) => {
    if(!property) return null;
    const {user}=useAuth();
    const navigate=useNavigate()

    const handleWishlistClick=(e)=>{
        e.preventDefault()
        e.stopPropagation()

        if(!user){
            navigate("/login")
            return
        }

        if(onToggleWishlist){
            onToggleWishlist(property._id)
        }
    }
    const formattedPrice=new Intl.NumberFormat("en-IN",{
        style:"currency",
        currency:"INR",
        maximumFractionDigits:0,
    }).format(property.price)

    const statusBadgeClass=s.badgeStatus(property.status)



  return (
    <div>
        <Link to={`/property/${property._id}`}>
        </Link>
    </div>
  )
}

export default PropertyCard