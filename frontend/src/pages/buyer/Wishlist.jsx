import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import API_URL from '../../config'
import { Link } from 'react-router-dom'
import PropertyCard from '../../components/common/PropertyCard'
import { HiTrash, HiHeart } from 'react-icons/hi'

const Wishlist = () => {

    const{token}=useAuth()
    const [wishlistItems, setWishlistItems] = useState([])
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(null)

    useEffect(()=>{
        fetchWishlist()
    },[token])


    const fetchWishlist=async()=>{
        try {
            const res=await axios.get(`${API_URL}/api/wishlist`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            setWishlistItems(res.data)
            setLoading(false)
        } catch (err) {
            setError("failed to load wishlist")
            setLoading(false)
        }
    }


    const removeFromWishlist=async(propertyId)=>{
        if(!propertyId){
            alert("invalid property id")
            return
        }
        try {
            await axios.delete(`${API_URL}/api/wishlist/${propertyId}`,{
                headers:{Authorization:`Bearer ${token}`}
            })
             setWishlistItems((prev)=>prev.filter((item)=>item.property && item.property._id !==propertyId))
            // setLoading(false)
        } catch (err) {
            const errMsg=err.response?.data?.message||"failed to remove from wishlist"
            alert(errMsg)
        }
    }

    if(loading)
        return(
            <div className="loader-full-page">
                <div className="loader">

                </div>
            </div>
        )

    if(error)
        return(
            <div className="text-center py-24 text-red-500">
                {error}
            </div>
        )
  return (
    <div className="bg-bg-alt min-h-screen pt-32 max-lg:pt-28">
        <main className='container fade-in py-12 px-4 md:px-8'>
            <div className='mb-12'>
                <h1 className='text-[2.5rem] mb-2'>
                    Your Wishlist

                </h1>
                <p className='text-text-muted'>
                    Properties you saved for latyer

                </p>

            </div>
            {wishlistItems.length===0 ?(
                <div className='bg-white rounded-3xl border border-gray-200 shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl py-24 px-8 text-center'>
    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
        <HiHeart size={40}/>
    </div>
    <h2 className='mb-4 text-2xl font-bold text-gray-800'>Your wishlist is empty</h2>
    <p className='text-gray-500 mb-8'>
        start exploring properties and save your favourites
    </p>
    <Link to="/" className='inline-block px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition'>
        Browse Properties
    </Link>
</div>
            ):(
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:justify-items-center'>
                    {console.log("ALL WISHLIST ITEMS:", wishlistItems)}
                    {wishlistItems.filter((item)=>item.property).map((item)=>(
                        <PropertyCard key={item._id} property={item.property} renderActions={()=>(
                            <button onClick={(e)=>{
                                e.preventDefault();
                                e.stopPropagation()
                                removeFromWishlist(item.property._id)
                            }} className='btn w-full p-3 rounded-xl bg-[#fff5f5] text-[#ef4444] border border-[#fee2e2] flex items-center justify-center gap-2 font-bold'>
                                <HiTrash size={18}/>
                                remove from Wishlist

                            </button>
                        )}/>
                    ))}

                </div>
            )}

        </main>
    </div>
  )
}

export default Wishlist