import prisma from "@/lib/db";
import Link from "next/link";
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
        <SideBarNavigation name="Home" icon={"h"} url="/" />
        <SideBarNavigation name="Shifts" icon={"h"} url="/shifts" />
        <SideBarNavigation name="Applications" icon={"h"} url="/applications" />
      </ul>
      <UserSelect users={users} />
    </aside>
  );
}

function SideBarNavigation({ name, icon, url }: { name: string; icon: ReactNode, url?: string }) {
  return (
    <li>
      <span>{icon}</span>
      {url ? <Link href={url}>{name}</Link> : name}
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
