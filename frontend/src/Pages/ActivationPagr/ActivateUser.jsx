import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ActivateUser() {
  const { activationtoken } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("/api/v2/user/activation/" + activationtoken) // Added a forward slash before activationtoken
      .then(() => {
        console.log("All ok");
      })
      .catch((e) => {
        setError(true);
      });
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your Token is expired!</p>
      ) : (
        <p>Your Account has been Activated Successfully!!</p>
      )}
    </div>
  );
}
