import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Allposts() {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [showmore, setShowmore] = useState(true);
  const handleShowmore = async (e) => {
    e.preventDefault();
    const startLength = data.length; // Use data.length
    try {
      const { data } = await axios.get(
        "/api/v2/admin/getposts?userId=" +
          user?._id +
          `&startIndex=${startLength}`
      );
      setData((prevData) => [...prevData, ...data.posts]); // Correctly append new posts
      setShowmore(data.posts.length < 9 ? false : true); // Show more if there are new posts
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };
  //sending userId in params to backend
  useEffect(() => {
    const fetchPost = async () => {
      await axios
        .get("/api/v2/admin/getposts?userId=" + user?._id)
        .then((response) => {
          setData(response.data.posts);
          if (response.data.length < 9) {
            setShowmore(false);
          }
        })
        .catch((e) => alert(e.response.data.message));
    };
    if (user && user?.isAdmin) {
      fetchPost();
    }
  }, [user]);
  //deleting post
  const handleDelete = async (e, postId) => {
    await axios
      .delete("/api/v2/admin/delete-post/" + postId + "/" + user?._id)
      .then((response) => {
        setData((prev) => prev.filter((post) => post._id !== postId));
      });
  };
  return (
    <div className="w-full min-h-screen px-4 py-6">
      <h1 className="text-center mb-6 text-[20px] md:text-[24px] font-semibold">
        Posts
      </h1>

      {user && user?.isAdmin && data.length > 0 ? (
        <>
          <div className="table-auto overflow-x-scroll mx-auto  scrollbar scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500">
            <Table hoverable className="shadow-sm">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              {data &&
                data.map((d, i) => (
                  <Table.Body key={i}>
                    <Table.Row>
                      <Table.Cell>
                        {new Date(d?.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <img
                          className="h-14 w-14 object-cover"
                          src={"http://localhost:3000/" + d?.images[0]}
                          alt=""
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <span>{d?.title}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span>{d?.category}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className="p-2 bg-[red] text-white rounded cursor-pointer"
                          onClick={(e) => handleDelete(e, d?._id)}
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          to={"/create-post-admin/" + d?._id}
                          className="p-2 bg-[green] text-white rounded cursor-pointer"
                        >
                          Edit
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
          {showmore ? (
            <div
              onClick={handleShowmore}
              className="p-2 text-teal-400 border w-fit mx-auto my-5 rounded cursor-pointer"
            >
              showmore
            </div>
          ) : null}
        </>
      ) : (
        <span> data to show</span>
      )}
    </div>
  );
}
