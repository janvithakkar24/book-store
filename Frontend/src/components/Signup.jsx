import React from "react";
import { Link, Navigate, json, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Account created successfully");
          navigate("/");
        }
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
          console.log(err);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="md:w-[500px]">
        <div className="model-box">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-200"
            >
              ✕
            </Link>
            <h3 className="font-bold text-lg">Signup</h3>
            <div className="mt-4 space-y-2">
              <span>Name</span> <br />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("name", { required: true })}
              />
              <br />
              {errors.name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Email</span> <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* // Password */}
            <div className="mt-4 space-y-2">
              <span>Password</span> <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Signup
              </button>
              <span className="text-xl">
                Have Account?{" "}
                <button
                  className="underline text-blue-500 "
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>
                <Login />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
