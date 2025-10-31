"use client";
import Link from "next/link";
import { ReactNode, useCallback } from "react";
import { setUser } from "../actions/session";
import { HomeIcon } from "../icons/home";
import { CalendarIcon } from "../icons/calendar";
import { ListIcon } from "../icons/list";
import { useSelectedLayoutSegments } from "next/navigation";

export function SideBar({
  users,
  selectedUserId,
}: {
  users: User[];
  selectedUserId?: string | null;
}) {
  return (
    <aside className="flex flex-col border-r border-blue-500 content-start w-48 p-4 h-full min-h-full">
      <nav className="flex-1 flex flex-col">
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
      </nav>
      <UserSelect users={users} selectedUserId={selectedUserId} />
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
  url: string;
}) {
  const layoutSegments = useSelectedLayoutSegments();
  // naive implementation, only works with top level routes
  const activeUrl =
    layoutSegments.includes(url.replace("/", "")) ||
    (url === "/" && layoutSegments.length === 0);
  return (
    <Link
      href={url}
      className={`hover:bg-blue-100 p-2 rounded-xs ${
        activeUrl ? "bg-blue-200 text-blue-600 font-bold" : ""
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span>{name}</span>
    </Link>
  );
}

interface User {
  id: string;
  name: string;
}

function UserSelect({
  users,
  selectedUserId,
}: {
  users: User[];
  selectedUserId?: string | null;
}) {
  const onSelect = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value: userId } = e.target;
      await setUser(userId);
    },
    []
  );

  return (
    <>
      <label>Signed in User</label>
      <select
        className="border "
        onChange={onSelect}
        value={selectedUserId || ""}
      >
        <option value={""}></option>
        {users.map((x) => (
          <option key={x.id} value={x.id}>
            {x.name}
          </option>
        ))}
      </select>
    </>
  );
}
