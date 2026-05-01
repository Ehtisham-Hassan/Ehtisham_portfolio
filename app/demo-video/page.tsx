'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Calendar, ArrowLeft, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { CONTACT } from '@/utils/links'

export default function DemoVideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const highlights = [
    { time: '0:00', label: 'Introduction' },
    { time: '0:30', label: 'Lead Qualification Agent' },
    { time: '1:15', label: 'Automated Follow-ups' },
    { time: '2:00', label: 'Scheduling Integration' },
    { time: '2:45', label: 'Live Dashboard' },
  ]

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen()
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(pct)
    setCurrentTime(videoRef.current.currentTime)
  }

  const handleLoaded = () => {
    if (videoRef.current) setDuration(videoRef.current.duration)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = pct * videoRef.current.duration
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    hideControlsTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-dev2c-bg">
      <Navbar />

      <main className="pt-28 pb-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-dev2c-textmuted mb-10"
          >
            <Link href="/" className="hover:text-dev2c-text transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <span className="text-dev2c-text font-medium">Demo Video</span>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dev2c-text leading-[1.1] mb-5">
              See Our{' '}
              <span className="text-[#1B4332] hover:text-green-700 transition">AI Agents</span>{' '}
              in Action
            </h1>
            <p className="text-lg text-dev2c-textmuted max-w-2xl leading-relaxed">
              Watch a full walkthrough of our real estate AI automation platform — from lead intake to closed deal, powered by intelligent agents.
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

            {/* Video Player — takes 2/3 width on xl */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="xl:col-span-2"
            >
              <div
                className="relative bg-dev2c-text rounded-2xl overflow-hidden shadow-xl border border-dev2c-text/10 group"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {/* Video */}
                <video
                  ref={videoRef}
                  src="/video/dev2c-demo.mp4"
                  className="w-full aspect-video object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoaded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  playsInline
                />

                {/* Big play overlay when paused */}
                {!isPlaying && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 z-10"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 duration-200">
                      <Play className="w-8 h-8 text-dev2c-text ml-1" />
                    </div>
                  </motion.button>
                )}

                {/* Controls bar */}
                <motion.div
                  animate={{ opacity: showControls ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-10 bg-gradient-to-t from-black/80 to-transparent"
                >
                  {/* Progress bar */}
                  <div
                    ref={progressRef}
                    className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group/progress"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-white rounded-full relative transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-white/80 transition-colors p-1"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying
                          ? <Pause className="w-5 h-5" />
                          : <Play className="w-5 h-5 ml-0.5" />
                        }
                      </button>
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-white/80 transition-colors p-1"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted
                          ? <VolumeX className="w-5 h-5" />
                          : <Volume2 className="w-5 h-5" />
                        }
                      </button>
                      <span className="text-white/70 text-xs tabular-nums">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <button
                      onClick={handleFullscreen}
                      className="text-white hover:text-white/80 transition-colors p-1"
                      aria-label="Fullscreen"
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Below video: tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {['AI Agents', 'Real Estate', 'Lead Qualification', 'n8n Automation', 'Voice AI'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-dev2c-text/15 text-dev2c-textmuted bg-dev2c-header"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* What you'll see card */}
              <div className="card p-7">
                <h2 className="text-lg font-bold text-dev2c-text mb-5">What You'll See</h2>
                <ul className="space-y-4">
                  {[
                    'AI agent handling inbound lead calls autonomously',
                    'Automated follow-up sequences via email & SMS',
                    'Real-time property matching based on buyer criteria',
                    'One-click scheduling directly to your calendar',
                    'Live analytics dashboard with conversion metrics',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-dev2c-textmuted leading-relaxed">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chapter markers */}
              <div className="card p-7">
                <h2 className="text-lg font-bold text-dev2c-text mb-5">Chapters</h2>
                <div className="space-y-2">
                  {highlights.map((h, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-dev2c-header transition-colors duration-200 text-left group"
                      onClick={() => {
                        if (videoRef.current) {
                          const [m, s] = h.time.split(':').map(Number)
                          videoRef.current.currentTime = m * 60 + s
                          videoRef.current.play()
                        }
                      }}
                    >
                      <span className="text-xs font-mono text-dev2c-textmuted w-10 flex-shrink-0">{h.time}</span>
                      <span className="text-sm text-dev2c-text group-hover:text-[#1B4332] transition-colors">{h.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="card p-7 bg-dev2c-text border-dev2c-text text-white">
                <h2 className="text-lg font-bold mb-2">Ready to Automate?</h2>
                <p className="text-sm text-white/70 mb-5 leading-relaxed">
                  Book a free 30-minute strategy call to see how we'd build this for your business.
                </p>
                <a
                  href={CONTACT.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-5 bg-white text-dev2c-text font-semibold rounded-full hover:bg-white/90 transition-colors duration-200 text-sm shadow"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Free Call
                </a>

                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 w-full mt-3 py-3 px-5 border border-white/25 text-white font-medium rounded-full hover:bg-white/10 transition-colors duration-200 text-sm"
                >
                  Try Live Demo
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-2xl border border-dev2c-text/10 bg-dev2c-header px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-xl font-bold text-dev2c-text mb-1">
                Want a custom demo for your business?
              </h3>
              <p className="text-dev2c-textmuted text-sm">
                We'll build a tailored AI agent demo specific to your real estate workflow — for free.
              </p>
            </div>
            <a
              href={CONTACT.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap flex items-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              Get Your Custom Demo
            </a>
          </motion.div>

        </div>
      </main>
    </div>
  )
}
