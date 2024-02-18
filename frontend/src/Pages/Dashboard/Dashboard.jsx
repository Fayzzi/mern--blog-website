import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

export default function Dashboard() {
  const [active, setActive] = useState(1);
  return (
    <div className="min-h-screen">
      <div className="flex w-11/12 mx-auto gap-2 justify-between">
        <div className="md:max-w-[25vw]  w-fit">
          <Sidebar setActive={setActive} active={active} />
        </div>
        <Content active={active} />
      </div>
    </div>
  );
}
