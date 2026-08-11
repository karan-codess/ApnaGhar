import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"buyer",
    })

    const[error,setError]=useState("")
    const[success,setSuccess]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    const [showPassword,setShowPassword]=useState(false)

    const {register}=useAuth()
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        setError("")
        setSuccess("")
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")

        const result=await register(formData)

        if(result.success){
            setSuccess("Registration successful! redirecting to verification...")
            setTimeout(
                ()=>navigate("/verify-email",{state:{email:formData.email}}),
                    1500
            )
        }else{
            setError(result.message)
        }
        setIsLoading(false)
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0D9488] mb-2">
            Create Account
          </h1>

          <p className="text-gray-500 text-sm">
            Join our community to find or list properties
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-[#0D9488] transition-colors placeholder-gray-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-[#0D9488] transition-colors placeholder-gray-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-[#0D9488] transition-colors placeholder-gray-300 pr-10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          {/* Select Role */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Select Role
            </label>

            <div className="grid grid-cols-2 gap-4">

              {/* Buyer */}
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    role: "buyer",
                  }))
                }
                className={`py-3 px-4 rounded-lg border text-sm font-semibold transition-all ${
                  formData.role === "buyer"
                    ? "border-[#0D9488] bg-[#F0FDF4] text-slate-800"
                    : "border-gray-200 bg-white text-slate-700 hover:bg-gray-50"
                }`}
              >
                Buyer
              </button>

              {/* Seller */}
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    role: "seller",
                  }))
                }
                className={`py-3 px-4 rounded-lg border text-sm font-semibold transition-all ${
                  formData.role === "seller"
                    ? "border-[#0D9488] bg-[#F0FDF4] text-slate-800"
                    : "border-gray-200 bg-white text-slate-700 hover:bg-gray-50"
                }`}
              >
                Seller
              </button>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0D9488] hover:bg-[#0F766E] disabled:bg-gray-400 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm mt-2"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-600 mt-6 font-medium">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#0D9488] font-bold hover:underline"
          >
            Sign in here
          </button>
        </p>

      </div>
    </div>
  )
}

export default Register