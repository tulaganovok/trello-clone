import type { Card } from '#/generated/prisma/client'
import { create } from 'zustand'

type CardModalStore = {
  card: Card | null
  onOpen: (card: Card) => void
  onClose: () => void
}

export const useCardModal = create<CardModalStore>((set) => ({
  card: null,
  isOpen: false,
  onOpen: (card: Card) => set({ card }),
  onClose: () => set({ card: null }),
}))
