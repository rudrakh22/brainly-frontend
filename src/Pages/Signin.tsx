import Input from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    const jwt = response?.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
    toast.success("Signin Successfull");
  };
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="w-[80%] md:w-[30%]  rounded-xl shadow-lg p-6 flex flex-col gap-6 border border-gray-300">
        <div className="text-purple-500 font-bold text-2xl text-center">
          Sign In
        </div>
        <label className="text-gray-600">
          Username *
          <Input reference={usernameRef} placeholder="username" />
        </label>
        <label className="text-gray-600">
          Password *
          <Input reference={passwordRef} placeholder="password" />
        </label>
        <div>
          <Button
            onClick={signin}
            loading={false}
            variant="primary"
            text="Sign in"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
