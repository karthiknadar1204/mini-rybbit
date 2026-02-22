"use client"

import { motion } from "framer-motion"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { BarChart2, MapPin, Monitor, Activity, Globe, Clock, Code2 } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#333] selection:text-white overflow-x-hidden font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#050505]/80 border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/50 rounded-sm flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-blue-400" />
            </div>
            kitkat-analytics
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              API
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-black text-sm font-bold rounded-sm transition-colors"
              >
                Get Started
              </Link>
              <SignInButton>
                <button
                  type="button"
                  className="px-4 py-2 border border-white/20 hover:bg-white/5 text-sm font-bold rounded-sm transition-colors"
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="text-left">
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-white/10 text-gray-400 text-xs font-medium mb-8 font-mono"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Real-time ingestion
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
              >
                Website analytics <br />
                <span className="text-blue-500/90">that actually make sense.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                Track page views, sessions, and engagement. See device, location, referrer, and UTM—with a simple API
                and no bloat.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/sign-up"
                  className="w-full sm:w-auto px-8 py-4 bg-blue-500 text-black font-bold rounded-sm hover:bg-blue-400 transition-all flex items-center justify-center gap-2"
                >
                  <BarChart2 className="w-4 h-4" />
                  Start for free
                </Link>
                <Link
                  href="#integration"
                  className="w-full sm:w-auto px-8 py-4 bg-[#111] hover:bg-[#222] text-white border border-white/10 rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4" />
                  View API
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#111]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="ml-4 text-xs text-gray-500 font-mono">track.js</div>
                </div>
                <div className="p-6 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-500 mb-4">// Page view (creates or updates session)</div>
                  <div>
                    <span className="text-purple-400">await</span>
                    <span className="text-white mx-1">fetch</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-green-400">"/api/track"</span>
                    <span className="text-gray-400">, {"{"}</span>
                  </div>
                  <div className="pl-2 text-gray-400">
                    method: <span className="text-green-400">"POST"</span>,
                  </div>
                  <div className="pl-2 text-gray-400">
                    body: <span className="text-blue-400">JSON.stringify</span>
                    <span className="text-gray-400">({"{"}</span>
                  </div>
                  <div className="pl-4 text-blue-300">type: <span className="text-green-400">"page_view"</span>,</div>
                  <div className="pl-4 text-blue-300">domain, siteId, sessionId, url, referrer,</div>
                  <div className="pl-4 text-blue-300">userAgent, screenWidth, utm_source, utm_campaign</div>
                  <div className="pl-2 text-gray-400">{"})"}</div>
                  <div className="text-gray-400">{"})"}</div>

                  <div className="text-gray-500 mt-6 mb-4">// Heartbeat (keep session alive) · page_exit (exit_page, exit_time, active_time)</div>
                  <div>
                    <span className="text-purple-400">await</span>
                    <span className="text-white mx-1">fetch</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-green-400">"/api/track"</span>
                    <span className="text-gray-400">, {"{"} method: <span className="text-green-400">"POST"</span>, body: <span className="text-blue-400">JSON.stringify</span></span>
                    <span className="text-gray-400">({"{"} type: <span className="text-green-400">"heartbeat"</span>, sessionId, ... {"})"})</span>
                    <span className="text-gray-400">{"})"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#050505]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What we track</h2>
            <p className="text-gray-400 max-w-2xl">
              Session-based analytics with page views, heartbeats, and exit events. Device, geography, and campaign
              attribution out of the box.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#0a0a0a] border border-white/10 p-8 rounded-lg hover:border-white/20 transition-colors">
              <Activity className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">Sessions & page views</h3>
              <p className="text-gray-400 leading-relaxed">
                Every session stores entry page, entry time, and last heartbeat. Send <code className="text-blue-400/80">page_view</code> to
                create or update a session; <code className="text-blue-400/80">heartbeat</code> to keep it alive; <code className="text-blue-400/80">page_exit</code> to record
                exit page, exit time, and active time on page.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-lg hover:border-white/20 transition-colors">
              <Monitor className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">Device & viewport</h3>
              <p className="text-gray-400 leading-relaxed">
                We derive device size (Desktop, Laptop, Tablet, Mobile) from user agent and screen width, plus browser
                and OS for every request.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-lg hover:border-white/20 transition-colors">
              <MapPin className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">Geography</h3>
              <p className="text-gray-400 leading-relaxed">
                Country, region, and city from IP so you can see where your visitors are without extra client-side
                setup.
              </p>
            </div>
            <div className="md:col-span-2 bg-[#0a0a0a] border border-white/10 p-8 rounded-lg hover:border-white/20 transition-colors">
              <Globe className="w-10 h-10 text-white mb-6" />
              <h3 className="text-xl font-bold mb-3 text-white">Referrer & UTM</h3>
              <p className="text-gray-400 leading-relaxed">
                Capture referrer, <code className="text-blue-400/80">utm_source</code>, and <code className="text-blue-400/80">utm_campaign</code> per session. Attribute traffic to
                campaigns and see which sources drive real engagement and active time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="integration" className="py-24 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple integration</h2>
              <p className="text-gray-400 mb-8">
                POST to our API with <code className="text-blue-400/80">type</code>, <code className="text-blue-400/80">domain</code>/<code className="text-blue-400/80">siteId</code>, and <code className="text-blue-400/80">sessionId</code>.
                We validate against your website, then store sessions with device, geo, and UTM.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Add your website", desc: "Register domain and siteId in the dashboard." },
                  { title: "Send events", desc: "page_view, heartbeat, page_exit with url, referrer, userAgent, screenWidth, UTM." },
                  { title: "Analyze", desc: "Sessions, entry/exit pages, active time, device breakdown, and geography." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#111] border border-white/10 flex items-center justify-center font-mono text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 font-mono text-xs md:text-sm text-gray-400">
              <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
                <div className="text-white border-b border-white px-2 pb-4 -mb-4.5">POST /api/track</div>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words">
                {`{
  "type": "page_view",
  "domain": "example.com",
  "siteId": "your-site-id",
  "sessionId": "sess_abc123",
  "visitorId": "vis_xyz",
  "url": "https://example.com/pricing",
  "referrer": "https://google.com",
  "userAgent": "...",
  "screenWidth": 1920,
  "utm_source": "google",
  "utm_campaign": "spring"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for product & marketing teams</h2>
            <p className="text-gray-400">From session replay to campaign attribution in one place.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart2 className="w-6 h-6" />,
                title: "Campaign attribution",
                desc: "UTM source and campaign stored per session. See which channels drive sign-ups and active time.",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Engagement & active time",
                desc: "Heartbeats and page_exit with active_time show how long users really spend on each page.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Traffic & geography",
                desc: "Entry and exit pages, referrer, country, region, and city for a clear picture of who visits and where they go.",
              },
            ].map((useCase, i) => (
              <div
                key={i}
                className="bg-[#050505] border border-white/10 p-8 rounded-lg text-left hover:border-white/30 transition-all"
              >
                <div className="w-12 h-12 bg-[#111] rounded-lg flex items-center justify-center mb-6 text-blue-400">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden border-t border-white/10">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Start tracking in minutes.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="w-full sm:w-auto px-8 py-4 bg-blue-500 text-black font-bold rounded-sm hover:bg-blue-400 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#integration"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/20 hover:bg-white/5 rounded-sm transition-colors"
            >
              View API
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#050505] text-sm text-gray-500 font-mono">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500/80 rounded-sm" />
            <span className="font-bold text-white">kitkat-analytics</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              API
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
