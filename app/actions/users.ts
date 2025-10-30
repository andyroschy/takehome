import prisma from "@/lib/db";

export async function fetchUsers() {
    const users = await prisma.user.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return users;
}