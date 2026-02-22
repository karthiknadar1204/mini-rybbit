"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addWebsite, getWebsites } from "@/app/actions/add-website"

type Website = { id: number; domain: string; siteId: string; createdAt: Date | null }

export default function DashboardPage() {
  const [open, setOpen] = useState(false)
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [websites, setWebsites] = useState<Website[]>([])

  async function fetchWebsites() {
    const list = await getWebsites()
    setWebsites(list)
  }

  useEffect(() => {
    fetchWebsites()
  }, [])

  async function handleContinue() {
    setError(null)
    setLoading(true)
    const result = await addWebsite(domain)
    setLoading(false)
    if (result.ok) {
      setOpen(false)
      setDomain("")
      await fetchWebsites()
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Websites</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage and monitor your digital footprint across all registered domains.
          </p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="mt-4 shrink-0 sm:mt-0"
        >
          + Add Website
        </Button>
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        {websites.length === 0 ? (
          <p className="text-sm text-gray-500">No websites yet. Add one above.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {websites.map((w) => (
              <Link
                key={w.id}
                href={`/dashboard/${w.id}`}
                className="flex aspect-square flex-col justify-center rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 transition-colors hover:border-white/20 hover:bg-[#111]"
              >
                <p className="text-sm font-medium text-white">https://{w.domain}</p>
                <p className="mt-1.5 text-xs text-gray-500">ID: {w.siteId}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-white/10 bg-[#0a0a0a] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-left text-white">Add Website</DialogTitle>
            <DialogDescription className="text-left text-gray-400">
              Enter your website domain to start tracking analytics
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <div className="flex rounded-md border border-white/20 bg-[#111] focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <span className="flex items-center rounded-l-md border-r border-white/20 bg-[#0a0a0a] px-3 text-sm text-gray-400">
                https://
              </span>
              <Input
                type="text"
                placeholder="justanothershittyidea.io"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-white/20 text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleContinue}
              disabled={loading}
              className="bg-blue-500 text-black hover:bg-blue-400"
            >
              {loading ? "Saving…" : "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
