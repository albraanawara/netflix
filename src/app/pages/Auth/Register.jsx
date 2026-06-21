import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.string().email("Invalid email"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",

    path: ["confirmPassword"],
  });

export const Component = () => {
  const navigate = useNavigate();

  const { setUsers } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((user) => user.email === data.email);

    if (exists) {
      toast.error("Email already exists");

      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = {
      name: data.name,

      email: data.email,

      password: hashedPassword,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",

      JSON.stringify(users),
    );
    setUsers(users);

    toast.success("Account Created Successfully");

    navigate("/login");

    console.log("Registered User:", newUser);
    console.log("Registered User:", users);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-4 transition-colors">
      <div className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-600 dark:text-teal-400">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
              placeholder="Name"
              {...register("name")}
            />
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <input
              className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
              placeholder="Email"
              {...register("email")}
            />
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="password"
              className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
              placeholder="Password"
              {...register("password")}
            />
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <div>
            <input
              type="password"
              className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 dark:text-teal-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
