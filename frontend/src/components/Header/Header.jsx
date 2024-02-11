import React, { useState } from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice/ThemSlice";
export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handlenaviagtion = (e) => {
    navigate("/dashboard");
    setActive(false);
  };
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
        <Button
          onClick={(e) => dispatch(toggleTheme())}
          className="w-12 h-11 hidden sm:inline-block"
          color="gray"
          pill
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {isAuthenticated ? (
          <div className="relative">
            <Button
              onClick={(e) => setActive(!active)}
              className=" hidden sm:inline-block"
              outline
              gradientDuoTone={"purpleToBlue"}
              pill
            >
              {user?.name}
            </Button>
            {active && (
              <div className="w-[180px] p-3 shadow border flex flex-col gap-2  left-[-100px] h-[90px] bottom-[-90px] z-[40] bg-white absolute">
                <h1
                  className="cursor-pointer text-center hover:bg-gray-200"
                  onClick={handlenaviagtion}
                >
                  Profile
                </h1>
                <h1 className="cursor-pointer text-center hover:bg-gray-200">
                  SignOut
                </h1>
              </div>
            )}
          </div>
        ) : (
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
        )}
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
