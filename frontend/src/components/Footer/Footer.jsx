import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsDribbble,
  BsInstagram,
  BsTwitter,
  BsGithub,
} from "react-icons/bs";
export default function Footer() {
  return (
    <div className="border border-t-8 border-teal-500 rounded-t-xl m-1  px-8">
      <Link
        to={"/"}
        className="flex pt-8 cursor-pointer select-none items-center gap-1"
      >
        <h1 className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-2xl font-bold rounded-lg">
          Faizan's
        </h1>
        <span className="font-bold text-2xl">Blog</span>
      </Link>
      <div className="grid mx-auto mt-8 grid-cols-1 items-center justify-center  md:grid-cols-2  lg:grid-cols-3">
        <div className="gap-2 items-center justify-center flex flex-col ">
          <h1 className="text-gray-500 cursor-pointer select-none">ABOUT</h1>
          <h1 className="text-gray-500 cursor-pointer hover:text-gray-600">
            100 JS Projects
          </h1>
          <h1 className="text-gray-500 cursor-pointer hover:text-gray-600">
            Faizan's Blog
          </h1>
        </div>
        <div className="items-center gap-2 mt-2  justify-center flex flex-col ">
          <h1 className="text-gray-500 cursor-pointer select-none">
            FOLLOW US
          </h1>
          <h1 className="text-gray-500 cursor-pointer hover:text-gray-600">
            Github
          </h1>
          <h1 className="text-gray-500 cursor-pointer hover:text-gray-600">
            Discord
          </h1>
        </div>
        <div className="items-center gap-2 mt-2 justify-center flex flex-col ">
          <h1 className="text-gray-500 cursor-pointer select-none">LEGAL</h1>
          <h1 className="text-gray-500 cursor-pointer hover:text-gray-600">
            Privacy Policy
          </h1>
          <h1 className="text-gray-500 cursor-pointer hover:text-gray-600">
            Terms & Conditions
          </h1>
        </div>
      </div>
      <div className="flex mt-4  p-2 border-t-2  -mx-8  items-center justify-between">
        <h1 className="text-gray-600 ml-8">
          {/*Ignore the html codes, they are just for practices */}
          &copy;2023 Faizan's Blog&rarr; &#10003;&#10030; &middot;&reg; &trade;
        </h1>
        <h1 className="text-gray-600 flex  gap-1 mr-8">
          <BsFacebook size={18} className="m-1 cursor-pointer" />
          <BsInstagram size={18} className="m-1 cursor-pointer" />
          <BsGithub size={18} className="m-1 cursor-pointer" />
          <BsTwitter size={18} className="m-1 cursor-pointer" />
          <BsDribbble size={18} className="m-1 cursor-pointer" />
        </h1>
      </div>
    </div>
  );
}
