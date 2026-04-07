import { useRef, useState } from 'react'

export function useDragScroll({ disabled = false }: { disabled: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    if (!ref.current) return
    setIsDown(true)
    setStartX(e.pageX - ref.current.offsetLeft)
    setScrollLeft(ref.current.scrollLeft)
  }

  const onMouseLeave = () => setIsDown(false)
  const onMouseUp = () => setIsDown(false)

  const onMouseMove = (e: React.MouseEvent) => {
    if (disabled || !isDown || !ref.current) return
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    const walk = (x - startX) * 1.5 // speed multiplier
    ref.current.scrollLeft = scrollLeft - walk
  }

  return {
    ref,
    handlers: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
    },
  }
}
