import { Link, useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { GetUser } from "../../components/Redux/Reducers/UserReducers";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerUser = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/v2/user/login", {
        email,
        password,
      })
      .then((response) => {
        toast.success(response.data.message);
        dispatch(GetUser());
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-11/12 flex flex-col items-center justify-center min-h-screen mx-auto">
      <div className="sm:grid sm:grid-cols-[1fr_2fr]  gap-x-2 items-center w-full justify-between">
        <div className="  flex justify-center items-center gap-1">
          <span className="py-2 px-3 font-bold text-4xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded border shadow ">
            Faizan's
          </span>
          <p className="text-3xl font-bold ">Blog</p>
        </div>
        <div className="  shrink-0 sm:mt-0 mt-4">
          <form
            onSubmit={registerUser}
            aria-required
            action=""
            className=" shadow border shrink-0 rounded sm:max-w-[28rem]   sm:mx-auto p-8"
          >
            <h1 className="w-full text-center font-bold mb-2 text-[25px]">
              LogIn to your Account
            </h1>

            <div className="flex my-4 flex-col gap-2">
              <h1 className="font-bold text-[16px]">Email</h1>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                name="user-email"
                className="w-full p-2 border-gray-300 rounded  focus:border-blue-500"
                id=""
              />
            </div>
            <div className="flex my-4 flex-col gap-2">
              <h1 className="font-bold text-[16px]">Password</h1>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  name=""
                  className="w-full p-2 border-gray-300 rounded  focus:border-blue-500"
                  id=""
                />
                <div className="absolute select-none right-2 top-2">
                  {visible ? (
                    <FaRegEyeSlash
                      onClick={(e) => setVisible(!visible)}
                      size={24}
                    />
                  ) : (
                    <FaRegEye onClick={(e) => setVisible(!visible)} size={24} />
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={registerUser}
              className=" w-full "
              outline
              gradientDuoTone={"purpleToBlue"}
            >
              Login
            </Button>
            <h1 className="mt-4">
              Not a member?
              <Link to={"/signup"} className="text-blue-500 ml-1">
                SignUp
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}
