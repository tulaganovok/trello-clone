import { useState, useEffect, useCallback } from 'react'

// Types
interface Slide {
  id: number
  title: string
  description: string
  accent: string
  bg: string
  mockup: React.ReactNode
}

// Mock UI Components
const InboxMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center gap-4 p-6">
    {/* Inbox Card */}
    <div className="w-56 bg-[#a855f7] rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
      <div className="flex items-center gap-2 text-white font-semibold text-sm">
        <span className="text-base">📥</span> Inbox
      </div>
      <div className="bg-white/20 rounded-xl px-3 py-2 text-white/70 text-xs">
        Add a todo, or use / for actions
      </div>
      <div className="bg-white rounded-xl p-3 shadow text-xs text-gray-700 space-y-1">
        <div className="font-medium">
          Marketing presentation go up to Friday
        </div>
        <div className="flex gap-1 text-[10px] text-gray-400 mt-1">🔴 ℹ ≡</div>
      </div>
      <div className="bg-white rounded-xl p-3 shadow text-xs text-gray-700">
        <div className="font-medium">Your stay in Austin</div>
        <div className="flex gap-1 text-[10px] text-gray-400 mt-1">M ℹ ≡</div>
      </div>
    </div>
    {/* Board Card */}
    <div className="w-56 bg-[#2563eb] rounded-2xl p-4 shadow-2xl flex flex-col gap-3 translate-y-4">
      <div className="flex items-center justify-between text-white font-semibold text-sm">
        <span>Personal Task Board</span>
        <span className="text-xs opacity-60">▼</span>
      </div>
      <div className="bg-white/10 rounded-xl p-3">
        <div className="text-white/80 text-xs font-semibold mb-2">
          To Do – Today
        </div>
        <div className="bg-white rounded-lg p-2 shadow text-xs text-gray-700 mb-2">
          Prepare analysis of recent campaigns
        </div>
        <div className="bg-white rounded-lg p-2 shadow text-xs text-gray-700">
          Create brief and write test instructions for project Ranier
        </div>
        <div className="mt-2 text-white/50 text-xs cursor-pointer">
          + Add a card
        </div>
      </div>
    </div>
  </div>
)

const BoardsMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6">
    <div className="w-72 bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 text-white">
        <div className="font-bold text-sm mb-1">📋 My Projects</div>
        <div className="text-xs opacity-70">3 boards active</div>
      </div>
      {['To Do – Today', 'In Progress', 'Done'].map((col, i) => (
        <div
          key={col}
          className="border-b border-gray-100 p-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${['bg-red-400', 'bg-yellow-400', 'bg-green-400'][i]}`}
            />
            <span className="text-xs font-medium text-gray-700">{col}</span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
            {[4, 2, 7][i]}
          </span>
        </div>
      ))}
      <div className="p-3 text-center text-xs text-violet-500 cursor-pointer font-medium">
        + New Board
      </div>
    </div>
  </div>
)

const PlannerMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6">
    <div className="w-72 bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white flex justify-between items-center">
        <div>
          <div className="font-bold text-sm">📅 March 2026</div>
          <div className="text-xs opacity-70">Plan your week</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 p-3 text-center text-[10px]">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} className="text-gray-400 font-medium pb-1">
            {d}
          </div>
        ))}
        {Array.from({ length: 31 }, (_, i) => (
          <div
            key={i}
            className={`rounded-full w-6 h-6 flex items-center justify-center mx-auto text-xs
            ${i === 8 ? 'bg-blue-500 text-white font-bold' : ''}
            ${[10, 14, 16].includes(i) ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600'}
          `}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  </div>
)

const slides: Slide[] = [
  {
    id: 0,
    title: 'Inbox',
    description:
      "When it's on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.",
    accent: '#7c3aed',
    bg: 'from-violet-50 to-purple-50',
    mockup: <InboxMockup />,
  },
  {
    id: 1,
    title: 'Boards',
    description:
      'Your to-do list may be long, but it can be manageable! Keep tabs on everything from "to-dos to tackle" to "mission accomplished!"',
    accent: '#7c3aed',
    bg: 'from-violet-50 to-indigo-50',
    mockup: <BoardsMockup />,
  },
  {
    id: 2,
    title: 'Planner',
    description:
      'Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters.',
    accent: '#2563eb',
    bg: 'from-blue-50 to-cyan-50',
    mockup: <PlannerMockup />,
  },
]

export default function OnboardingCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev' = 'next') => {
      if (animating || index === current) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setCurrent(index)
        setAnimating(false)
      }, 320)
    },
    [animating, current],
  )

  const next = () => goTo((current + 1) % slides.length, 'next')
  const prev = () => goTo((current - 1 + slides.length) % slides.length, 'prev')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current])

  const slide = slides[current]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${slide.bg} flex items-center justify-center transition-all duration-500`}
    >
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        {/* Dots */}
        <div className="flex justify-end gap-2 mb-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer
                ${i === current ? 'w-8 bg-gray-700' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div
            key={`text-${current}`}
            className={`space-y-6 transition-all duration-300
              ${
                animating
                  ? direction === 'next'
                    ? 'opacity-0 -translate-x-4'
                    : 'opacity-0 translate-x-4'
                  : 'opacity-100 translate-x-0'
              }`}
          >
            {/* Feature List */}
            <div className="space-y-5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  className={`block text-left w-full transition-all duration-200 rounded-2xl p-4 cursor-pointer
                    ${
                      i === current
                        ? 'border-2 border-violet-500 bg-white shadow-sm'
                        : 'border-2 border-transparent hover:bg-white/50'
                    }`}
                >
                  <div
                    className={`font-bold text-lg mb-1 ${i === current ? 'text-gray-900' : 'text-gray-600'}`}
                  >
                    {s.title}
                  </div>
                  {i === current && (
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {s.description}
                    </p>
                  )}
                </button>
              ))}
            </div>

            {/* Nav Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={prev}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-white hover:shadow-sm transition-all cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={next}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all cursor-pointer shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5"
                style={{ backgroundColor: slide.accent }}
              >
                {current === slides.length - 1 ? 'Get Started →' : 'Next →'}
              </button>
            </div>
          </div>

          {/* Right: Mockup */}
          <div
            key={`mockup-${current}`}
            className={`bg-gray-100 rounded-3xl overflow-hidden h-96 shadow-xl transition-all duration-300
              ${
                animating
                  ? direction === 'next'
                    ? 'opacity-0 translate-x-8 scale-95'
                    : 'opacity-0 -translate-x-8 scale-95'
                  : 'opacity-100 translate-x-0 scale-100'
              }`}
          >
            {slide.mockup}
          </div>
        </div>
      </div>
    </div>
  )
}
