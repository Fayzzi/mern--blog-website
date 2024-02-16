import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Allposts() {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  //sending userId in params to backend
  useEffect(() => {
    const fetchPost = async () => {
      await axios
        .get("/api/v2/admin/getposts?userId=" + user?._id)
        .then((response) => setData(response.data.posts))
        .catch((e) => alert(e.response.data.message));
    };
    if (user && user?.isAdmin) {
      fetchPost();
    }
  }, [user]);
  return (
    <div className="w-full min-h-screen px-4 py-6">
      <h1 className="text-center mb-6 text-[20px] md:text-[24px] font-semibold">
        Posts
      </h1>
      <div className="table-auto overflow-x-scroll mx-auto  scrollbar scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500">
        {user && user?.isAdmin && data.length > 0 ? (
          <>
            <Table hoverable className="shadow-sm">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {data &&
                data.map((d, i) => (
                  <Table.Body key={i}>
                    <Table.Row>
                      <Table.Cell>
                        {new Date(d?.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        {
                          <img
                            className="h-14 w-14 object-cover"
                            src={"http://localhost:3000/" + d?.images[0]}
                            alt=""
                          />
                        }
                      </Table.Cell>
                      <Table.Cell>
                        <span>{d?.title}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span>{d?.category}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span>Delete</span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </>
        ) : (
          <span> data to show</span>
        )}
      </div>
    </div>
  );
}
