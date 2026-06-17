import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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

export default function Register() {
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
    <div
      className="
      flex 
      justify-center 
      items-center 
      min-h-[80vh]
    "
    >
      <div
        className="
        w-full 
        max-w-md 
        bg-white 
        p-8 
        rounded-xl 
        shadow-lg
      "
      >
        <h1
          className="
          text-3xl 
          font-bold 
          text-center 
          mb-6
        "
        >
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              className="
                w-full 
                border 
                rounded-lg 
                p-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              placeholder="Name"
              {...register("name")}
            />

            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <input
              className="
                w-full 
                border 
                rounded-lg 
                p-3
              "
              placeholder="Email"
              {...register("email")}
            />

            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="password"
              className="
                w-full 
                border 
                rounded-lg 
                p-3
              "
              placeholder="Password"
              {...register("password")}
            />

            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <div>
            <input
              type="password"
              className="
                w-full 
                border 
                rounded-lg 
                p-3
              "
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />

            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              p-3
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
