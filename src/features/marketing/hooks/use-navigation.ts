import { create } from 'zustand'

type Name = 'features' | 'solutions' | 'plans' | 'resources'

type NavigationStore = {
  isOpen: boolean
  name: Name | null
  setIsOpenAndName: ({
    isOpen,
    name,
  }: {
    isOpen: boolean
    name: Name | null
  }) => void
}

export const useNavigation = create<NavigationStore>((set) => ({
  isOpen: false,
  name: null,
  setIsOpenAndName: ({ isOpen, name }) => set({ isOpen, name }),
}))
