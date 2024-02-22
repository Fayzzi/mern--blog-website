import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/api/v2/admin/getposts?postId=" + id)
        .then((response) => {
          setData(response.data.posts[0]);
        });
    };
    fetchData();
  }, [id]);
  return <div>{data?.category}</div>;
}
