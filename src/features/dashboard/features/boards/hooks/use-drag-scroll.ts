import { useRef } from 'react'

export function useDragScroll() {
  const ref = useRef<HTMLDivElement | null>(null)
  const state = useRef({ isDown: false, startX: 0, scrollLeft: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return
    state.current = {
      isDown: true,
      startX: e.pageX - ref.current.offsetLeft,
      scrollLeft: ref.current.scrollLeft,
    }
  }

  const onMouseLeave = () => {
    state.current.isDown = false
  }
  const onMouseUp = () => {
    state.current.isDown = false
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!state.current.isDown || !ref.current) return
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    const walk = (x - state.current.startX) * 1.5
    ref.current.scrollLeft = state.current.scrollLeft - walk
  }

  return {
    ref,
    handlers: { onMouseDown, onMouseLeave, onMouseUp, onMouseMove },
  }
}
