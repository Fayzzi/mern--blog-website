import { useEffect, useState } from "react";
import { IoLogIn, IoLogInOutline, IoPersonOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";

export default function Sidebar({ active, setActive }) {
  return (
    <div className="bg-gray-100 sticky top-12 left-0 dark:bg-[rgb(16,23,42)] border py-5 px-4 mt-6  flex flex-col gap-6 rounded-lg">
      {active === 1 ? (
        <div className="flex gap-1 items-center justify-center">
          <IoPerson size={20} />
          <span className="hidden md:block text-sm md:text-md cursor-pointer">
            Profile
          </span>
        </div>
      ) : (
        <div
          onClick={(e) => setActive(1)}
          className="flex gap-1 items-center justify-center"
        >
          <IoPersonOutline size={20} />
          <span className="hidden md:block text-sm md:text-md cursor-pointer">
            Profile
          </span>
        </div>
      )}
      {active === 2 ? (
        <div className="flex gap-1 items-center justify-center">
          <IoLogIn size={25} />
          <span className="hidden md:block text-sm md:text-md cursor-pointer">
            LogOut
          </span>
        </div>
      ) : (
        <div
          onClick={(e) => setActive(2)}
          className="flex gap-1 items-center justify-center"
        >
          <IoLogInOutline size={25} />
          <span className="hidden md:block text-sm md:text-md cursor-pointer">
            LogOut
          </span>
        </div>
      )}
    </div>
  );
}
