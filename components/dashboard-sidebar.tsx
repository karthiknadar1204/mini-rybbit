"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, ChevronLeft, ChevronRight, Globe, Settings } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Add website", icon: Globe },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={`flex flex-col border-r border-white/10 bg-[#0a0a0a] transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-52"
      }`}
    >
      <div className="flex h-14 items-center border-b border-white/10 px-3">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-white">
            <BarChart2 className="h-5 w-5 text-blue-400" />
            <span className="truncate">kitkat</span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="ml-auto rounded p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/dashboard" ? pathname === "/dashboard" || /^\/dashboard\/\d+$/.test(pathname) : pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
