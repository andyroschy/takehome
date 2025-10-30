"use client";
import Link from "next/link";
import { ReactNode, useCallback } from "react";
import { setUser } from "../actions/session";

export function SideBar({ users }: { users: User[] }) {
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

function SideBarNavigation({
  name,
  icon,
  url,
}: {
  name: string;
  icon: ReactNode;
  url?: string;
}) {
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
  const onSelect = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value: userId } = e.target;
      await setUser(userId);
    },
    []
  );

  return (
    <select onChange={onSelect}>
      {users.map((x) => (
        <option key={x.id} value={x.id}>
          {x.name}
        </option>
      ))}
    </select>
  );
}
