import axios from "axios";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import API_URL from "../../config";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("passwords do not matched");
    }
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/reset-password/${token}`,
        {
          password,
        },
      );
      if (res.data.success) {
        setSuccess(
          "Password has been reset Successfully ! Redirecting to login...",
        );
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "password reset failed.token may be invalid or expired",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bg-alt min-h-screen pt-32 max-lg:pt-28">
      <div className="container flex justify-center items-center pt-16 sm:pt-8">
        <div className="glass fade-in w-full max-w-[450px] p-10 sm:p-6 rounded-3xl sm:rounded-2xl shadow-card">
          <h2 className="text-[2rem] sm:text-2xl font-bold text-center mb-2 text-primary">
            Reset Password
          </h2>
          <p className="text-center text-text-muted mb-8">
            Create a new password for your account
          </p>
          {error && (
            <div className="p-3 bg-red-100 text-red-600 rounded-lg mb-4 text-sm text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-100 text-green-600 rounded-lg mb-4 text-sm text-center">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block mb-2 font-medium">New Password</label>
              <div style={{position:"relative"}}>
                <input type={showPassword ?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)}
                placeholder="••••••" required className="w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors" style={{paddingRight:"40px"}} />

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
            <div>
              <label className="block mb-2 font-medium">Confirm New Password</label>
              <div style={{position:"relative"}}>
                <input type={showConfirmPassword ?"text":"password"} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="••••••" required className="w-full py-3 px-4 rounded-lg border border-border outline-none focus:border-primary transition-colors" style={{paddingRight:"40px"}} />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>

              </div>
            </div>
            <button className="btn btn-primary p-3.5 text-base mt-2" type="submit" disabled={isLoading}>
                {isLoading ?"Reseting...":"Reset Password"}

            </button>
          </form>
          <p className="text-center mt-8 text-text-muted">
            Back top <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>

          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
