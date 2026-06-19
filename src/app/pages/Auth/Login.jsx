import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";
import { AuthContext } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find((user) => user.email === data.email);

    if (!foundUser) {
      setLoginError("Invalid email or password");

      toast.error("Invalid email or password");

      return;
    }

    const isMatch = await bcrypt.compare(data.password, foundUser.password);

    if (!isMatch) {
      setLoginError("Invalid email or password");

      toast.error("Invalid email or password");

      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    setUser(foundUser);

    toast.success("Welcome Back");

    navigate("/");
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-white px-4">
      
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-400">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-teal-500"
              placeholder="Email"
              {...register("email")}
            />
            <p className="text-red-400 text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-teal-500"
              placeholder="Password"
              {...register("password")}
            />
            <p className="text-red-400 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Server error */}
          {loginError && (
            <p className="text-red-400 text-center text-sm">
              {loginError}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-500 transition font-semibold"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-zinc-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-teal-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
