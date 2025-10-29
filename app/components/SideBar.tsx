import prisma from "@/lib/db";
import { connection } from "next/server";
import { ReactNode } from "react";

export async function SideBar() {
  await connection();
  const users = await prisma.user.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  return (
    <aside>
      <ul>
        <SideBarNavigation name="Home" icon={"h"} />
        <SideBarNavigation name="Shifts" icon={"h"} />
        <SideBarNavigation name="Message" icon={"h"} />
        <SideBarNavigation name="Account" icon={"h"} />
      </ul>
      <UserSelect users={users} />
    </aside>
  );
}

function SideBarNavigation({ name, icon }: { name: string; icon: ReactNode }) {
  return (
    <li>
      <span>{icon}</span>
      {name}
    </li>
  );
}

interface User {
  id: string;
  name: string;
}

function UserSelect({ users }: { users: User[] }) {
  return (
    <div>
      {users.map((x) => (
        <div key={x.id}>{x.name}</div>
      ))}
    </div>
  );
}
