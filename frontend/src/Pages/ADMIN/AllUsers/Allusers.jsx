import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Allusers() {
  const [users, setUsers] = useState([]);
  const [showmore, setShowMore] = useState(true);
  useEffect(() => {
    axios.get("/api/v2/admin/get-all").then(({ data }) => {
      setUsers(data.Users);
      if (data.Users.length < 9) {
        setShowMore(false);
      }
    });
  }, []);
  //delete user
  const deleteUser = async (e, id) => {
    e.preventDefault();
    await axios.delete("/api/v2/admin/delete-user/" + id);
    setUsers((prev) => prev.filter((user) => user._id !== id));
  };
  const handleShowmore = async (e) => {
    const startIndex = users.length;
    await axios
      .get("/api/v2/admin/get-all?startIndex=" + startIndex)
      .then(({ data }) => {
        setUsers((prev) => [...prev, ...data.Users]);
        if (data.Users.length < 9) {
          setShowMore(false);
        }
      });
  };
  return (
    <div>
      <Table
        className="table-auto overflow-x-scroll mx-auto  scrollbar scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-500"
        hoverable
      >
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Avatar</Table.HeadCell>
          <Table.HeadCell>Joined on</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>

        {users &&
          users.map((u, i) => (
            <Table.Body key={i}>
              <Table.Row>
                <Table.Cell>{u?.name}</Table.Cell>
                <Table.Cell>
                  <img
                    className="h-14 w-14 object-cover rounded-full"
                    src={"http://localhost:3000/" + u?.avatar}
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>
                  {new Date(u?.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  {u?.isAdmin ? <span>&#10003;</span> : <span>&times;</span>}
                </Table.Cell>
                <Table.Cell>{u?.email}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={(e) => deleteUser(e, u?._id)}
                    className="p-2 bg-[red] text-white rounded cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
      </Table>
      {showmore ? (
        <div
          onClick={handleShowmore}
          className="text-teal-800 cursor-pointer mx-auto w-fit p-2"
        >
          showMore
        </div>
      ) : null}
    </div>
  );
}
