import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Logo, Button, Container, CardBox } from "../components";
import { useDispatch } from "react-redux";
import AuthServices from "../appwrite/AuthServices";
import { login as loginAuth } from "../store/AuthSlice";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    try {
      const session = await AuthServices.login(data);
      if (session) {
        const userData = await AuthServices.getCurrentUser();
        if (userData) {
          toast.success("Login Sucsessful");
          dispatch(loginAuth(userData));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Container>
      <CardBox>
        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-secondary">Signin to Your Account</h1>
          <Input
            label="Email"
            type="email"
            placeholder="Enter Your Email Address"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" className="w-full py-2">
            Login
          </Button>
        </form>
      </CardBox>
    </Container>
  );
}
