'use server'

import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/config/db'
import { users } from '@/config/schema'
import { eq } from 'drizzle-orm'

export async function syncUser() {
  const clerkUser = await currentUser()
  if (!clerkUser) return

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    `${clerkUser.id}@clerk.user`
  const imageUrl = clerkUser.imageUrl ?? ''

  await db
    .insert(users)
    .values({
      clerkId: clerkUser.id,
      email,
      imageUrl,
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        email,
        imageUrl,
      },
    })
}
