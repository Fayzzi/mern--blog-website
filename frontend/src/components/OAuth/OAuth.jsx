import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { GetUser } from "../Redux/Reducers/UserReducers";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.getCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const response = await fetch("http://localhost:3000/api/v2/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
        credentials: "include", // Set credentials to include cookies
      });

      if (response.status === 200) {
        dispatch(GetUser());
        navigate("/");
      } else {
        // Handle non-200 status codes
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Handle fetch or other errors
      console.error("Error:", error);
    }
  };

  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      gradientDuoTone={"pinkToOrange"}
      className="w-full my-4"
      outline
    >
      <AiFillGoogleCircle size={24} />
      <h1 className="ml-2">Continue with Google</h1>
    </Button>
  );
}
