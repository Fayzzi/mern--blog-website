import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to={"/"}
        className="whitespace-nowrap  self-center text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Faizan's
        </span>
        Blog
      </Link>
      <form className="">
        <TextInput
          rightIcon={AiOutlineSearch}
          type="text"
          placeholder="Search here..."
          className="hidden 800px:inline-block"
        />
      </form>
      <Button color="gray" pill className="800px:hidden inline-block ">
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-11 hidden sm:inline-block" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to={"/login"}>
          <Button
            className=" hidden sm:inline-block"
            outline
            gradientDuoTone={"purpleToBlue"}
            pill
          >
            Login
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"} active={path === "/"}>
          {" "}
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/projects"}>
          <Link to={"/projects"}>Project</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/about"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
