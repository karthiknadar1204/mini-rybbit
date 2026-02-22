import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/config/db"
import { users, websites } from "@/config/schema"
import { and, eq } from "drizzle-orm"

export default async function DashboardWebsitePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const clerkUser = await currentUser()
  if (!clerkUser) {
    return (
      <div className="p-6">
        <p className="text-gray-400">Sign in to view this page.</p>
      </div>
    )
  }

  const [user] = await db.select({ id: users.id }).from(users).where(eq(users.clerkId, clerkUser.id)).limit(1)
  if (!user) {
    return (
      <div className="p-6">
        <p className="text-gray-400">User not found.</p>
      </div>
    )
  }

  const { id } = await params
  const websiteId = parseInt(id, 10)
  if (Number.isNaN(websiteId)) {
    return (
      <div className="p-6">
        <p className="text-gray-400">Invalid website.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-blue-400 hover:underline">
          Back to dashboard
        </Link>
      </div>
    )
  }

  const [website] = await db
    .select()
    .from(websites)
    .where(and(eq(websites.id, websiteId), eq(websites.userId, user.id)))
    .limit(1)

  if (!website) {
    return (
      <div className="p-6">
        <p className="text-gray-400">Website not found.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-blue-400 hover:underline">
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Link href="/dashboard" className="text-sm text-blue-400 hover:underline">
        ← Back to dashboard
      </Link>
      <h1 className="mt-6 text-2xl font-bold text-white">https://{website.domain}</h1>
      <p className="mt-2 text-sm text-gray-500">Site ID: {website.siteId}</p>
    </div>
  )
}
