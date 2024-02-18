import {
  IoDocument,
  IoDocumentOutline,
  IoLogIn,
  IoLogInOutline,
  IoPeopleCircle,
  IoPeopleCircleOutline,
  IoPeopleOutline,
  IoPeopleSharp,
  IoPersonOutline,
} from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import { GetUser } from "../../../components/Redux/Reducers/UserReducers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ active, setActive }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const signoutUser = async (e) => {
    await axios
      .post("api/v2/user/logout")
      .then((response) => navigate("/"))
      .finally(() => dispatch(GetUser()));
  };
  return (
    <div className="bg-gray-100 sticky top-12 left-0 dark:bg-[rgb(16,23,42)] border py-5 px-4 mt-6  flex flex-col gap-6 rounded-lg">
      {active === 1 ? (
        <div className="flex gap-1 items-center justify-center">
          <IoPerson title="Profile" size={20} />
          <span className="hidden md:block text-sm md:text-md cursor-pointer">
            Profile
          </span>
        </div>
      ) : (
        <div
          onClick={(e) => setActive(1)}
          className="flex gap-1 items-center justify-center"
        >
          <IoPersonOutline title="Profile" size={20} />
          <span className="hidden md:block text-sm md:text-md cursor-pointer">
            Profile
          </span>
        </div>
      )}

      {user && user?.isAdmin ? (
        <div>
          {active === 3 ? (
            <div className="flex gap-1 items-center justify-center">
              <IoDocument title="All posts" size={20} />
              <span className="hidden md:block text-sm md:text-md cursor-pointer">
                Profile
              </span>
            </div>
          ) : (
            <div
              onClick={(e) => setActive(3)}
              className="flex gap-1 items-center justify-center"
            >
              <IoDocumentOutline title="All posts" size={20} />
              <span className="hidden md:block text-sm md:text-md cursor-pointer">
                Posts
              </span>
            </div>
          )}
        </div>
      ) : null}
      {user && user?.isAdmin ? (
        <div>
          {active === 4 ? (
            <div className="flex gap-1 items-center justify-center">
              <IoPeopleSharp title="All posts" size={20} />
              <span className="hidden md:block text-sm md:text-md cursor-pointer">
                Users
              </span>
            </div>
          ) : (
            <div
              onClick={(e) => setActive(4)}
              className="flex gap-1 items-center justify-center"
            >
              <IoPeopleOutline title="All posts" size={20} />
              <span className="hidden md:block text-sm md:text-md cursor-pointer">
                Users
              </span>
            </div>
          )}
        </div>
      ) : null}
      {active === 2 ? (
        <div className="flex gap-1 items-center justify-center">
          <IoLogIn size={25} />
          <span className="hidden md:block text-sm md:text-md cursor-pointer">
            LogOut
          </span>
        </div>
      ) : (
        <div
          onClick={signoutUser}
          className="flex gap-1 items-center justify-center"
        >
          <IoLogInOutline title="logout" size={25} />
          <span
            title="logout"
            className="hidden md:block text-sm md:text-md cursor-pointer"
          >
            LogOut
          </span>
        </div>
      )}
    </div>
  );
}
