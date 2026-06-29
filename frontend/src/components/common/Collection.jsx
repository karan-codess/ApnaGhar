import React from "react";
import {
  Heart,
  MapPin,
  Eye,
  BedDouble,
  Bath,
  Maximize,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import PropertyCard from "./PropertyCard";

// const properties = [
//   {
//     id: 1,
//     image:
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
//     price: "₹1,65,00,000",
//     category: "FLAT",
//     title: "DLF Urban Grande Towers",
//     location: "Sector 62 Extension, Near NH-24, Delhi",
//     views: 58,
//     beds: 3,
//     baths: 3,
//     area: "1850",
//   },
//   {
//     id: 2,
//     image:
//       "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
//     price: "₹1,85,00,000",
//     category: "FLAT",
//     title: "Emerald Sky Signature Villas",
//     location: "Sector 150, Noida",
//     views: 28,
//     beds: 4,
//     baths: 4,
//     area: "2400",
//   },
//   {
//     id: 3,
//     image:
//       "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
//     price: "₹56,00,000",
//     category: "COMMERCIAL",
//     title: "Coral Bay Elite Residency",
//     location: "Vibhuti Khand, Gomti Nagar",
//     views: 15,
//     beds: "Sale",
//     baths: 980,
//     area: "OK",
//   },
// ];

const Collection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="bg-[#DFF8F5] text-[#169A8D] px-5 py-2 rounded-full font-semibold text-sm">
            HANDPICKED FOR YOU
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-6xl font-black mt-8 text-slate-900">
          Featured Collections
        </h2>

        <p className="text-center text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-9">
          Discover high-value properties curated by our experts for their
          exceptional design, location, and investment potential.
        </p>


        {/* <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {properties.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-[30px] overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition duration-300"
            >


              <div className="relative">

                <img
                  src={item.image}
                  alt=""
                  className="w-full h-72 object-cover"
                />

  
                <div className="absolute top-5 left-5 flex gap-3">

                  <span className="bg-white rounded-full px-4 py-1 text-sm font-bold">
                    NEW
                  </span>

                  <span className="bg-[#169A8D] text-white rounded-full px-4 py-1 text-sm font-bold flex items-center gap-2">
                    <ShieldCheck size={14} />
                    VERIFIED
                  </span>

                </div>


                <button className="absolute top-5 right-5 bg-white rounded-full w-12 h-12 flex items-center justify-center">
                  <Heart />
                </button>


                <h3 className="absolute bottom-4 left-5 text-white text-4xl font-black">
                  {item.price}
                </h3>

              </div>

  
              <div className="p-6">

                <div className="flex justify-between">

                  <span className="text-[#169A8D] font-bold text-sm">
                    {item.category}
                  </span>

                  <span className="flex items-center gap-1 text-gray-500">
                    <Eye size={18} />
                    {item.views}
                  </span>

                </div>

                <h3 className="text-3xl font-bold mt-3">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 mt-3">
                  <MapPin size={18} />
                  <span>{item.location}</span>
                </div>

  
                <div className="grid grid-cols-3 mt-8 border-t border-gray-200">

                  <div className="text-center py-5 border-r">
                    <BedDouble className="mx-auto text-gray-500" />
                    <h4 className="font-bold mt-2">{item.beds}</h4>
                    <p className="text-xs text-gray-500 uppercase">
                      Beds
                    </p>
                  </div>

                  <div className="text-center py-5 border-r">
                    <Bath className="mx-auto text-gray-500" />
                    <h4 className="font-bold mt-2">{item.baths}</h4>
                    <p className="text-xs text-gray-500 uppercase">
                      Baths
                    </p>
                  </div>

                  <div className="text-center py-5">
                    <Maximize className="mx-auto text-gray-500" />
                    <h4 className="font-bold mt-2">{item.area}</h4>
                    <p className="text-xs text-gray-500 uppercase">
                      SQ FT
                    </p>
                  </div>

                </div>

                <button className="group mt-6 w-full bg-[#169A8D] hover:bg-[#11887c] text-white rounded-full py-4 px-6 flex items-center justify-between transition">

                  <span className="font-semibold text-lg">
                    View Details
                  </span>

                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition">
                    <ArrowRight size={20} />
                  </div>

                </button>

              </div>

            </div>

          ))}

        </div> */}

        {
            loading?(
                <div >
                    <div></div>
                </div>
            ):error?(<div>
                <p>{error}</p>
            </div>):(
                <div>
                    {properties
                .filter((p) => p)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 6)
                .map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    isWishlisted={wishlistedIds.includes(String(property._id))}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
                </div>
            )
        }


      </div>
    </section>
  );
};

export default Collection;