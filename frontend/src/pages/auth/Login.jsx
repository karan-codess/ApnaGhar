import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(formData.email,formData.password);

    if (result.success) {
      const storedUser=JSON.parse(
        localStorage.getItem("user")|| sessionStorage.getItem("user"),
      )
      if(storedUser?.role==="admin"){
        navigate("/admin-dashboard");
      }else if(storedUser?.role==="seller"){
        navigate("/dashboard")
      }else{
        navigate("/")
      }
    }else{
        setError(result.message)
    }
    setIsLoading(false) 
  };

  return (
    <div className="bg-bg-alt min-h-screen pt-32 max-lg:pt-28">
      <div className="container flex justify-center items-center pt-16 sm:pt-8">
        <div className="glass fade-in w-full max-w-[450px] p-10 sm:p-6 rounded-3xl sm:rounded-2xl shadow-card">
          <h2 className="text-[2rem] sm:text-2xl font-bold text-center mb-2 text-primary">
            Welcome Back
          </h2>
          <p className="text-center text-text-muted mb-8">
            Please enter your details to sign in
          </p>

          {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
                <label className="block mb-2 font-medium">Email Address</label>
                <input type="email" name="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required className="w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors" />
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block mb-2 font-medium">Password</label>
                    <Link to="/forgot-password" className="text-sm text-primary font-medium hover:underline">Forgot Password?</Link>
                </div>
                <div style={{position:"relative"}}>
                    <input type={showPassword ? "text":"password"} name="password" placeholder="••••••"
                    onChange={handleChange} required className="w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors" style={{paddingRight:"40px"}}/>

                    
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    padding: 0
                  }}
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>

                </div>
            </div>
            <button className="btn btn-primary p-3.5 text-base mt-2" type="submit" disabled={isLoading}>
                {isLoading ? "Signing In...":"Sign In"}

            </button>
          </form>

          <p className="text-center mt-8 text-text-muted">
            Don't have an account?
            <Link to="/register" className="text-primary font-semibold hover:underline">
            Create an account</Link>

          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
