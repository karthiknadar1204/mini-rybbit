'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useRef } from 'react'
import { syncUser } from '@/app/actions/sync-user'

/**
 * When the user is signed in, syncs their Clerk profile to our DB (upsert by clerkId).
 * Runs once per client session when auth is ready; server action uses currentUser() so we never trust client data.
 */
export function SyncUser() {
  const { isSignedIn, isLoaded } = useUser()
  const hasSynced = useRef(false)

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasSynced.current) return
    hasSynced.current = true
    syncUser()
  }, [isLoaded, isSignedIn])

  return null
}
