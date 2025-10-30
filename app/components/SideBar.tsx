"use client";
import Link from "next/link";
import { ReactNode, useCallback } from "react";
import { setUser } from "../actions/session";
import { HomeIcon } from "../icons/home";
import { CalendarIcon } from "../icons/calendar";
import { ListIcon } from "../icons/list";

export function SideBar({ users }: { users: User[] }) {
  return (
    <aside className="flex flex-col content-start w-48 p-4 h-full min-h-full">
      <ul className="flex-1">
        <SideBarNavigation
          name="Home"
          icon={<HomeIcon height={16} width={16} className="inline" />}
          url="/"
        />
        <SideBarNavigation
          name="Shifts"
          icon={<CalendarIcon height={16} width={16} className="inline" />}
          url="/shifts"
        />
        <SideBarNavigation
          name="Applications"
          icon={<ListIcon height={16} width={16} className="inline" />}
          url="/applications"
        />
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
      <span className="mr-2">{icon}</span>
      {url ? (
        <Link className="inline" href={url}>
          {name}
        </Link>
      ) : (
        name
      )}
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
