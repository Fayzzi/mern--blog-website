import { useDispatch, useSelector } from "react-redux";
import { RiPencilLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { updateUser } from "../../../components/Redux/Reducers/UserReducers";
import { toast } from "react-toastify";
export default function Content({ active }) {
  const { user, userError, userUpdateSuccess } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(user && user?.name);
  const [email, setEmail] = useState(user && user?.email);
  const dispatch = useDispatch();
  const [password, setpassword] = useState("");
  const [image, setimage] = useState(null);
  useEffect(() => {
    if (userError) {
      toast.error(userError);
    }
    if (userUpdateSuccess) {
      toast.success("Updated successfully!!");
    }
  }, [userError, userUpdateSuccess]);
  const updateUserData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", image);
    dispatch(updateUser({ formData: formData }));
  };
  return (
    <div className="w-full dark:bg-[rgb(16,23,42)]">
      {active === 1 && (
        <div className="w-full dark:bg-[rgb(16,23,42)] px-4 py-6 min-h-[90vh] mt-6 rounded-t">
          <h1 className="text-center md:text-[23px] text-[20px] font-bold ">
            Profile
          </h1>
          <form
            action=""
            onSubmit={updateUserData}
            className="my-6 px-6  md:w-[40vw] mx-auto"
          >
            <div className="w-full flex items-center justify-center">
              <div className="relative">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-[150px] border-[4px] border-green-600 dark:border-white rounded-full object-cover w-[150px]"
                    alt="user-profile"
                  />
                ) : (
                  <span>
                    {user?.avatar.includes("google") ? (
                      <img
                        src={user?.avatar}
                        className="h-[150px] object-cover border-[4px] border-green-600 dark:border-white rounded-full w-[150px]"
                        alt="user-profile"
                      />
                    ) : (
                      <img
                        src={"http://localhost:3000/" + user?.avatar}
                        className="h-[150px] object-cover border-[4px] border-green-600 dark:border-white rounded-full w-[150px]"
                        alt="user-profile"
                      />
                    )}
                  </span>
                )}

                <div className="absolute bg-white dark:bg-black shadow p-2 rounded-full cursor-pointer top-0 right-0">
                  <label htmlFor="image-selector">
                    <RiPencilLine size={25} />
                  </label>
                  <input
                    type="file"
                    name=""
                    onChange={(e) => setimage(e.target.files[0])}
                    accept=".png,.jpg,.jpeg"
                    className="hidden"
                    id="image-selector"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col my-4 gap-2">
              <label className="font-bold" htmlFor="">
                Username
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="user-name"
                type="text"
                className=" p-2 rounded text-black md:w-[40vw]   appearance-none border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex flex-col my-4 gap-2">
              <label className="font-bold" htmlFor="">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="user-email"
                className=" p-2 rounded text-black md:w-[40vw]  appearance-none border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
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
                className=" p-2 rounded  md:w-[40vw] appearance-none border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <input
              type="submit"
              className="border border-gray-300 p-3  md:w-[40vw] my-4 rounded-md cursor-pointer"
            />
          </form>
        </div>
      )}
    </div>
  );
}
