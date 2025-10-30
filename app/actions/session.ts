'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setUser(userId: string) {
  (await cookies()).set('session', JSON.stringify({ userId }), { path: '/' });
   revalidatePath('/');
}

export async function getSignedInUser() {
  const cookie = (await cookies()).get('session');
  if (!cookie) return null;
  const session = JSON.parse(cookie.value);
  return session.userId as string;
}