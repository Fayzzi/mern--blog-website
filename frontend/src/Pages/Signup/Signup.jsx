import { Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { useState } from "react";
import { Button } from "flowbite-react";
export default function Signup() {
  const [image, setImage] = useState(null);
  console.log(image);
  const selectImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
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
            action=""
            className=" shadow border shrink-0 rounded sm:max-w-[28rem]   sm:mx-auto p-8"
          >
            <h1 className="w-full text-center font-bold mb-2 text-[25px]">
              Create Account
            </h1>
            <div className="flex flex-col mt-4 gap-2">
              <h1 className="font-bold text-[16px]">Username</h1>
              <input
                type="text"
                name=""
                className="w-full p-2 border-gray-300 rounded  focus:border-blue-500"
                id=""
              />
            </div>
            <div className="flex my-4 flex-col gap-2">
              <h1 className="font-bold text-[16px]">Email</h1>
              <input
                type="text"
                name=""
                className="w-full p-2 border-gray-300 rounded  focus:border-blue-500"
                id=""
              />
            </div>
            <div className="flex my-4 flex-col gap-2">
              <h1 className="font-bold text-[16px]">Password</h1>
              <input
                type="text"
                name=""
                className="w-full p-2 border-gray-300 rounded  focus:border-blue-500"
                id=""
              />
            </div>
            <div className="flex gap-2 mb-4">
              {image ? (
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={URL.createObjectURL(image)}
                  alt=""
                />
              ) : (
                <RxPerson size={25} className="" />
              )}
              <div className="flex items-center">
                <label
                  className="p-2 border shadow-sm  rounded hover:bg-gray-200"
                  htmlFor="ok"
                >
                  {" "}
                  Select Image
                </label>
                <input
                  onChange={selectImage}
                  id="ok"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  type="file"
                />
              </div>
            </div>
            <Button
              className=" w-full "
              outline
              gradientDuoTone={"purpleToBlue"}
            >
              Login
            </Button>
            <h1 className="mt-4">
              Already have an account?
              <Link to={"/login"} className="text-blue-500 ml-1">
                Login
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}
