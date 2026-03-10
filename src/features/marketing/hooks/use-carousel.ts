import { useRef, useState } from 'react'

type Item = {
  title: string
  description: string
  image: string
}

export default function useCarousel(items: Item[]) {
  const [index, setIndex] = useState(0)

  const startX = useRef(0)
  const isDragging = useRef(false)

  const nextSlide = () => {
    setIndex((prev) => Math.min(prev + 1, items.length - 1))
  }

  const prevSlide = () => {
    setIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true
    startX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return

    const diff = e.clientX - startX.current

    if (diff > 50 && index > 0) {
      prevSlide()
      isDragging.current = false
    }

    if (diff < -50 && index < items.length - 1) {
      nextSlide()
      isDragging.current = false
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  return {
    index,
    setIndex,
    prevSlide,
    nextSlide,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
