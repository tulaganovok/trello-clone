import type { Card } from '#/generated/prisma/client'
import { create } from 'zustand'

type CardModalStore = {
  card: Card | null
  isOpen: boolean
  onOpen: (card: Card) => void
  onClose: () => void
}

export const useCardModal = create<CardModalStore>((set) => ({
  card: null,
  isOpen: false,
  onOpen: (card: Card) => set({ card, isOpen: true }),
  onClose: () => set({ card: null, isOpen: false }),
}))
