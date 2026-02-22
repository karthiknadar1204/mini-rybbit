'use server'

import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/config/db'
import { users, websites } from '@/config/schema'
import { desc, eq } from 'drizzle-orm'

function normalizeDomain(input: string): string {
  return input
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '')
    .toLowerCase()
    .trim()
}

function generateSiteId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}

export async function addWebsite(domainInput: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const clerkUser = await currentUser()
  if (!clerkUser) {
    return { ok: false, error: 'Not signed in' }
  }

  const domain = normalizeDomain(domainInput)
  if (!domain) {
    return { ok: false, error: 'Please enter a domain' }
  }

  const [user] = await db.select({ id: users.id }).from(users).where(eq(users.clerkId, clerkUser.id)).limit(1)
  if (!user) {
    return { ok: false, error: 'User not found. Try signing out and back in.' }
  }

  const siteId = generateSiteId()
  await db.insert(websites).values({
    userId: user.id,
    domain,
    siteId,
  })

  return { ok: true }
}

export async function getWebsites(): Promise<{ id: number; domain: string; siteId: string; createdAt: Date | null }[]> {
  const clerkUser = await currentUser()
  if (!clerkUser) return []

  const [user] = await db.select({ id: users.id }).from(users).where(eq(users.clerkId, clerkUser.id)).limit(1)
  if (!user) return []

  const rows = await db
    .select({ id: websites.id, domain: websites.domain, siteId: websites.siteId, createdAt: websites.createdAt })
    .from(websites)
    .where(eq(websites.userId, user.id))
    .orderBy(desc(websites.createdAt))

  return rows
}
