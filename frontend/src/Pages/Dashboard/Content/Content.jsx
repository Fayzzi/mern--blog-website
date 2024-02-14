import { useSelector } from "react-redux";
import { RiPencilLine } from "react-icons/ri";
import { useState } from "react";

export default function Content({ active }) {
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [name, setName] = useState("");
  const [Demail, setEmail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="w-full dark:bg-[rgb(16,23,42)]">
      {active === 1 && (
        <div className="w-full dark:bg-[rgb(16,23,42)] px-4 py-6 bg-gray-100 min-h-[90vh] mt-6 rounded-t">
          <h1 className="text-center md:text-[23px] text-[20px] font-bold ">
            Profile
          </h1>
          <form action="" className="my-6 px-6">
            <div className="w-full flex items-center justify-center">
              <div className="relative">
                <img
                  src={user?.avatar}
                  className="h-[150px] border-[4px] border-green-600 dark:border-white rounded-full w-[150px]"
                  alt="user-profile"
                />
                <div className="absolute bg-white dark:bg-black shadow p-2 rounded-full cursor-pointer top-0 right-0">
                  <RiPencilLine size={25} />
                </div>
              </div>
            </div>
            <div className="flex flex-col my-4 gap-2">
              <label className="font-bold" htmlFor="">
                Username
              </label>
              <input
                value={user?.name}
                onChange={(e) => setName(e.target.value)}
                name="user-name"
                type="text"
                className="w-full p-2 rounded text-black  appearance-none border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex flex-col my-4 gap-2">
              <label className="font-bold" htmlFor="">
                Email
              </label>
              <input
                type="email"
                value={user?.email}
                onChange={(e) => setEmail(e.target.value)}
                name="user-email"
                className="w-full p-2 rounded text-black  appearance-none border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex flex-col my-4 gap-2">
              <label className="font-bold" htmlFor="">
                Password
              </label>
              <input
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                name="user-password"
                type="password"
                placeholder="enter your password to save changes"
                className="w-full p-2 rounded  appearance-none border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <input
              type="submit"
              className="border border-gray-300 p-3 w-full my-4 rounded-md cursor-pointer"
            />
          </form>
        </div>
      )}
    </div>
  );
}
