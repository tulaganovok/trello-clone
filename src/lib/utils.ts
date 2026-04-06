import type { ListWithCards } from '#/types/list'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }

  debounced.flush = () => {
    clearTimeout(timer)
  }

  return debounced
}

// ------------------
// sort helpers
// ------------------
export function sortLists(lists: ListWithCards[]) {
  return [...lists]
    .sort((a, b) => a.order - b.order)
    .map((list) => ({
      ...list,
      cards: [...list.cards].sort((a, b) => a.order - b.order),
    }))
}
